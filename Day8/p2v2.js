const fs = require('fs');

let input = fs.readFileSync("./Day8/testInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

let ciphers = [];
let encryptedSignalPatterns = [];

for (x in input) {
    input[x] = input[x].split(' | ');
    for (y in input[x]) {
        input[x][y] = input[x][y].split(' ');
        for (z in input[x][y]) {
            input[x][y][z] = input[x][y][z].split('');
        }
    }
    ciphers.push(input[x][0]);
    encryptedSignalPatterns.push(input[x][1]);
}

//console.log(input)
//console.log(ciphers)
//console.log(encryptedSignalPatterns)

let cipherTest = [...ciphers][0];

console.log(cipherTest);

cipherTest.sort(function (a, b) { return a.length - b.length });

console.log(cipherTest);

let a = [];
let b = [];
let c = [];
let d = [];
let e = [];
let f = [];
let g = [];

let solverArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

for (y in cipherTest) {
    for (z in cipherTest[y]) {
        if (eval(cipherTest[y][z] + ".length == 0")) {
            if (cipherTest[y].length == 2) {
                eval(String(cipherTest[y][z]) + " = ['a', 'b']");
                //console.log('2 string -> ' + cipherTest[y])

            } else if (cipherTest[y].length == 3) {
                eval(String(cipherTest[y][z]) + " = ['a','b','d']");
                //console.log('3 string -> ' + cipherTest[y])

            } else if (cipherTest[y].length == 4) {
                eval(String(cipherTest[y][z]) + " = ['a','b','e','f']");
                //console.log('4 string -> ' + cipherTest[y])

            } else if (cipherTest[y].length == 7) {
                eval(String(cipherTest[y][z]) + " = ['a','b','c','d','e','f','g']");
                //console.log('7 string -> ' + cipherTest[y])

            } else {
                intake = ['?']
            }
        }
    }

}
console.log('actual a = ' + a)
console.log('actual b = ' + b)
console.log('actual c = ' + c)
console.log('actual d = ' + d)
console.log('actual e = ' + e)
console.log('actual f = ' + f)
console.log('actual g = ' + g)

for (y in solverArray) {
    if (eval(solverArray[y] + ".length != 2")){
        //console.log(eval(solverArray[y]))
        let index = eval(solverArray[y]).indexOf('a');
        eval(solverArray[y]).splice(index, 2);
        //console.log(solverArray[y] + ' = ' + eval(solverArray[y]))
    }
}

console.log('actual a = ' + a)
console.log('actual b = ' + b)
console.log('actual c = ' + c)
console.log('actual d = ' + d)
console.log('actual e = ' + e)
console.log('actual f = ' + f)
console.log('actual g = ' + g)



// for (z in eval(String(solverArray[y]))) {
//     console.log( eval(String(solverArray[y]))[z] );
// 
// }
//console.log(solverArray);

