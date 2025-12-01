#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "input.h"
#include "grid.h"

const int vectors[8][2] = {
    {0, -1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {-1, 1}, {-1, 0}, {-1, -1}};

void freeObj(void *object){
    free(object);
    object = NULL;
}

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        fprintf(stderr, "Usage: %s [day]", argv[0]);
        return 1;
    }

    char *day = argv[1];
    Input input = readInput(day);

    int total = 0;
    char *toMatch = "XMAS";
    if (input.buffer)
    {
        printf("Read in file\n");
        Grid grid = initGrid(&input);

        int *rowCol = NULL;
        printf("grid: %d,%d,%d\n", grid.height, grid.width, grid.length);
        display(&grid);
        for (int i = 0; i < grid.length; i++)
        {
            if (grid.buffer[i] == toMatch[0])
            {
                rowCol = getRowCol(i, &grid);
                for (int dir = 0; dir < 8; dir++)
                {
                    char word[5];
                    int *tmpRowCol = malloc(sizeof(int) * 2);
                    for (int j = 0; j < 4; j++)
                    {
                        printf("i: %d, dir: %d,%d, j: %d\n", i, vectors[dir][1],vectors[dir][0], j);
                        tmpRowCol[0] = rowCol[0] + (vectors[dir][1] * j);
                        tmpRowCol[1] = rowCol[1] + (vectors[dir][0] * j);

                        int index = getIndex(tmpRowCol, &grid);
                        if (index > 0)
                        {
                            word[j] = grid.buffer[index];
                        }
                        else
                        {
                            break;
                        }
                    }
                    word[4] = '\0';
                    freeObj(tmpRowCol);
                    printf("word: %s, toMatch, %s", word, toMatch);
                    if (strcmp(word, toMatch) == 0)
                    {
                        printf(" !MATCHED!");
                        total++;
                    }
                    printf("\n");
                }
            }
        }
        freeObj(rowCol);
    }

    // Clean up
    clearInput(&input);

    printf("Answer %d", total);
    return 0;
}