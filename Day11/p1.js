const fs = require('fs');

let input = fs.readFileSync("./Day11/miniTestInput2.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

// split into 2D array and convert to numbers
input.forEach((a, i) => input[i] = a.split(''));
input.forEach(a => a.forEach((b, i, arr) => arr[i] = Number(b)));

// create border of NaN to avoid corners/edges
input.forEach(a => { a.push(NaN), a.unshift(NaN) })
input.unshift([])
input[0].length = input[1].length
input[0].fill(NaN)

input.push([])
input[input.length - 1].length = input[1].length
input[input.length - 1].fill(NaN)

function cycle(num, index, arr) {
    //console.log(num)
    if (repeaterCount == 0) {
        arr[index] = num + 1;
        num++
    }
    
    if (num > 9) {
        arr[index] = 0;
        flashCount++
        adjacentAdd(j, index);
    }
}

function contains(searchedArr) {
    return searchedArr.some(row => row.some(num => num > 9))
}

function adjacentAdd(x, y) {
    let adjacentList = ['input[x-1][y-1]', 'input[x][y-1]', 'input[x+1][y-1]', 'input[x-1][y]', 'input[x+1][y]', 'input[x-1][y+1]', 'input[x][y+1]', 'input[x+1][y+1]'];
    for (cases of adjacentList) {
        if (eval(cases) < 10 && eval(cases) != 0) {
            //console.log('Added to: ' + cases)
            eval(cases + '++')
        }
    }
}

let flashCount = 0;
let repeater;
let repeaterCount;

// cycle though i steps
for (i = 0; i < 10; i++) {
    repeaterCount = 0;
    repeater = true;
    while (repeater) {
        //cycle through rows
        for (j = 1; j < input.length - 1; j++) {
            // cycle through columns
            for (k = 1; k < input[j].length - 1; k++) {
                cycle(input[j][k], k, input[j])
            }
        }
        
        if (true) {
        console.log('')
        console.log('After ' + (i + 1) + ' steps, ' + (repeaterCount) + ' chain reactions')
        console.table(input)
        }

        repeaterCount++
        repeater = false
        if (contains(input)) {
            repeater = true;
            console.log('contains another number over 9!')
            //console.log('Repeater Count: ' + repeaterCount)
        } else {
            console.log('Chain reaction finished')
        }

    }
    console.log('Flashcount after step ' + (i + 1) + ': ' + flashCount)
}

console.log(flashCount)


