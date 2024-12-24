const fs = require('fs');

function getFileContent(filename) {
    return fs.readFileSync(filename, 'utf8');
}

function calculateTotalSimFromFile(fileContent) {    
    const lines = fileContent.trim().split('\n');
    const leftList = [];
    const rightListCounters = {};

    for (let i = 0; i < lines.length; i += 1) {
        const currLine = lines[i];
        const leftNumber = +currLine.split('   ')[0];  // Parse left list
        const rightNumber = +currLine.split('   ')[1];  // Parse right list

        leftList.push(leftNumber);
        if(rightListCounters[rightNumber]) rightListCounters[rightNumber] += 1;
        else rightListCounters[rightNumber] = 1;
    }


    let totalSim = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalSim += leftList[i] * (rightListCounters[leftList[i]] ?? 0);
    }

    return totalSim;
}

const filename = 'day_1.txt';
const fileContent = getFileContent(filename);
const totalSim = calculateTotalSimFromFile(fileContent);
console.log(`Total distance: ${totalSim}`);
