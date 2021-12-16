const fs = require('fs');
const path = require('path/posix');
const internal = require('stream');
const { compileFunction } = require('vm');

// split into into 1D array of caves
let input = fs.readFileSync("./Day15/realInput.txt")
    .toString()
    .trim()
    .split(/\n/)


input.forEach((a, i) => input[i] = a.split(''))

//console.table(input)

const maxY = input.length - 1;
const maxX = input[0].length - 1;

let graph = {};


// sets up our graph
input.forEach(
    (a, i) => a.forEach(
        (b, j) => {
            graph[i + ',' + j] = {
                riskValue: Number(b),
                connections: [],
                visited: false,
            };
            if (i != 0) {
                graph[i + ',' + j].connections.push((i - 1) + ',' + j)
            };
            if (j != 0) {
                graph[i + ',' + j].connections.push(i + ',' + (j - 1))
            };
            if (i < maxY) {
                graph[i + ',' + j].connections.push((i + 1) + ',' + j)
            };
            if (j < maxX) {
                graph[i + ',' + j].connections.push(i + ',' + (j + 1))
            }
        }
    )
)


// Sorts connection to prioritize down-right movement
for (x in graph) {
    graph[x]['connections'].sort(function (a, b) {
        //return graph[a]['riskValue'] - graph[b]['riskValue']
        //return ((Math.abs((maxY / 2) - (b.split(',')[0]))) + (Math.abs((maxX / 2) - (b.split(',')[1])))) - ((Math.abs((maxY / 2) - (a.split(',')[0]))) + (Math.abs((maxX / 2) - (a.split(',')[1]))))
        return (b.split(',')[0] + b.split(',')[1]) - (a.split(',')[0] + a.split(',')[1])
    })
}


//onsole.log(graph)

graph['0,0']['riskValue'] = 0;

let finalNode = maxY + ',' + maxX
let lowestRisk = 0;
let tempRisk = 0;
let currentPath = [];
let count = 0;
let lowestPath = [];
let baselineCount = 0


// find risk score of a path straight from top left to bottom right (should be relatively low)
function findBaseline(currentNode) {
    //console.log(currentNode)
    lowestRisk += graph[currentNode]['riskValue']
    if (currentNode != finalNode && baselineCount == 0) {
        baselineCount = 1;
        findBaseline((Number(currentNode.split(',')[0]) + 1) + ',' + Number(currentNode.split(',')[1]))
    } else if (currentNode != finalNode && baselineCount == 1) {
        baselineCount = 0;
        findBaseline(Number(currentNode.split(',')[0]) + ',' + (Number(currentNode.split(',')[1]) + 1))
    }

}

lowestRisk += 1;
findBaseline('0,0')
console.log(lowestRisk)


// DFS through all possible paths, but stopping if a path's risk score gets above the lowest score found so far
console.log('')
function navigate(currentNode) {
    //console.log(currentNode)
    currentPath.push(currentNode)
    tempRisk += graph[currentNode]['riskValue']
    graph[currentNode]['visited'] = true

    if (currentNode != finalNode && tempRisk < lowestRisk) {
        graph[currentNode]['connections'].forEach(a => {

            if (graph[a]['visited'] == false) {
                navigate(a)
                tempRisk -= graph[currentPath[currentPath.length - 1]]['riskValue']
                graph[currentPath[currentPath.length - 1]]['visited'] = false
                currentPath.pop()
            }
        }
        )
    } else if (currentNode == finalNode && tempRisk < lowestRisk) {
        count++
        //console.log(count)
        console.log(tempRisk)
        lowestRisk = tempRisk
    }

}

navigate('0,0')
//console.log(graph)
console.log('count = ' + count)
//console.log(lowestPath)
console.log(lowestRisk)


