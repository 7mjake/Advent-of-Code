const fs = require('fs');

// split into into 1D array of caves
let input = fs.readFileSync("./Day13/realInput.txt")
    .toString()
    .trim()
    .split(/\n\n/)

let coords = input[0].split('\n')
coords.forEach((a, i) => coords[i] = [a.split(',')[0], a.split(',')[1]])
let foldingInst = input[1].split('\n')

let count = 0;
for (x of foldingInst) {
    foldingInst[count] = x.replace('fold along ', '');
    foldingInst[count] = foldingInst[count].split('=');
    count++
}

console.log(coords)
console.log(foldingInst)

let allXvalues = [];
let allYvalues = [];

for (x of coords) {
    allXvalues.push(x[0]);
    allYvalues.push(x[1])
}

let grid = []
let subGrid = [];
subGrid.length = Math.max(...allXvalues) + 1
subGrid.fill('-')

for (x = 0; x < Math.max(...allYvalues) + 1; x++) {
    grid.push([...subGrid])
}


for (x of coords) {
    //console.log(x[0], x[1])
    grid[x[1]][x[0]] = 'X'
}

//console.table(grid)
for (fold of foldingInst) {

    if (fold[0] == 'y') {
        count = 0;
        for (y = grid.length - 1; y >= fold[1]; y--) {
            for (x = 0; x < grid[y].length; x++) {
                if (grid[y][x] == 'X') {
                    grid[count][x] = 'X';
                }
            }
            grid.pop();
            count++;
        }
    } else if (fold[0] == 'x') {
        count = 0;
        for (x = grid[0].length - 1; x >= fold[1]; x--) {
            for (y = 0; y < grid.length; y++) {
                if (grid[y][x] == 'X') {
                    grid[y][count] = 'X';
                }
                grid[y].pop();
            }
            count++
        }
    }
    break;
}

//console.table(grid)

let xCount = 0;

grid.forEach(a => a.forEach(function (b) { if (b == 'X') { xCount++ } }))

console.log(xCount)

