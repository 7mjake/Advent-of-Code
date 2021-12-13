const fs = require('fs');
const { start } = require('repl');

// split into into 1D array of caves
let input = fs.readFileSync("./Day12/testInput1.txt")
    .toString()
    .trim()
    .split(/[\r?\n-]/);

console.log(input)

const allCaves = [];

// create array of caves as objects with name and size values
input.forEach(function (value) {
    if (!allCaves.some(cave => cave.name === value)) {
        allCaves.push({ name: value })
        if (value.charAt(0) == value.charAt(0).toLowerCase()) {
            findCave(value)['size'] = 'small'
        } else {
            findCave(value)['size'] = 'big'
        }
    }
})

// cycle through input array by twos to map connections 
for (i = 0; i < input.length; i += 2) {
    let space1 = input[i];
    let space2 = input[i + 1];
    findCave(space1)[space2] = true;
    findCave(space2)[space1] = true;

}

console.table(allCaves)

// call this function with the name of a cave to return the actual object
function findCave(search) {
    return allCaves.find(a => a.name == search)
}

// call this function with the name of a cave to return all of the caves it's connected to
function findConnections(caveName) {
    let connectionsList = [];
    for (i = 2; i < Object.keys(findCave(caveName)).length; i++) {
        if (Object.values(findCave(caveName))[i] == true) {
            connectionsList.push(Object.keys(findCave(caveName))[i])
        }
    }
    return connectionsList
}

// call this function with a cave name and 'open' or 'close' to toggle the ability to enter said cave
// NOTE: this only toggles the abilit to enter a cave, you are still able to leave a closed cave
function toggleCave(caveName, action) {
    allCaves.forEach(function (cave) {
        if (cave[caveName] == true && action == 'close') {
            cave[caveName] = false
        } else if (cave[caveName] == false && action == 'open') {
            cave[caveName] = true
        }
    })
}

let path = [];
let possiblePaths = 0;

// explore caves
function navigatate(currentCave) {
    path.push(currentCave);
    //console.log('Path: ' + path)

    // make sure we haven't reached the end cave yet
    if (currentCave != 'end') {

        // if small cave is being visited, close its entrances 
        if (findCave(currentCave).size == 'small') {
            toggleCave(currentCave, 'close')
        }

        // cycle through caves that connect to the current cave
        findConnections(currentCave).forEach(function (a, index, arr) {

            // make sure any caves not yet explored in the current path are open (this is important because of the recursion)
            allCaves.forEach(function (a) {
                if (path.indexOf(a.name) == -1) {
                    toggleCave(a.name, 'open')
                }
            })

            // restart navigate function with new cave
            navigatate(a)

            // backtrack our path with each branch
            path.pop();
        })

        // check if we've reached the end cave
    } else if (currentCave == 'end') {
        console.log('FOUND END ' + path + '\n')
        possiblePaths++;
    }
}

// start navigating at the start cave
navigatate('start');

console.table(allCaves);
console.log(possiblePaths);
//console.log(decisions)

