const fs = require('fs');

let input = fs.readFileSync("./Day10/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

console.log(input)

let open = ['(', '[', '{', '<'];
let close = [')', ']', '}', '>'];
let pairs = ['()', '[]', '{}', '<>']


function removePairs(str) {
    for (y = 1; y < str.length; y++) {
        if (pairs.indexOf(str.substring(y - 1, y + 1)) != -1) {
            str = str.replace(str.substring(y - 1, y + 1), '')
            y = y - 2;
        }
    }
    return str
}

// remove all complete chunks and corrupted lines
for (x = 0; x < input.length; x++) {
    input[x] = removePairs(input[x])

    for (z in input[x]) {
        if (close.indexOf(input[x][z]) != -1) {
            console.log('Remove Corruption: ' + input[x])
            input.splice(x, 1)
            x--;
            break
        }
    }
}

let inverseInput = [];
let count = 0;

// create closing characters to match open characters
for (x of input) {
    inverseInput[count] = '';
    for (y = x.length - 1; y >= 0; y--) {
        inverseInput[count] = inverseInput[count].concat(close[open.indexOf(x[y])])
    }
    count ++
}

console.log(inverseInput)
let scores = [];
count =0

// calculate score based on created closing characters
for (x of inverseInput) {
    scores[count] = 0;
    for (y of x) {
        scores[count] = scores[count] * 5;
        if (y == ')') {
            scores[count] = scores[count] + 1;
        } else if (y == ']') {
            scores[count] = scores[count] + 2;
        } else if (y == '}') {
            scores[count] = scores[count] + 3;
        }  else if (y == '>') {
            scores[count] = scores[count] + 4;
        }
    }
    count++;
}

scores.sort(function(a,b){return a - b});
console.log(scores)
console.log(scores[(scores.length - 1) / 2])

