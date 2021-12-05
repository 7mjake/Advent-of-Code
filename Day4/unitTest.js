let horizontalWin1 = [0,1,2,3,4];
let horizontalWin2 = [5,6,7,8,9];
let horizontalWin3 = [10,11,12,13,14];
let horizontalWin4 = [15,16,17,18,19];
let horizontalWin5 = [20,21,22,23,24];

let verticalWin1 = [0,5,10,15,20];
let verticalWin2 = [1,6,11,16,21];
let verticalWin3 = [2,7,12,27,22];
let verticalWin4 = [3,8,13,18,23];
let verticalWin5 = [4,9,14,19,24];

let allWins = [horizontalWin1, horizontalWin2, horizontalWin3, horizontalWin4, horizontalWin5, verticalWin1, verticalWin2, verticalWin3, verticalWin4, verticalWin5];

let board = [0,1,4,5,8,9,10,14,19,20,24];

let bingo = false;

for (i = 0; allWins.length > i; i++) {
    
    

    for (j = 0; allWins[i].length > j; j++) {
        console.log(allWins[i][j])
        
        if (board.includes(allWins[i][j])) {
            bingo = true;
        } else {
            bingo = false;
            break;
        }

    }

    console.log('bingo ' + bingo);

    if (bingo) {
        break;
    }
    
}

console.log(bingo)