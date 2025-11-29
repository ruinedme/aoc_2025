#ifndef GRID_H
#define GRID_H
#include "input.h"

typedef struct {
    int width;
    int height;
    char* buffer;
} Grid;

Grid initGrid(Input* input);
#endif