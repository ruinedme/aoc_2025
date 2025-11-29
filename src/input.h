typedef struct {
    int lines; // The number of lines in the buffer, CRLF line endings
    long length;  // The length of the buffer
    char* buffer; // The buffered input
} Input;

Input readInput(char* day);
void clearInput(Input* input);