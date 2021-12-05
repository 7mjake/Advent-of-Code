let drawnNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

let horizontalWin1 = [0,1,2,3,4];
let horizontalWin2 = [5,6,7,8,9];
let horizontalWin3 = [10,11,12,13,14];
let horizontalWin4 = [15,16,17,18,19];
let horizontalWin5 = [20,21,22,23,24];

let verticalWin1 = [0,5,10,15,20];
let verticalWin2 = [1,6,11,16,21];
let verticalWin3 = [2,7,12,17,22];
let verticalWin4 = [3,8,13,18,23];
let verticalWin5 = [4,9,14,19,24];

let allWins = [horizontalWin1, horizontalWin2, horizontalWin3, horizontalWin4, horizontalWin5, verticalWin1, verticalWin2, verticalWin3, verticalWin4, verticalWin5];

let bingoBoardsInput = '\
22 13 17 11  0 \
 8  2 23  4 24 \
21  9 14 16  7 \
 6 10  3 18  5 \
 1 12 20 15 19 \
   \
3 15  0  2 22 \
9 18 13 17  5 \
19  8  7 25 23 \
20 11 10 24  4 \
14 21 16 12  6 \
   \
14 21 17 24  4 \
10 16 15  9 19 \
18  8 23 26 20 \
22 11 13  6  5 \
2  0 12  3  7';


// this turns all of the boards into a single array of numbers (with NaN between each board)
formattedBingoBoards = bingoBoardsInput.replace(/\s\s\s/g, " BREAK").replace(/\s+/g, " ").split(' ').map(Number);

console.log(formattedBingoBoards);


let boardNumber = 0;
let boards = [];


// this for statement runs through all the boards (i increments by 25 with each loop)
for (i = 0; formattedBingoBoards[i] != undefined; i++) {

    let currentBoard = [];

    // this while statement compiles each board into it's own array
    while (isNaN(formattedBingoBoards[i]) == false && formattedBingoBoards[i] != undefined) {
        currentBoard.push(formattedBingoBoards[i])
        i++;
    }
    //console.log('Board Number ' + boardNumber);
    //console.log(currentBoard);

    //this adds each board as a nested array in the 'boards' array
    boards[boardNumber] = currentBoard;

    boardNumber++
}

//console.log(boards);

// this creates a new copy of the boards so that I can replace each called number without messing up the original boards
let boardsDynamic = [];
for (i = 0; i < boards.length; i++) {
    boardsDynamic[i] = [...boards[i]];
}

let boardsDynamicIndex = [];

let winningBoard;
let winningPattern;
let bingoCheck = [];
let finalDrawing;
let winningBoardMarks;
let loopCycles = 0;
let removeBoard = false;

// this loops through each drawn number and replaces that number with 'DRAWN' on each board
drawingLoop:
for (i = 0; i < drawnNumbers.length && boards.length > 0; i++) {

    console.log(drawnNumbers[i]);

    boardsDynamicIndex = [];

    // cycles through each board
    boardsloop:
    for (n = 0; n < boardsDynamic.length; n++) {        
        
        //if (boards[n][0] == 'remove') {
            //break boardsloop;
        //}

        // checks if board contains drawn number and replaces it with X
        if (boardsDynamic[n].includes(drawnNumbers[i])) {
            let index = boardsDynamic[n].indexOf(drawnNumbers[i]);
            if (index != -1) {
                console.log(drawnNumbers[i] + ' removed from ' + boards[n]);
                boardsDynamic[n][index] = 'X';
            }
        
        } 

        

        //console.log(boardsDynamic);

        let markedSpots = [];
        // this tracks the indexes of marked spots for each board
        for (j = 0; j < boardsDynamic[n].length; j++) {

            if (boardsDynamic[n][j] == 'X') {
                markedSpots.push(j);
            }

        }

        //boardsDynamicIndex.push(markedSpots);
        //console.log(markedSpots);
        //console.log ('board ' + n)

        let bingo = true;

        for (m = 0; allWins.length > m; m++) {
            
            for (v = 0; allWins[m].length > v; v++) {
                //console.log('Win Condition ' + m +'.' + v)
                
                if (markedSpots.includes(allWins[m][v])) {
                    bingo = true;
                } else {
                    bingo = false;
                    break;
                }
        
            }
        
            //console.log('bingo ' + bingo);
        
            if (bingo && boards.length > 1) {
                boards.splice(n, 1);
                boardsDynamic.splice(n, 1);
                //boards[n].unshift('remove');
                //boardsDynamic[n].unshift('remove');
                winningBoardMarks = markedSpots;
                winningBoard = n;
                finalDrawing = drawnNumbers[i + 1];
                console.log('REMOVED BOARD ' + n)
                console.log(boardsDynamic);
                i--;
                break boardsloop;
                
            } else if (bingo && boards.length == 1) {
                winningBoard = n;
                finalDrawing = drawnNumbers[i];
                winningBoardMarks = markedSpots;
                console.log('Board ' + winningBoard + ' loses!');
                break drawingLoop;
                
            }
            
        }

    }
loopCycles++
}

console.log(boards);
console.log(boardsDynamic[0][22]);
console.log(winningBoardMarks);
console.log('Loop Cycles ' + loopCycles)

console.log('Board ' + winningBoard + ' wins!');

let sumOfFullBoard = 0;
for (i = 0; i < boards[winningBoard].length; i++) {
    sumOfFullBoard = sumOfFullBoard + boards[winningBoard][i];
}

console.log('Full ' + sumOfFullBoard);

let sumOfMarked = 0;
for (i = 0; i < winningBoardMarks.length; i++) {
    sumOfMarked = sumOfMarked + boards[winningBoard][winningBoardMarks[i]];
}
console.log('Marked ' + sumOfMarked);

console.log((sumOfFullBoard - sumOfMarked));
console.log((sumOfFullBoard - sumOfMarked) * finalDrawing);

console.log(finalDrawing)