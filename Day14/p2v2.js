const fs = require('fs');

// split into into 1D array of caves
let input = fs.readFileSync("./Day14/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

input.splice(1, 1)

let template = input[0].split('');
input.splice(0, 1)
let pairs = input


pairs.forEach((a, i) => pairs[i] = a.split(' -> '))

console.log(template)
console.log(pairs)

const digraphs = [];
const counts = [];
let letters = [];

pairs.forEach(function (value) {
    digraphs.push({ letter: value[0], insert:value[1], count: 0, tempcount: 0})
    if (letters.indexOf(value[1]) == -1) {
        letters.push(value[1])
        counts.push({letter: value[1], count: 0})
    }
})

for (i = template.length - 1; i > 0; i--) {

    ogLetterPair = (template[i - 1] + template[i]).toString();
    findObject(digraphs, ogLetterPair).count++

}

for (i of template) {
    findObject(counts, i).count++
}

function findObject(array, search) {
    return array.find(a => a.letter == search)
}

console.table(digraphs)
console.table(counts)

function insertChar (pair, insert) {
    return [pair.charAt(0) + insert, insert + pair.charAt(1)]
}

for (i = 0; i < 40; i++) {
    for (x of digraphs) {
        if (x.count > 0) {
            //console.log(x.letter)
           findObject(digraphs, insertChar(x.letter, x.insert)[0]).tempcount += x.count
            findObject(digraphs, insertChar(x.letter, x.insert)[1]).tempcount += x.count
            findObject(counts, x.insert).count += x.count
            x.count--;
        }
    }
    for (x of digraphs) {
        x.count = x.tempcount;
        x.tempcount = 0;
    }
}

console.table(digraphs)
console.table(counts)

let finalCounts = []

for (x of counts) {
    finalCounts.push(x.count)
}

let max = Math.max(...finalCounts)
let min = Math.min(...finalCounts)


console.log(max - min)

