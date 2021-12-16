const fs = require('fs');
const internal = require('stream');

// split into into 1D array of caves
let input = fs.readFileSync("./Day15/testInput.txt")
    .toString()
    .trim()
    .split(/\n/)


input.forEach((a, i) => input[i] = a.split(''))

//console.table(input)

const maxY = input.length - 1;
const maxX = input[0].length - 1;

let graph = {};

//input.forEach(
//    (a, i) => a.forEach(
//        (b, j) => {
//            let obj = {
//                value: b,
//                pos: [i, j],
//                connections: [],
//                distance: Infinity,
//                vistited: false,
//            };
//            if (i != 0) {
//                obj.connections.push([i - 1, j])
//            };
//            if (j != 0) {
//                obj.connections.push([i, j - 1])
//            };
//            if (i < maxY) {
//                obj.connections.push([i + 1, j])
//            };
//            if (j < maxX) {
//                obj.connections.push([i, j + 1])
//            }
//
//            positions.push(obj);
//
//        }
//    )
//)

// sets up our graph
input.forEach(
    (a, i) => a.forEach(
        (b, j) => {
            graph[i + ',' + j] = {
            };
            if (i != 0) {
                graph[i + ',' + j][(i - 1) + ',' + j] = Number(input[i - 1][j])
            };
            if (j != 0) {
                graph[i + ',' + j][i + ',' + (j - 1)] = Number(input[i][j - 1])
            };
            if (i < maxY) {
                graph[i + ',' + j][(i + 1) + ',' + j] = Number(input[i + 1][j])
            };
            if (j < maxX) {
                graph[i + ',' + j][i + ',' + (j + 1)] = Number(input[i][j + 1])
            }

        }
    )
)

//console.log(graph)

let shortestDistanceNode = (distances, visited) => {
    let shortest = null;

    for (let node in distances) {

        let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];

        if (currentIsShortest && !visited.includes(node)) {

            shortest = node;
        }
    }
    return shortest;
};

let findShortestPath = (graph, startNode, endNode) => {
 
    // track distances from the start node using a hash object
      let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
   // track paths using a hash object
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
     parents[child] = startNode;
    }
     
    // collect visited nodes
      let visited = [];
   // find the nearest node
      let node = shortestDistanceNode(distances, visited);
    
    // for that node:
    while (node) {
    // find its distance from the start node & its child nodes
     let distance = distances[node];
     let children = graph[node]; 
         
    // for each of those child nodes:
         for (let child in children) {
     
     // make sure each child node is not the start node
           if (String(child) === String(startNode)) {
             continue;
          } else {
             // save the distance from the start node to the child node
             let newdistance = distance + children[child];
   // if there's no recorded distance from the start node to the child node in the distances object
   // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
             if (!distances[child] || distances[child] > newdistance) {
   // save the distance to the object
        distances[child] = newdistance;
   // record the path
        parents[child] = node;
       } 
            }
          }  
         // move the current node to the visited set
         visited.push(node);
   // move to the nearest neighbor node
         node = shortestDistanceNode(distances, visited);
       }
     
    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
     shortestPath.push(parent);
     parent = parents[parent];
    }
    shortestPath.reverse();
     
    //this is the shortest path
    let results = {
     distance: distances[endNode],
     path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
      return results;
   };

   console.log(findShortestPath(graph, '0,0', '9,9'))

