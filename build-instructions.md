
# Building and Installing the MIDI Magic Randomizer LV2 Plugin

Follow these steps to build the plugin and use it in Ardour:

## Prerequisites

You need to install the following dependencies:

```bash
# For Debian/Ubuntu
sudo apt-get install build-essential lv2-dev

# For Fedora
sudo dnf install gcc make lv2-devel

# For Arch Linux
sudo pacman -S base-devel lv2
```

## Building

1. Navigate to the midi-randomizer.lv2 directory:

```bash
cd midi-randomizer.lv2
```

2. Build the plugin:

```bash
make
```

## Installing

Install the plugin to your home directory:

```bash
make install
```

This will install the plugin to `~/.lv2/midi-randomizer.lv2/`.

Alternatively, to install system-wide:

```bash
sudo make INSTALL_DIR=/usr/local/lib/lv2 install
```

## Using in Ardour

1. Open Ardour
2. Create or select a MIDI track
3. Click on a MIDI region in the track
4. In the editor window, click on the "Plugins" button
5. Choose "Add Plugin" → "MIDI Magic Randomizer"
6. Adjust the parameters:
   - Velocity: Controls the amount of velocity randomization
   - Timing: Controls the amount of timing randomization
   - Amount: Controls the percentage of notes to be affected

## Troubleshooting

If Ardour doesn't see the plugin, try:

1. Run `lv2ls | grep randomizer` to check if the plugin is properly registered
2. Restart Ardour after installing the plugin
3. Check that the plugin is installed in a directory that Ardour scans for plugins

If the plugin crashes, you can debug by running Ardour from the terminal to see error messages.
