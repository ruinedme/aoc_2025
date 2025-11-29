#ifndef GRID_H
#define GRID_H
#include "input.h"

typedef struct
{
    int width;
    int height;
    char *buffer;
} Grid;

Grid initGrid(Input *input);
int getIndex(int *rowCol, Grid *grid);            // Given a row, col returns the index of the grid buffer
int *getRowCol(int index, Grid *grid);            // Given an index of the grid buffer return the row/col
int *getCardinalNeighbors(int index, Grid *grid); // Given an index returns the index of surrounding neighbors in the cardinal directions
void display(Grid *grid);
#endif