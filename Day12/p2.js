const fs = require('fs');
const { start } = require('repl');

// split into into 1D array of caves
let input = fs.readFileSync("./Day12/realInput.txt")
    .toString()
    .trim()
    .split(/[\r?\n-]/);

//console.log(input)

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

function resetCaveSizes(caveName, specialCave) {
    if (caveName.charAt(0) == caveName.charAt(0).toLowerCase()) {
        findCave(caveName)['size'] = 'small'
    } else {
        findCave(caveName)['size'] = 'big'
    }
    if(caveName == doubleCave) {
        findCave(caveName)['size'] = 'small+2'
    }
    //console.log(caveName + ' RESET SIZE')
}

let path = [];
let possiblePaths = 0;
let stringPath;
let doubleCave;
let doubleCount;


for (x of allCaves) {
    if (x.size == 'small' && x.name.length < 3) {
        //console.log(x.name + ' can be visited twice')
        x.size = 'small+2'
        doubleCave = x.name;
        path = [];
        navigatate('start')
        //console.table(allCaves)
        for (y of allCaves) {
            toggleCave(y.name, 'open')
            resetCaveSizes(y.name, undefined)
        }
        //console.log(x)
    }
}

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

        if (findCave(currentCave).size == 'small+2') {
            findCave(currentCave).size = 'small'
        }

        // cycle through caves that connect to the current cave
        findConnections(currentCave).forEach(function (a, index, arr) {
            //console.log(path)
            //console.log('options: ' + arr)
            // make sure any caves not yet explored in the current path are open (this is important because of the recursion)
            allCaves.forEach(function (a) {
                if (path.indexOf(a.name) == -1) {
                    toggleCave(a.name, 'open')
                    resetCaveSizes(a.name)
                }
            })
            //console.log('reset double count')
            doubleCount = 0;
            for (x of path) {
               if (x == doubleCave) {
                   doubleCount++
               } 
            }
            //console.log(doubleCount)
            if (doubleCount == 1) {
                findCave(doubleCave).size = 'small'
                toggleCave(doubleCave, 'open')
            } else if (doubleCount == 0) {
                findCave(doubleCave).size = 'small+2'
                toggleCave(doubleCave, 'open')
            }
            

            //console.log(doubleCave, findCave(doubleCave).size)
            // restart navigate function with new cave
            navigatate(a)

            // backtrack our path with each branch
            path.pop();
        })

        // check if we've reached the end cave
    } else if (currentCave == 'end') {
        stringPath = path.toString();
        //console.log('FOUND END ' + path + '\n')
        if (possiblePaths.indexOf(stringPath) == -1) {
            possiblePaths.push(stringPath);
        }
    }
}

// start navigating at the start cave
//navigatate('start');

//console.table(allCaves);
console.log(possiblePaths.length);
//console.log(decisions)

