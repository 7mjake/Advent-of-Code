let drawnNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];

let bingoWins = ['0 1 2 3 4', '5 6 7 8 9', '10 11 12 13 14', '15 16 17 18 19', '20 21 22 23 24', '0 5 10 15 20', '1 6 11 16 21', '2 7 12 17 22', '3 8 13 18 23', '4 9 14 19 24'];

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

console.log(formattedBingoBoards.length);

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
    console.log(i)
}

console.log(boards);

// this creates a new copy of the boards so that I can replace each called number without messing up the original boards
let boardsDynamic = [];
for (i = 0; i < boards.length; i++) {
    boardsDynamic[i] = [...boards[i]];
}

let winningBoard;
let winningPattern;
let bingoCheck = [];
let finalDrawing;

// this loops through each drawn number and replaces that number with 'DRAWN' on each board
drawingLoop:
for (i = 0; i < drawnNumbers.length; i++) {

    

    // cycles through each board
    for (n = 0; n < boardsDynamic.length; n++) {

        // checks if board contains drawn number and replaces it with X
        if (boardsDynamic[n].includes(drawnNumbers[i])) {
            let index = boardsDynamic[n].indexOf(drawnNumbers[i]);
            if (index != -1) {
                boardsDynamic[n][index] = 'X';
            }
        }

        let markedSpots = '';

        // this tracks the indexes of marked spots for each board
        for (j = 0; j < boardsDynamic[n].length; j++) {
            if (boardsDynamic[n][j] == 'X') {
                markedSpots = markedSpots.concat(' ' + j);
            }

        }

        bingoCheck[n] = markedSpots;

    }

    console.log('Bingo Check: ' + bingoCheck);

    // check marked spots against bingoWins list
    for (n = 0; n < bingoCheck.length; n++) {

        for (j = 0; j < bingoWins.length; j++) {
            if (bingoCheck[n].includes(bingoWins[j])) {
                console.log('We have a winner! Board: ' + n);
                winningBoard = n;
                winningPattern = bingoWins[j];
                finalDrawing = drawnNumbers[i];
                break drawingLoop;
            }
        }

    }

}

let winningBoardIndex = bingoCheck[winningBoard].split(' ').slice(1).map(Number);

let sumOfFullBoard = 0;
for (i = 0; i < boards[winningBoard].length; i++) {
    sumOfFullBoard = sumOfFullBoard + boards[winningBoard][i];
}

let sumOfMarked = 0;
for (i = 0; i < winningBoardIndex.length; i++) {
    sumOfMarked = sumOfMarked + boards[winningBoard][winningBoardIndex[i]];
}
console.log((sumOfFullBoard - sumOfMarked) * finalDrawing);

console.log(finalDrawing)
console.log(winningPattern);