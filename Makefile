.PHONY: clean

CC = gcc
CFLAGS = -Wall -Wextra -Iinclude

all: setup clean build

clean:
	rm -rf bin/*

setup:
	mkdir -p inputs && mkdir -p bin

build:
	$(CC) $(CFLAGS) -std=c99 -O3 -o bin/main ./src/*