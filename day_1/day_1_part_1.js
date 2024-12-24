const fs = require('fs');

function getFileContent(filename) {
    return fs.readFileSync(filename, 'utf8');
}

function calculateTotalDistanceFromFile(fileContent) {    
    const lines = fileContent.trim().split('\n');
    const leftList = [];
    const rightList = [];

    for (let i = 0; i < lines.length; i += 1) {
        const currLine = lines[i];
        console.log("Current Line:", currLine);
        const leftNumber = +currLine.split('   ')[0];  // Parse left list
        const rightNumber = +currLine.split('   ')[1];  // Parse right list

        // Add numbers to respective lists
        leftList.push(leftNumber);
        rightList.push(rightNumber);
    }

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);


    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

const filename = 'day_1.txt';
const fileContent = getFileContent(filename);
const totalDistance = calculateTotalDistanceFromFile(fileContent);
console.log(`Total distance: ${totalDistance}`);
