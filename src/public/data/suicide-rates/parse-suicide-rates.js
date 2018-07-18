const fs = require('fs');
const suicides2001To2012 = require('./suicide-2001-2012.json')
const suicides2013 = require('./suicide-2013.json')
const suicides2014 = require('./suicide-2014.json')

let suicideData = {}

const processSuicideData = (element) => {

    let state = element[0].toUpperCase()
    let year = element[1].toUpperCase()
    let cause = element[2].toUpperCase()
    let totalSuicides = element[15]
    
    if(cause.toUpperCase() === "TOTAL" && state.indexOf("TOTAL") < 0) {
        if(!suicideData[state]) {
            suicideData[state] = {}
        }
        suicideData[state][year] = totalSuicides
        console.log(state, year, cause, totalSuicides)
    }

}

suicides2001To2012.data.forEach(processSuicideData)

suicides2013.data.forEach(processSuicideData)

suicides2014.data.forEach(processSuicideData)

const consolidated = JSON.stringify(suicideData);

fs.writeFile("suicide-2001-2014.json", consolidated, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

let yearArr = []
for (i = 1; i <= 14; i++) {
    yearArr.push((2000 + i).toString())
}

let states = Object.keys(suicideData)

let suicideDataArr = []

yearArr.forEach(year => {
    states.forEach(state => {
        if (suicideData[state][year]) {
            // console.log(`Pushing ${year}'s data for ${state}, ${suicideData[state][year]}`)
            suicideDataArr.push(parseInt(suicideData[state][year]))
        }
    });
});

const content = JSON.stringify({
    suicides: suicideDataArr
});

fs.writeFile("suicide-data.json", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});