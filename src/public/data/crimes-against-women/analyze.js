const fs = require("fs");
const crimes2001To2012 = require("./2001-2012.json");
const crimes2013 = require("./2013.json");
const crimes2014 = require("./2014.json");

let crimeData = {};

crimes2001To2012.data.forEach(element => {
  let crimeHead = element[1].toUpperCase();
  if (crimeHead === "TOTAL CRIMES AGAINST WOMEN") {
    let state = element[0].toUpperCase();
    crimeData[state] = {};
    for (let i = 2; i < element.length; i++) {
      crimeData[state][(2000 + i - 1).toString()] = element[i];
    }
  }
});

crimes2013.data.forEach(element => {
  let crimeHead = element[1].toUpperCase();
  if (crimeHead === "TOTAL CRIMES AGAINST WOMEN") {
    let state = element[0].toUpperCase();
    // console.log(state)
    if (!state.includes("TOTAL")) {
      crimeData[state]["2013"] = element[2];
    }
    // console.log(crimeData)
  }
});

crimes2014.data.forEach(element => {
  let crimeHead = element[1].toUpperCase();
  // console.log(crimeHead)
  if (crimeHead.includes("TOTAL CRIMES AGAINST WOMEN")) {
    let state = element[0].toUpperCase();
    // console.log(state)
    if (!state.includes("TOTAL")) {
      if (!crimeData[state]) {
        crimeData[state] = {};
      }
      crimeData[state]["2014"] = element[2];
    }
  }
});

// console.log(crimeData)

let yearArr = [];
for (i = 1; i <= 14; i++) {
  yearArr.push((2000 + i).toString());
}

// console.log(yearArr)

let states = Object.keys(crimeData);

let crimeDataArr = [];

yearArr.forEach(year => {
  states.forEach(state => {
    if (crimeData[state][year]) {
      // console.log(`Pushing ${year}'s data for ${state}, ${crimeData[state][year]}`)
      crimeDataArr.push(parseInt(crimeData[state][year]));
    }
  });
});

const content = JSON.stringify({
  crimes: crimeDataArr
});

fs.writeFile("crime-data.json", content, "utf8", function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

// console.log(crimeDataArr, crimeDataArr.length)
