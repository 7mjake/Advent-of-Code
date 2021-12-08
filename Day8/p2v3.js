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
            input[x][y][z] = input[x][y][z].split('').sort();
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

let solver = [];

// search for lengths
for (y = 0; y < cipherTest.length; y++) {
    console.log(y);
    if (cipherTest[y].length == 2) {
        solver[1] = [...cipherTest[y]]
        cipherTest.splice(y, 1);
        y--;
    } else if (cipherTest[y].length == 3) {
        solver[7] = [...cipherTest[y]]
        cipherTest.splice(y, 1);
        y--;
    } else if (cipherTest[y].length == 4) {
        solver[4] = [...cipherTest[y]]
        cipherTest.splice(y, 1);
        y--;
    } else if (cipherTest[y].length == 7) {
        solver[8] = [...cipherTest[y]]
        console.log('HERE HERE')
        cipherTest.splice(y, 1);
        y--;
    } 
    //console.log(x,y,input[x][1][y].length)
}

for (y = 0; y < cipherTest.length; y++) {
    if (checkFor(solver[4], cipherTest[y])) {
        console.log(cipherTest[y] + ' SUCCESS' + ' 9 Found')
        solver[9] = [...cipherTest[y]];
        cipherTest.splice(y, 1);
    }
}

for (y = 0; y < cipherTest.length; y++) {
    if (checkFor(solver[7], cipherTest[y]) && (cipherTest[y].length == 5)) {
        console.log(cipherTest[y] + ' SUCCESS' + ' 3 Found')
        solver[3] = [...cipherTest[y]];
        cipherTest.splice(y, 1);
    }
}

for (y = 0; y < cipherTest.length; y++) {
    if (checkFor(solver[7], cipherTest[y]) && (cipherTest[y].length == 6)) {
        console.log(cipherTest[y] + ' SUCCESS' + ' 0 Found')
        solver[0] = [...cipherTest[y]];
        cipherTest.splice(y, 1);
    }
}

for (y = 0; y < cipherTest.length; y++) {
    if (cipherTest[y].length == 6) {
        console.log(cipherTest[y] + ' SUCCESS' + ' 6 Found')
        solver[6] = [...cipherTest[y]];
        cipherTest.splice(y, 1);
    }
}

for (y = 0; y < cipherTest.length; y++) {
    if (intersection(solver[4],solver[6])) {
        console.log(cipherTest[y] + ' SUCCESS' + ' 2 Found')
        solver[2] = [...cipherTest[y]];
        cipherTest.splice(y, 1);
    }
}

for (y = 0; y < cipherTest.length; y++) {
    console.log(cipherTest[y] + ' SUCCESS' + ' 5 Found')
    solver[5] = [...cipherTest[y]];
    cipherTest.splice(y, 1);
}

function checkFor(knownPattern, testSubject) {
    return knownPattern.every(i => testSubject.includes(i));
}

function intersection(pattern1, pattern2) {
    return pattern1.filter(i => pattern2.includes(i))
}


console.log(solver);
console.log(cipherTest);
console.log(ciphers);


