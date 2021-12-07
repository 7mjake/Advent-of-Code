let input = [16,1,2,0,4,2,7,1,2,14];
let max = Math.max(...input);
let min = Math.min(...input);

//console.log(min, max);

function calcFuel(index, loc) {
    return Math.abs(input[index] - loc);
}

let lowestFuel;

for (i = min; i <= max; i++) {
    let totalFuel = 0;
    for (x in input) {
        totalFuel = totalFuel + calcFuel(x,i);
    }
    if ((totalFuel < lowestFuel) || lowestFuel == undefined) {
        lowestFuel = totalFuel;
    }
}

console.log(lowestFuel);