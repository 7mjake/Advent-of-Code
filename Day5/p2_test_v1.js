let rawInput = '\
0,9 -> 5,9\n\
8,0 -> 0,8\n\
9,4 -> 3,4\n\
2,2 -> 2,1\n\
7,0 -> 7,4\n\
6,4 -> 2,0\n\
0,9 -> 2,9\n\
3,4 -> 1,4\n\
0,0 -> 8,8\n\
5,5 -> 8,2';

// this separates each line into nested arrays like this [[x1,y1],[x2,y2]]
let input = rawInput.split('\n');
for (x in input) {
    input[x] = input[x].split(' -> ');
    for (y in input[x]) {
        input[x][y] = input[x][y].split(',').map(Number);
    }
}

// this creates an empty diagram of 0s
let diagram = [];
let dimensionSquare = 10;
for (i = 0; i < dimensionSquare; i++) {
    diagram.push([])
    for (j = 0; j < dimensionSquare; j++) {
        diagram[i].push(0)
    }
}

// getCoord returns a coordinate at an index by passing (index, coordinate)
let x1 = [0, 0]
let y1 = [0, 1]
let x2 = [1, 0]
let y2 = [1, 1]
function getCoord(index, [end, coord]) {
    return input[index][end][coord];
}

let horizontalLines = [];
let verticalLines = [];
let diagonalLinesTLBR = [];
let diagonalLinesBLTR = [];

// log line directions
for (x in input) {
    if (getCoord(x, y1) == getCoord(x, y2)) {
        // log horizontal line
        horizontalLines.push(x);
    } else if (getCoord(x, x1) == getCoord(x, x2)) {
        // log vertical line
        verticalLines.push(x);
    } else if (getCoord(x, x1) - getCoord(x, y1) == getCoord(x, x2) - getCoord(x, y2)) {
        // log diagonal TLBR \ line
        diagonalLinesTLBR.push(x);
    } else if (getCoord(x, x1) + getCoord(x, y1) == getCoord(x, x2) + getCoord(x, y2)) {
        // log diagonal BLTR / line
        diagonalLinesBLTR.push(x);
    }
}

console.log('Horizontal: ' + horizontalLines);
console.log('Vertical: ' + verticalLines);
console.log('DiagonalTLBR \\: ' + diagonalLinesTLBR);
console.log('DiagonalBLTR /: ' + diagonalLinesBLTR);

// flips lines to either be drawn [top to bottom] or [left to right]
for (x in input) {
    if (verticalLines.includes(x) && getCoord(x, y1) > getCoord(x, y2)) {
        // flip vertical lines
        input[x].reverse();
    } else if (horizontalLines.includes(x) && getCoord(x, x1) > getCoord(x, x2)) {
        // flip horizontal lines
        input[x].reverse();
    } else if (diagonalLinesTLBR.includes(x) && getCoord(x, y1) > getCoord(x, y2)) {
        // flip \ lines
        input[x].reverse();
    } else if(diagonalLinesBLTR.includes(x) && getCoord(x, y1) > getCoord(x, y2)) {
        // flip / lines
        input[x].reverse();
    }
}

// draw lines
for (x in input) {

    // draw end points
    diagram[getCoord(x, y1)][getCoord(x, x1)]++;
    diagram[getCoord(x, y2)][getCoord(x, x2)]++;

    if (verticalLines.includes(x)) {
        // fill in vertical lines
        for (i = 1; i < (getCoord(x, y2) - getCoord(x, y1)); i++) {
            diagram[getCoord(x, y1) + i][getCoord(x, x1)]++;
        }
    } else if (horizontalLines.includes(x)) {
        // fill in horizontal lines
        for (i = 1; i < (getCoord(x, x2) - getCoord(x, x1)); i++) {
            diagram[getCoord(x, y1)][getCoord(x, x1) + i]++;
        }
    } else if (diagonalLinesTLBR.includes(x)) {
        // fill in \ lines
        for (i = 1; i < (getCoord(x, x2) - getCoord(x, x1)); i++) {
            diagram[getCoord(x, y1) + i][getCoord(x, x1) + i]++;
        }
    } else if (diagonalLinesBLTR.includes(x)) {
        // fill in / lines
        for (i = 1; i < (getCoord(x, x1) - getCoord(x, x2)); i++) {
            diagram[getCoord(x, y1) + i][getCoord(x, x1) - i]++;
        }
    }
}

let count = 0;

for (x in diagram) {
    for (y in diagram[x]) {
        if (diagram[x][y] > 1) {
            count++;
        }
    }
}

console.log(count);
console.log(input);

// write diagram to html
for (x in diagram) {
    for (y in diagram[x]) {
        document.write(diagram[x][y] + '&nbsp;&nbsp;');
    }
    document.write('<br>');
}