const fs = require('fs');

let input = fs.readFileSync("./Day8/realInput.txt")
.toString()
.trim()
.split(/\r?\n/);

// split into nested arrays
for (x in input) {
    input[x] = input[x].split(' | ');
    for (y in input[x]) {
        input[x][y] = input[x][y].split(' ');
    }
}

let count = 0;
let search = [2,3,4,7]

// search for lengths
for (x in input) {
    for (y in input[x][1]) {
        count = (search.includes(input[x][1][y].length) ? count + 1 : count);
        //console.log(x,y,input[x][1][y].length)
    }
}

//console.log(input);
console.log('Count = ' + count);

console.log('stop')