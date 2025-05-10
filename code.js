//my implementation of TSP Local Search
function tsp_ls(distance_matrix) {
    let len = distance_matrix.length; 

    //check if there is more than 1 city 
    if (len <= 1) {
        return 0; 
    }

    //start with random route 
    let currentRoute = Array.from({ length: len }, (_, i) => i); 
    for (let i = len - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]]; 
    }

    //start with random route's length, potentially find something better 
    let minLength = calculateLength(currentRoute, distance_matrix); 
    let maxIterations = len * len; //number of elements in distance_matrix 

    //set maxIterations so that every (i, k) pair could potentially be 
    //randomly chosen, that way it was a throughout check to determine 
    //the shortest possible route 
    for (let j = 0; j < maxIterations; j++) {
        //i and k are random numbers 
        //i is chosen based off the number of matrix elements
        //k is chosen based off the number of matrix elements and is less than i 
        let i = Math.floor(Math.random() * (len - 1)); 
        let k = Math.floor(Math.random() * (len - i - 1)) + i + 1; 

        //calculates new length for every new currentRoute 
        currentRoute = twoOptSwap(currentRoute, i, k); //perform 2optSwap
        let newLength = calculateLength(currentRoute, distance_matrix); 

        //determine the best route and minimum length 
        if (newLength < minLength) {
            minLength = newLength; 
        }
    }

    return minLength;
}

//helper function to calculate the length of a route 
function calculateLength(route, matrix) {
    let total = 0; 
    for (let i = 0; i < route.length - 1; i++) {
        total += matrix[route[i]][route[i+1]]; 
    }
    total += matrix[route[route.length -1]][route[0]]; 
    return total; 
}

//implementation of the 2optSwap pseudocode 
function twoOptSwap(route, i, k) {
    let first = route.slice(0, i); 
    let second = route.slice(i, k + 1).reverse();
    let third = route.slice(k + 1); 
    return first.concat(second, third); 
}


//CadeMaynard's implementation of TSP-Held-Karp
//https://github.com/COSC3020/tsp-held-karp-CadeMaynard
function tsp_hk(distance_matrix) {
    tsp_mems = [];
    let nodesLeft = [];
    if(distance_matrix.length <= 1) {
        return 0;
    } else {
        for(let a = 0; a < distance_matrix.length; a++) //Initializes the nodesLeft array, it is in order from the beginning
            nodesLeft[a] = a;
        let min = Infinity;
        let temp = 0;
        for(let i = 0; i < distance_matrix.length; i++){
            temp = tsp_HeldKarp(distance_matrix, i, nodesLeft)
            if(temp < min)
                min = temp
    }
    return min
    }
}

function tsp_HeldKarp(distance_matrix, start, nodesLeft) {
    if(tsp_mems[JSON.stringify(nodesLeft) + start] === undefined) {
        if(nodesLeft.length < 1) {
            return 0;
        } else if(nodesLeft.length == 1) {
            tsp_mems[JSON.stringify(nodesLeft) + start] = distance_matrix[start][nodesLeft[0]];
            return tsp_mems[JSON.stringify(nodesLeft) + start];
        } else {
            let min = Infinity;
            let minI = -1;

            for(let i = 0; i < nodesLeft.length; i++) {
                let tempStart = nodesLeft.splice(i,1)                                        //The splice function here removes one item
                temp = distance_matrix[start][tempStart] + tsp_HeldKarp(distance_matrix, tempStart, nodesLeft.flat(Infinity))    //from the array at the index and returns
                if(temp < min) {                                                             //that item to the tempStart variable
                    min = temp;                                                                                                                                                                                           
                    minI = tempStart;
                }
                nodesLeft.splice(i,0,tempStart);                                            //Here, splice is used to reinsert the 
            }                                                                               //tempStart variable back into the array at
            tsp_mems[JSON.stringify(nodesLeft) + start] = min;//the same point it was removed. For all
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //recursive calls, the function will receive
        }                                                                                   //a correctly sorted array and anything taken
                                                                                            //out will be added back in at the same 
    } else {                                                                                //point. At no point should the array become
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //unsorted. So we do not need to worry about
        }                                                                                   //the memoization not being used for different
}        


// run tsp-local-search and tsp-held-karp and print out their runtimes 
function tsp_ls_runtime(distance_matrix) {
    console.time("Local Search time"); 
    let minLength = tsp_ls(distance_matrix); 
    console.timeEnd("Local Search time"); 

    return minLength; 
} 

function tsp_hk_runtime(distance_matrix) {
    console.time("Held Karp time"); 
    let minLength = tsp_hk(distance_matrix); 
    console.timeEnd("Held Karp time"); 

    return minLength; 
}
