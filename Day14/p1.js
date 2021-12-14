const fs = require('fs');
const { start } = require('repl');

// split into into 1D array of caves
let input = fs.readFileSync("./Day14/testInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

input.splice(1, 1)

let template = input[0].split('');
input.splice(0, 1)
let pairs = input

console.log(template)

pairs.forEach((a, i) => pairs[i] = a.split(' -> '))
//console.log(pairs)

let letters;

for (j = 0; j < 10; j++) {
    for (i = template.length - 1; i > 0; i--) {

        letters = (template[i - 1] + template[i]).toString();
        template.splice(i, 0, insert(letters))
        //console.log('added ' + insert(template[i-1] + template[i]))

    }
    //console.log(template.join(''))
}

function insert(chars) {
    for (let x of pairs) {
        if (x[0] == chars) {
            return x[1];
        }
    }
}

console.log(template)

let counts = {};

// counts initial fish at each timer stage
for (x of template) {
    counts[x] = counts[x] ? counts[x] + 1 : 1;
}

let values = Object.values(counts)

//console.log(values)

let max = Math.max(...values)

let min = Math.min(...values)


console.log(max - min)


