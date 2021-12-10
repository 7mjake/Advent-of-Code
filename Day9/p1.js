const fs = require('fs');

let input = fs.readFileSync("./Day9/testInput.txt")
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
let checkAbove = 'input[row][column].num > input[row - 1][column].num';
let checkBelow = 'input[row][column].num > input[row + 1][column].num';
let checkLeft = 'input[row][column].num > input[row][column - 1].num';
let checkRight = 'input[row][column].num > input[row][column + 1].num';


function checkForLP(row, column) {
    checkAbove = 'input[row][column].num > input[row - 1][column].num';
    checkBelow = 'input[row][column].num > input[row + 1][column].num';
    checkLeft = 'input[row][column].num > input[row][column - 1].num';
    checkRight = 'input[row][column].num > input[row][column + 1].num';

    if (row == 0) {
        checkAbove = false
    }
    if (row == height - 1) {
        checkBelow = false
    }
    if (column == 0) {
        checkLeft = false
    }
    if (column == width - 1) {
        checkRight = false
    }

    if (row != 0 && eval(checkAbove)) {
        // check number above
        input[row][column].LP = false;
    } else if (row != height - 1 && eval(checkBelow)) {
        //check number below
        input[row][column].LP = false;
    } else if (column != 0 && eval(checkLeft)) {
        // check number to left
        input[row][column].LP = false;
    } else if (column != width - 1 && eval(checkRight)) {
        // check number to right
        input[row][column].LP = false;
    } else {
        console.log('Low Point Found: ' + row, column, input[row][column].num)
        input[row][column].LP = true;
    }

}

function checkForLP2(x, y) {
    console.log(x, y, input[x][y].num);
    if ((x != 0) && input[x][y].num > input[x - 1][y].num) {
        console.log('Not a low Point')
        input[x][y].LP = false;
    } else if ((x != height - 1) && input[x][y].num > input[x + 1][y].num) {
        input[x][y].LP = false;
    } else if ((y != 0) && input[x][y].num > input[x][y - 1].num) {
        input[x][y].LP = false;
    } else if ((y != width - 1) && input[x][y].num > input[x][y + 1].num) {
        input[x][y].LP = false;
    } else {
        console.log('Low Point Found')
        input[x][y].LP = true;
    }

}

function setPosition(x, y) {
    console.log(x, y, input[x][y].num);
    if (x == 0 && y == 0) {
        input[x][y].p = 'TL'
    } else if (x == height - 1 && y == width - 1) {
        input[x][y].p = 'BR'
    } else if (x == 0 && y == width - 1) {
        input[x][y].p = 'TR'
    } else if (x == height - 1 && y == 0) {
        input[x][y].p = 'BL'
    } else if (x == 0 && y != 0 && y != width - 1) {
        input[x][y].p = 'T'
    } else if (x == height - 1 && y != 0 && y != width - 1) {
        input[x][y].p = 'B'
    } else if (x != 0 && x != height - 1 && y == 0) {
        input[x][y].p = 'L'
    } else if (x != 0 && x != height - 1 && y == width - 1) {
        input[x][y].p = 'R'
    } else {
        input[x][y].p = 'I'
    }

}
let a;
let b;

for (x = 0; x < height; x++) {
    for (y = 0; y < width; y++) {
        checkForLP(x,y);
    }
}

console.log(input);
//console.log(input[-1][0])

