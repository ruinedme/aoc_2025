#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "grid.h"

void filter(char *buffer)
{
    int len = strlen(buffer);
    int i, j;
    for (i = 0, j = 0; i < len; i++)
    {
        if (buffer[i] != '\r' && buffer[i] != '\n')
        {
            buffer[j++] = buffer[i];
        }
    }
    buffer[j] = 0x0;
}

Grid initGrid(Input *input)
{
    Grid grid = {
        .height = input->lines,
        .width = 0,
        .length = 0,
        .buffer = NULL};

    for (int i = 0; i < input->length; i++)
    {
        if (input->buffer[i] == '\r')
        {
            grid.width = i++;
            break;
        }
    }

    printf("malloc grid buffer\n");
    grid.length = (grid.height-1) * (grid.width-1) + (grid.width*2) -1;
    printf("gridlen %d\n", grid.length);
    grid.buffer = malloc(grid.length);
    memcpy(grid.buffer, input->buffer, input->length);
    filter(grid.buffer);

    return grid;
}

// Given a row, col returns the index of the grid buffer.
// Returns -1 if row or col would be out of bounds.
int getIndex(int *rowCol, Grid *grid)
{
    int row = rowCol[0];
    int col = rowCol[1];
    if ((row > grid->height || row < 0) || (col > grid->width - 1 || col < 0))
    {
        // fprintf(stderr, "Row or Col is out of range %d, %d\n", row, col);
        return -1;
    }

    int index = grid->width * row + col;
    // Account for line endings in the buffer
    // This feels akward but seems to be better than copying to another buffer with the CRLF bytes filtered out
    // if (row > 0)
    // {
    //     index += 2;
    // }

    return index;
}

// Given an index of the grid buffer return the row/col.
// Returns NULL if index would be out of bounds.
int *getRowCol(int index, Grid *grid)
{
    if (index > (int)(strlen(grid->buffer) - 1) || index < 0)
    {
        // fprintf(stderr, "Index is out of bounds: %d.", index);
        return NULL;
    }
    int *rowCol = malloc(sizeof(int) * 2);
    // The -2 is again accounting for line endings in the buffer
    // if (index > grid->width)
    //     index -= 2;

    // edge case for 1 row grids
    rowCol[0] = grid->height > 1 ? (int)(floorf((float)(index) / (float)grid->height)) : 0;
    rowCol[1] = index % grid->width;

    return rowCol;
}

// Given an index returns the index of surrounding neighbors in the cardinal directions
// Neigbors are in order of [up, right, left, down]
// If no valid neighbor will return -1
int *getCardinalNeighbors(int index, Grid *grid)
{
    int *neighbors = malloc(sizeof(int) * 4);
    int *rowCol = getRowCol(index, grid);
    neighbors[0] = rowCol[0] > 0 ? (int)getIndex(rowCol, grid) : -1;
    neighbors[1] = rowCol[1] < grid->width - 1 ? (int)getIndex(rowCol, grid) : -1;
    neighbors[2] = rowCol[0] < grid->height - 1 ? (int)getIndex(rowCol, grid) : -1;
    neighbors[3] = rowCol[1] > 0 ? (int)getIndex(rowCol, grid) : -1;

    free(rowCol);
    rowCol = NULL;
    return neighbors;
}

// Renders grid to stdout
void display(Grid *grid)
{
    for(int i =0;i<grid->length;i++){
        printf("%c", grid->buffer[i]);
        if(i % grid->width == 0){
            printf("\n");
        }
    }
    printf("\n");
}