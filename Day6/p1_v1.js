let input = [5,1,4,1,5,1,1,5,4,4,4,4,5,1,2,2,1,3,4,1,1,5,1,5,2,2,2,2,1,4,2,4,3,3,3,3,1,1,1,4,3,4,3,1,2,1,5,1,1,4,3,3,1,5,3,4,1,1,3,5,2,4,1,5,3,3,5,4,2,2,3,2,1,1,4,1,2,4,4,2,1,4,3,3,4,4,5,3,4,5,1,1,3,2,5,1,5,1,1,5,2,1,1,4,3,2,5,2,1,1,4,1,5,5,3,4,1,5,4,5,3,1,1,1,4,5,3,1,1,1,5,3,3,5,1,4,1,1,3,2,4,1,3,1,4,5,5,1,4,4,4,2,2,5,5,5,5,5,1,2,3,1,1,2,2,2,2,4,4,1,5,4,5,2,1,2,5,4,4,3,2,1,5,1,4,5,1,4,3,4,1,3,1,5,5,3,1,1,5,1,1,1,2,1,2,2,1,4,3,2,4,4,4,3,1,1,1,5,5,5,3,2,5,2,1,1,5,4,1,2,1,1,1,1,1,2,1,1,4,2,1,3,4,2,3,1,2,2,3,3,4,3,5,4,1,3,1,1,1,2,5,2,4,5,2,3,3,2,1,2,1,1,2,5,3,1,5,2,2,5,1,3,3,2,5,1,3,1,1,3,1,1,2,2,2,3,1,1,4,2];
let counts = {};
let countsArray = [0,0,0,0,0,0,0,0,0];

// counts initial fish at each timer stage
for (x of input) {
    counts[x] = counts[x] ? counts[x] + 1 : 1;
}

// creates array of fish counts
for (i = 0; i < 9; i++) {
 if (counts[i] != undefined) {
     countsArray[i] = countsArray[i] + counts[i];
 }
}

console.log(counts)
console.log(countsArray)

// cycle through days
for (i = 0; i < 80; i++) {
    //adds new fish at end of array
    countsArray.push(countsArray[0]);

    //adds postpartum fish at timer 6
    countsArray[7] = countsArray[7] + countsArray[0];

    //shifts fish counts down 1 index by removing postpartum fish from beginning of array 
    countsArray.shift()

    //console.log('after ' + (i + 1) + ' days: ' + countsArray)
}



let totalCount = 0;

for (x in countsArray) {
    totalCount = totalCount + countsArray[x];
}

console.log(totalCount);