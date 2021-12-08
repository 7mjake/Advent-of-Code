const fs = require('fs');

let input = fs.readFileSync("./Day8/testInput.txt")
    .toString()
    .trim()
    .split(/\r?\n/);


for (x in input) {
    input[x] = input[x].split(' | ');
    for (y in input[x]) {
        input[x][y] = input[x][y].split(' ');
        for (z in input[x][y]) {
            input[x][y][z] = input[x][y][z].split('');
        }
    }
}

let count = 0;
let search = [2, 3, 4, 7]
let key = ['cagedb', 'ab', 'gcdfa', 'fbcad', 'eafb', 'cdfbe', 'cdfgeb', 'dab', 'acedgfb', 'cefabd'];

console.log(input);

//console.log(key.indexOf(input[0][1][0]));

for (x = 0; x < 1; x++) {
    let a = [];
    let b = [];
    let c = [];
    let d = [];
    let e = [];
    let f = [];
    let g = [];

    function replace(intake, length) {
        for (y in intake) {
                if (length == 2) {
                    eval(String(intake[y]) + " = ['a', 'b']");

                } else if (length == 3) {
                    eval(String(intake[y]) + " = ['a','b','d']");

                } else if (length == 4) {
                    eval(String(intake[y]) + " = ['a','b','e','f']");

                } else if (length == 7) {
                    eval(String(intake[y]) + " = ['a','b','c','d','e','f','g']");
                    
                } else {
                    intake = ['?']
                }
        }
    }
    console.log(a);

    //console.log(x, input[x]);
    for (y in input[x][0]) {
        //console.log(input[x][0][y]);
        replace(input[x][0][y], input[x][0][y].length);

    }
    console.log('a = ' + a)
    console.log('b = ' + b)
    console.log('c = ' + c)
    console.log('d = ' + d)
    console.log('e = ' + e)
    console.log('f = ' + f)
    console.log('g = ' + g)
}

//console.log(input);
//console.log('Count = ' + count);

console.log('stop')
