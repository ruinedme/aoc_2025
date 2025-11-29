#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "input.h"

// Lazily assumes inputs have CRLF line endings
Input readInput(char *day)
{
    Input input = {
        .lines = 1,
        .length = 0L,
        .buffer = 0};

    char filepath[20] = "./inputs/day";
    strcat(filepath, day);
    strcat(filepath, ".txt");

    FILE *f = fopen(filepath, "rb");
    // Fails on files larger than 4GB but that's fine for AOC since input's are generally small
    if (f)
    {
        fseek(f, 0, SEEK_END);
        input.length = ftell(f);
        fseek(f, 0, SEEK_SET);
        input.buffer = malloc(input.length + 1);
        if (input.buffer)
        {
            fread(input.buffer, 1, input.length, f);
            input.buffer[-1] = '\0';
        }
        fclose(f);
    }

    // Get # of lines in the file
    for (int i = 0; i < input.length; i++)
    {
        if (input.buffer[i] == '\r')
        {
            input.lines++;
            i++;
        }
    }

    return input;
}

void clearInput(Input *input)
{
    free(input->buffer);
    input->buffer = NULL;
}