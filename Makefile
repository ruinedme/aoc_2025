.PHONY: clean

clean:
	rm -rf bin/*

build:
	gcc -std=c99 -O3 -o bin/main ./src/*