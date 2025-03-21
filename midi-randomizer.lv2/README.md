
# MIDI Magic Randomizer LV2 Plugin

A simple MIDI randomizer plugin that can add human-like variations to velocity and timing of MIDI notes.

## Features

- Velocity randomization: Adds random variations to note velocities
- Timing randomization: Shifts notes slightly in time
- Randomize amount: Controls how many notes are affected by randomization

## Installation

### Dependencies

Make sure you have the following installed:
- GCC
- LV2 development headers (usually in a package called `lv2-dev` or similar)

### Building and Installing

```bash
# Build the plugin
cd midi-randomizer.lv2
make

# Install to your home directory
make install

# Or install system-wide (may require sudo)
sudo make INSTALL_DIR=/usr/local/lib/lv2 install
```

## Usage

1. Open Ardour or any other LV2-compatible host
2. Add the MIDI Magic Randomizer as a MIDI plugin to a MIDI track
3. Adjust the parameters:
   - Velocity: Amount of randomization applied to note velocities (0-100%)
   - Timing: Amount of timing fluctuation (0-100%)
   - Amount: Percentage of notes that will be randomized (0-100%)

## License

MIT
