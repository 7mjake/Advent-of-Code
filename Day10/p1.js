const fs = require('fs');

let input = fs.readFileSync("./Day10/realInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);

console.log(input)

let open = ['(','[','{','<'];
let close = [')',']','}','>'];
let pairs = ['()', '[]', '{}', '<>']

let count = 0;

for (x of input) {
    // remove complete chunks
    for (y = 1; y < x.length; y++) {
        if (pairs.indexOf(x.substring(y-1,y+1)) != -1) {
            x = x.replace(x.substring(y-1,y+1), '')
            y = y - 2;
        }
    }
    //ignoring corrupt lines, find the first closing character left and add it's score to the count
    for(z in x) {
        if (close.indexOf(x[z]) != -1) {
            console.log('Corrupt: ' + x.charAt(z))
            if (x.charAt(z) === ')') {
                count = count + 3
            } else if (x.charAt(z) === ']') {
                count = count + 57
            } else if (x.charAt(z) === '}') {
                count = count + 1197
            } else if (x.charAt(z) === '>') {
                count = count + 25137
            } 
            break
        }
    }
}

console.log(count);

