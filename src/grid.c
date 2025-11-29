#include "grid.h"

Grid initGrid(Input* input){
    Grid grid = {
        .height = input->lines,
        .width = 0,
        .buffer = input->buffer
    };

    for(int i = 0;i< input->length;i++){
        if (grid.buffer[i] == '\r'){
            grid.width = i++;
            break;
        }
    }

    return grid;
}