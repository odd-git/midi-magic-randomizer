#include <math.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <time.h>

#include "lv2/lv2plug.in/ns/lv2core/lv2.h"
#include "lv2/lv2plug.in/ns/ext/atom/atom.h"
#include "lv2/lv2plug.in/ns/ext/atom/forge.h"
#include "lv2/lv2plug.in/ns/ext/atom/util.h"
#include "lv2/lv2plug.in/ns/ext/midi/midi.h"
#include "lv2/lv2plug.in/ns/ext/urid/urid.h"

#define MIDI_RANDOMIZER_URI "http://example.org/midi-randomizer"

// Define CLAMP macro to ensure values stay within a specified range
#define CLAMP(x, min, max) ((x) < (min) ? (min) : ((x) > (max) ? (max) : (x)))

typedef enum {
    MIDI_IN  = 0,
    MIDI_OUT = 1,
    VELOCITY = 2,
    TIMING   = 3,
    AMOUNT   = 4
} PortIndex;

typedef struct {
    // Port buffers
    const LV2_Atom_Sequence* midi_in;
    LV2_Atom_Sequence*       midi_out;
    float*                   velocity;
    float*                   timing;
    float*                   amount;
    
    // Features
    LV2_URID_Map*            map;
    
    // URIs (mapped from URID map feature)
    struct {
        LV2_URID atom_Sequence;
        LV2_URID midi_Event;
    } uris;
    
    // Forge for creating atoms
    LV2_Atom_Forge forge;
    
    // Time position
    double        rate;
} MidiRandomizer;

static void
connect_port(LV2_Handle instance,
             uint32_t   port,
             void*      data)
{
    MidiRandomizer* self = (MidiRandomizer*)instance;
    
    switch ((PortIndex)port) {
    case MIDI_IN:
        self->midi_in = (const LV2_Atom_Sequence*)data;
        break;
    case MIDI_OUT:
        self->midi_out = (LV2_Atom_Sequence*)data;
        break;
    case VELOCITY:
        self->velocity = (float*)data;
        break;
    case TIMING:
        self->timing = (float*)data;
        break;
    case AMOUNT:
        self->amount = (float*)data;
        break;
    }
}

static LV2_Handle
instantiate(const LV2_Descriptor*     descriptor,
            double                    rate,
            const char*               bundle_path,
            const LV2_Feature* const* features)
{
    MidiRandomizer* self = (MidiRandomizer*)calloc(1, sizeof(MidiRandomizer));
    if (!self) {
        return NULL;
    }
    
    self->rate = rate;
    
    // Get URID map feature
    for (int i = 0; features[i]; ++i) {
        if (!strcmp(features[i]->URI, LV2_URID__map)) {
            self->map = (LV2_URID_Map*)features[i]->data;
        }
    }
    
    if (!self->map) {
        fprintf(stderr, "MIDI Randomizer: Host does not support urid:map\n");
        free(self);
        return NULL;
    }
    
    // Map URIs
    self->uris.atom_Sequence = self->map->map(self->map->handle, LV2_ATOM__Sequence);
    self->uris.midi_Event    = self->map->map(self->map->handle, LV2_MIDI__MidiEvent);
    
    // Initialize forge
    lv2_atom_forge_init(&self->forge, self->map);
    
    // Initialize random seed
    srand((unsigned int)time(NULL));
    
    return (LV2_Handle)self;
}

static void
cleanup(LV2_Handle instance)
{
    MidiRandomizer* self = (MidiRandomizer*)instance;
    free(self);
}

static float
random_float(float min, float max)
{
    return min + (((float)rand() / (float)RAND_MAX) * (max - min));
}

static void
run(LV2_Handle instance, uint32_t sample_count)
{
    MidiRandomizer* self = (MidiRandomizer*)instance;
    
    // Get port buffers
    const LV2_Atom_Sequence* in  = self->midi_in;
    LV2_Atom_Sequence*       out = self->midi_out;
    
    // Get parameters
    float velocity_amount = *self->velocity;
    float timing_amount   = *self->timing;
    float randomize_amount = *self->amount;
    
    // Set up forge to write to output port
    const uint32_t out_capacity = out->atom.size;
    lv2_atom_forge_set_buffer(&self->forge, (uint8_t*)out, out_capacity);
    
    // Fix: Create a frame for the sequence
    LV2_Atom_Forge_Frame frame;
    lv2_atom_forge_sequence_head(&self->forge, &frame, 0);
    
    // Read incoming events
    LV2_ATOM_SEQUENCE_FOREACH(in, ev) {
        if (ev->body.type == self->uris.midi_Event) {
            const uint8_t* const msg = (const uint8_t*)(ev + 1);
            
            // Check if it's a MIDI note on message (status byte & 0xF0 == 0x90)
            if ((msg[0] & 0xF0) == 0x90) {
                // Only apply randomization based on randomize_amount
                if (random_float(0.0f, 100.0f) < randomize_amount) {
                    // Copy the message to modify
                    uint8_t new_msg[3];
                    memcpy(new_msg, msg, 3);
                    
                    // Randomize velocity (keep within valid MIDI range 1-127)
                    if (velocity_amount > 0) {
                        float vel_random = random_float(-velocity_amount, velocity_amount) * 0.63f;
                        int new_velocity = msg[2] + (int)vel_random;
                        new_msg[2] = (uint8_t)CLAMP(new_velocity, 1, 127);
                    }
                    
                    // Calculate new timing
                    float time_random = 0.0f;
                    if (timing_amount > 0) {
                        time_random = random_float(-timing_amount, timing_amount) * 0.05f;
                    }
                    
                    // Write randomized event with adjusted timing
                    lv2_atom_forge_frame_time(&self->forge, ev->time.frames + (int)(time_random * self->rate));
                    lv2_atom_forge_write(&self->forge, new_msg, 3);
                } else {
                    // Pass through unchanged
                    lv2_atom_forge_frame_time(&self->forge, ev->time.frames);
                    lv2_atom_forge_write(&self->forge, msg, 3);
                }
            } else {
                // Pass through all other MIDI messages unchanged
                lv2_atom_forge_frame_time(&self->forge, ev->time.frames);
                lv2_atom_forge_write(&self->forge, msg, ev->body.size);
            }
        }
    }
    
    // Close the sequence frame
    lv2_atom_forge_pop(&self->forge, &frame);
}

static const LV2_Descriptor descriptor = {
    MIDI_RANDOMIZER_URI,
    instantiate,
    connect_port,
    NULL,  // activate
    run,
    NULL,  // deactivate
    cleanup,
    NULL   // extension_data
};

LV2_SYMBOL_EXPORT
const LV2_Descriptor* lv2_descriptor(uint32_t index)
{
    return (index == 0) ? &descriptor : NULL;
}
