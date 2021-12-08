const fs = require('fs');

let input = fs.readFileSync("./Day8/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

let scrambledInputs = [];
let encryptedSignalPatterns = [];

// separate everything into arrays
for (x in input) {
    input[x] = input[x].split(' | ');
    for (y in input[x]) {
        input[x][y] = input[x][y].split(' ');
        for (z in input[x][y]) {
            input[x][y][z] = input[x][y][z].split('').sort();
        }
    }
    scrambledInputs.push(input[x][0]);
    encryptedSignalPatterns.push(input[x][1]);
}

console.log(scrambledInputs[x]);

// loop through each line and solve ciphers
for (x in scrambledInputs) {

    let cipher = [];

    // search for lengths
    for (y = 0; y < scrambledInputs[x].length; y++) {
        //console.log(y);
        if (scrambledInputs[x][y].length == 2) {
            cipher[1] = [...scrambledInputs[x][y]]
            scrambledInputs[x].splice(y, 1);
            y--;
        } else if (scrambledInputs[x][y].length == 3) {
            cipher[7] = [...scrambledInputs[x][y]]
            scrambledInputs[x].splice(y, 1);
            y--;
        } else if (scrambledInputs[x][y].length == 4) {
            cipher[4] = [...scrambledInputs[x][y]]
            scrambledInputs[x].splice(y, 1);
            y--;
        } else if (scrambledInputs[x][y].length == 7) {
            cipher[8] = [...scrambledInputs[x][y]]
            scrambledInputs[x].splice(y, 1);
            y--;
        }
        //console.log(x,y,input[x][1][y].length)
    }

    // looks for 9 by searching for the shape of 4
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if (checkFor(cipher[4], scrambledInputs[x][y]) && (scrambledInputs[x][y].length == 6)) {
            cipher[9] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // looks for 3 by searching for the shape of 1
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if (checkFor(cipher[7], scrambledInputs[x][y]) && (scrambledInputs[x][y].length == 5)) {
            cipher[3] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // looks for 0 by searching for the shape of 7 and length of 6
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if (checkFor(cipher[7], scrambledInputs[x][y]) && (scrambledInputs[x][y].length == 6)) {
            cipher[0] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // looks for 6 by searching for length of 6
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if (scrambledInputs[x][y].length == 6) {
            cipher[6] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // looks for 5 by searching for the intersecting shapes of 4 and 6
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if ( checkFor((intersection(cipher[4], cipher[6])), scrambledInputs[x][y]) && (scrambledInputs[x][y].length == 5)) {
            cipher[5] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // sets remaining number as 2
    for (y = 0; y < scrambledInputs[x].length; y++) {
        if (scrambledInputs[x][y].length == 5) {
            cipher[2] = [...scrambledInputs[x][y]];
            scrambledInputs[x].splice(y, 1);
        }
    }

    // check for contained patterns
    function checkFor(knownPattern, testSubject) {
        return knownPattern.every(i => testSubject.includes(i));
    }

    // find intersecting segments
    function intersection(pattern1, pattern2) {
        return pattern1.filter(i => pattern2.includes(i))
    }

    let joinedCiphers = [];
    let joinedEncryption = [];

    for (y in cipher) {
        joinedCiphers[y] = cipher[y].join('')
    }

    for (y in encryptedSignalPatterns[x]) {
        joinedEncryption[y] = encryptedSignalPatterns[x][y].join('')
    }

    // find signal patterns in cipher and convert to digits
    for (y in encryptedSignalPatterns[x]) {
        encryptedSignalPatterns[x][y] = joinedCiphers.indexOf(joinedEncryption[y]);
    }

}

let finalCount = 0;
let joinedEncryptionFull = [];

for (x in encryptedSignalPatterns) {
    joinedEncryptionFull[x] = encryptedSignalPatterns[x].join('');
    finalCount = finalCount + Number(joinedEncryptionFull[x])
}

console.log(joinedEncryptionFull)
console.log(finalCount)



