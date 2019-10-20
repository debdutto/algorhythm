const jstat = require("jstat").jStat;

module.exports = (arr, rangeStart, rangeEnd) => {
  console.log("Normalizing: ", arr);

  rangeStart = rangeStart ? rangeStart : 1;
  rangeEnd = rangeEnd ? rangeEnd : 100;

  let arrMin = jstat.min(arr);
  let arrMax = jstat.max(arr);

  let rangeDifference = rangeEnd - rangeStart;
  let denominator = arrMax - arrMin;

  // (v - min(v)) * (newupper - newlower) / (max(v) - min(v)) + newlower

  let normalizedArr = arr.map(element => {
    return Math.round(
      ((element - arrMin) * rangeDifference) / denominator + rangeStart
    );
  });
  console.log("Normailzed: ", normalizedArr);
  return normalizedArr;
};