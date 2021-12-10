const fs = require('fs');

let input = fs.readFileSync("./Day9/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

// create array of objects
for (x in input) {
    input[x] = input[x].split('')
    for (y in input[x]) {
        input[x][y] = { num: input[x][y], LP: false}
    }
}

let width = input[0].length;
let height = input.length;

function checkForLP(row, column) {

    if (row != 0 && input[row][column].num >= input[row - 1][column].num) {
        // check number above
        input[row][column].LP = false;
    } else if (row != height - 1 && input[row][column].num >= input[row + 1][column].num) {
        //check number below
        input[row][column].LP = false;
    } else if (column != 0 && input[row][column].num >= input[row][column - 1].num) {
        // check number to left
        input[row][column].LP = false;
    } else if (column != width - 1 && input[row][column].num >= input[row][column + 1].num) {
        // check number to right
        input[row][column].LP = false;
    } else {
        console.log('Low Point Found: ' + row, column, input[row][column].num)
        input[row][column].LP = true;
    }

}

let count = 0;

// cycle through input
for (x = 0; x < height; x++) {
    for (y = 0; y < width; y++) {
        checkForLP(x,y);
        if (input[x][y].LP) {
            count = count + Number(input[x][y].num) + 1
        }
    }
}

console.log(input);
console.log(count);
//console.log(input[-1][0])

