const fs = require("fs");

function getFileContent(filename) {
  return fs.readFileSync(filename, "utf8");
}

function isSafeReport(reportNumsArray) {
  if (reportNumsArray.length < 2) return true;

  const initDiff = reportNumsArray[1] - reportNumsArray[0];
  let shouldBeIncreasing = initDiff > 0;

  for (let i = 1; i < reportNumsArray.length; i++) {
    const currDiff = reportNumsArray[i] - reportNumsArray[i - 1];
    const currIsIncreasing = currDiff > 0;
    const currAbsDiff = Math.abs(currDiff);

    if (
      (shouldBeIncreasing && !currIsIncreasing) ||
      (!shouldBeIncreasing && currIsIncreasing) ||
      currAbsDiff > 3 ||
      currAbsDiff < 1
    ) {
      return false;
    }
  }

  return true;
}

// Function to check if a report can be made safe by removing one level
function canBeMadeSafeByRemovingOneLevel(reportNumsArray) {
  // Try removing each level and check if the report becomes safe
  for (let i = 0; i < reportNumsArray.length; i++) {
    const modifiedReport = [...reportNumsArray.slice(0, i), ...reportNumsArray.slice(i + 1)];
    if (isSafeReport(modifiedReport)) {
      return true;
    }
  }
  return false;
}

// Function to count the safe reports
function getNumberOfSafeReports(fileContent) {
  const lines = fileContent.trim().split("\n");
  let safeReports = 0;

  for (let i = 0; i < lines.length; i++) {
    const currReportNums = lines[i].split(" ").map(Number);
    
    if (canBeMadeSafeByRemovingOneLevel(currReportNums)) {
      safeReports += 1;
    }
  }
  
  return safeReports;
}

// Main program to read the file and calculate the number of safe reports
const filename = "day_2.txt";
const fileContent = getFileContent(filename);
const safeReportsCount = getNumberOfSafeReports(fileContent);
console.log(`Safe reports: ${safeReportsCount}`);
