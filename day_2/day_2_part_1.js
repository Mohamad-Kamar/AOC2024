const fs = require("fs");

function getFileContent(filename) {
  return fs.readFileSync(filename, "utf8");
}

// So, a report only counts as safe if both of the following are true:

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
// In the example above, the reports can be found safe or unsafe by checking those rules:

// 7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
// 1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
// 9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
// 1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
// 8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
// 1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.

function isSafeReport(reportNumsArray) {
  if (reportNumsArray.length < 2) return true;

  const initDiff = reportNumsArray[1] - reportNumsArray[0];
  let shouldBeIncreasing = initDiff > 0;
  for (let i = 1; i < reportNumsArray.length; i += 1) {
    const currDiff = reportNumsArray[i] - reportNumsArray[i - 1];
    const currIsIncreasing = currDiff > 0;
    const currAbsDiff = Math.abs(currDiff);
    if (
      (shouldBeIncreasing && !currIsIncreasing) ||
      (!shouldBeIncreasing && currIsIncreasing) ||
      currAbsDiff > 3 || currAbsDiff < 1
    ) {
        console.log({ reportNumsArray });
      return false;
    }
  }

//   console.log({ reportNumsArray });
  return true;
}

function getNumberOfSafeReports(fileContent) {
  const lines = fileContent.trim().split("\n");
  let safeReports = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const currReportNums = lines[i].split(" ");
    if (isSafeReport(currReportNums)) safeReports += 1;
  }
  return safeReports;
}

const filename = "day_2.txt";
const fileContent = getFileContent(filename);
const safeReportsCount = getNumberOfSafeReports(fileContent);
console.log(`Safe reports: ${safeReportsCount}`);
