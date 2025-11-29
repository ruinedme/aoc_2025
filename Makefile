.PHONY: clean

all: setup clean build

clean:
	rm -rf bin/*

setup:
	mkdir -p inputs && mkdir -p bin

build:
	gcc -std=c99 -O3 -o bin/main ./src/*