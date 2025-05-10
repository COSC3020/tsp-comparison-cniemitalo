const fs = require('fs'); 
eval(fs.readFileSync('code.js') + ''); 

//create random matrix according to specified size 
function createMatrix(size) {
    const matrix = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1)
    );

    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            matrix[i][j] = matrix[j][i];
        }
        matrix[i][i] = 0; 
    }

    return matrix;
}

//compare both held karp and local search 
//stop at 11, as held karp's runtime is greater than 1hr 
function mainTesting() {
    for (let size = 1; size <= 11; size++) {
        console.log("Size: ", size); 
        let matrix = createMatrix(size); 
        let hkResult = tsp_hk_runtime(matrix);  
        console.log("Held Karp length: ", hkResult); 
        let lsResult = tsp_ls_runtime(matrix); 
        console.log("Local Search length: ", lsResult); 
    }
}

//run local search separately for an hour
function hourLocalSearch() {
    let matrix = createMatrix(6100); 
    console.log("Size: 6100");
    let lsResult = tsp_ls_runtime(matrix); 
    console.log("Local search length:", lsResult); 
}

mainTesting(); 
hourLocalSearch(); 