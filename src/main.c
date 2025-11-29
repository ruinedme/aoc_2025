#include <stdio.h>
#include "input.h"

int main(int argc, char **argv){
    if (argc < 2){
        fprintf(stderr, "Usage: %s [day]", argv[0]);
        return 1;
    }
    
    char* day = argv[1];
    Input input = readInput(day);
    

    if(input.buffer){
        printf("Read in file\n");
        printf("%d\n", input.lines);
    }

    // Clean up
   clearInput(&input);

    return 0;
}