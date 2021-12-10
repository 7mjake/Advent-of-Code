const { count } = require('console');
const fs = require('fs');

let input = fs.readFileSync("./Day9/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

// create array of objects
for (x in input) {
    input[x] = input[x].split('')
    for (y in input[x]) {
        input[x][y] = { num: input[x][y], LP: false }
    }
}

let width = input[0].length;
let height = input.length;
let lowPoints = [];

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
        //console.log('Low Point Found: ' + row, column, input[row][column].num)
        input[row][column].LP = true;
        lowPoints.push([[row, column]]);
    }

}

function contains(arr, test) {
    for (i = 0; i < arr.length; i++) {
        checker = false;
        for (j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === test[j]) {
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker) {
            return true
        }
    }
    return false
}

function checkForNines(row, column) {

    if (row != 0 && input[row - 1][column].num != 9) {
        // check number above
        if (!contains(lowPoints[x], [row - 1, column])) {
        lowPoints[x].push([row - 1, column])
        }
    }

    if (row != height - 1 && input[row + 1][column].num != 9) {
        //check number below
        if (!contains(lowPoints[x], [row + 1, column])) {
        lowPoints[x].push([row + 1, column])
        }
    }

    if (column != 0 && input[row][column - 1].num != 9) {
        // check number to left
        if (!contains(lowPoints[x], [row, column - 1])) {
        lowPoints[x].push([row, column - 1])
        }
    }

    if (column != width - 1 && input[row][column + 1].num != 9) {
        // check number to right
        if (!contains(lowPoints[x], [row, column + 1])) {
            lowPoints[x].push([row, column + 1])
        }
    }

}

// find lowpoints
for (x = 0; x < height; x++) {
    for (y = 0; y < width; y++) {
        checkForLP(x, y);
    }
}


console.log(lowPoints)

// cycle through basins
for (x = 0; x < lowPoints.length; x++) {
    for (y = 0; y < lowPoints[x].length; y++) {
        //console.log('Test: ' + lowPoints[x][y])
        checkForNines(lowPoints[x][y][0], lowPoints[x][y][1])
    }
}

lowPoints.sort(function(a, b) {
    return b.length - a.length;
});

//console.log(input);
console.log(lowPoints)

let total = lowPoints[0].length * lowPoints[1].length * lowPoints[2].length;
console.log(total);


