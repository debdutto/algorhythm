const fs = require('fs')
const moment = require("moment")
const jstat = require("jstat").jStat
const airQuality2009 = require('./delhi/2009.json')
const airQuality2011 = require('./delhi/2011.json')
const airQuality2012 = require('./delhi/2012.json')
const airQuality2013 = require('./delhi/2013.json')
const airQuality2014 = require('./delhi/2014.json')
const airQuality2015 = require('./delhi/2015.json')
const airQuality2016 = require('./delhi/2016.json')

const DDMMYYYY_SLASH_FORMAT = "DD/MM/YYYY"
const DDMMYYYY_DOT_FORMAT = "DD.MM.YYYY"

let fields2009 = airQuality2009.splice(0, 1)[0]
let fields2011 = airQuality2011.splice(0, 1)[0]
let fields2012 = airQuality2012.splice(0, 1)[0]
let fields2013 = airQuality2013.splice(0, 1)[0]
let fields2014 = airQuality2014.splice(0, 1)[0]
let fields2015 = airQuality2015.splice(0, 1)[0]
let fields2016 = airQuality2016.splice(0, 1)[0]


let delhiAirQualityData = {}

const parseAirQuality = (dataArray, dateIndex, dateFormat, pm10Index) => {
    dataArray.forEach(element => {

        let dateString = element[dateIndex]

        let date = moment(dateString, dateFormat)

        if (!delhiAirQualityData[date.year()]) {
            delhiAirQualityData[date.year()] = {}
        }

        let dataMonth = date.month() + 1
        if (!delhiAirQualityData[date.year()][dataMonth]) {
            delhiAirQualityData[date.year()][dataMonth] = []
        }

        let pm10Concentration = element[pm10Index]
        if (!isNaN(parseInt(pm10Concentration))) {
            delhiAirQualityData[date.year()][dataMonth].push(parseInt(pm10Concentration))
        }

        // console.log(element, date.year())
    })
}

/**
 * Parsing 2009
 */
console.log(fields2009[0], fields2009[7])
parseAirQuality(airQuality2009, 0, DDMMYYYY_SLASH_FORMAT, 7)

/**
 * Parsing 2011
 */
console.log(fields2011[1], fields2011[9])
parseAirQuality(airQuality2011, 1, DDMMYYYY_SLASH_FORMAT, 9)

/**
 * Parsing 2012
 */
console.log(fields2012[1], fields2012[9])
parseAirQuality(airQuality2012, 1, DDMMYYYY_SLASH_FORMAT, 9)

/**
 * Parsing 2013
 */
console.log(fields2013[1], fields2013[9])
parseAirQuality(airQuality2013, 1, DDMMYYYY_SLASH_FORMAT, 9)

/**
 * Parsing 2014
 */
console.log(fields2014[1], fields2014[9])
parseAirQuality(airQuality2014, 1, DDMMYYYY_SLASH_FORMAT, 9)

/**
 * Parsing 2015
 */
console.log(fields2015[1], fields2015[9])
parseAirQuality(airQuality2015, 1, DDMMYYYY_SLASH_FORMAT, 9)

/**
 * Parsing 2016
 */
console.log(fields2016[2], fields2016[5])
parseAirQuality(airQuality2016, 2, DDMMYYYY_DOT_FORMAT, 5)



const aggregateYearData = (dataSet) => {
    Object.keys(dataSet).forEach(year => {
        Object.keys(dataSet[year]).forEach(month => {
            let meanMonth = Math.round(jstat.mean(dataSet[year][month]))
            let medianMonth = Math.round(jstat.median(dataSet[year][month]))
            dataSet[year][month] = {
                mean: meanMonth,
                median: medianMonth
            }
        })
    })
    return dataSet
}

delhiAirQualityData = aggregateYearData(delhiAirQualityData)

console.log(delhiAirQualityData)

const consolidated = JSON.stringify(delhiAirQualityData)

fs.writeFile("air-quality-index-delhi-2009-2016.json", consolidated, 'utf8', function (err) {
    if (err) {
        return console.log(err)
    }
    console.log("The file was saved!")
})

// let states = Object.keys(delhiAirQualityData)
// let years = ["1991", "2001", "2011"]
// let fields = ["male", "female", "persons"]

// let delhiAirQualityDataArr = []

// years.forEach(year => {
//     fields.forEach(field => {
//         states.forEach(state => {
//             if (delhiAirQualityData[state][year][field]) {
//                 delhiAirQualityDataArr.push(parseInt(delhiAirQualityData[state][year][field]))
//             }
//         })
//     })
// })

// const content = JSON.stringify({
//     literacy: delhiAirQualityDataArr
// })

// fs.writeFile("literacy-rate.json", content, 'utf8', function (err) {
//     if (err) {
//         return console.log(err)
//     }
//     console.log("The file was saved!")
// })