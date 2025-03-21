
#!/usr/bin/make -f

# Compiler flags
CC = gcc
CFLAGS = -Wall -fPIC -DPIC -O3 -fvisibility=hidden
LDFLAGS = -shared

# LV2 installation directories
INSTALL_DIR ?= $(HOME)/.lv2
BUNDLE = midi-randomizer.lv2

# Source files
SOURCES = midi-randomizer.c

# Targets
all: $(BUNDLE)/midi-randomizer.so

$(BUNDLE)/midi-randomizer.so: $(SOURCES)
	$(CC) $(CFLAGS) $(SOURCES) $(LDFLAGS) -o $@

install: all
	mkdir -p $(INSTALL_DIR)/$(BUNDLE)
	cp $(BUNDLE)/*.so $(BUNDLE)/*.ttl $(INSTALL_DIR)/$(BUNDLE)/

clean:
	rm -f $(BUNDLE)/*.so

.PHONY: all install clean
