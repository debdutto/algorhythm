const fs = require('fs')
const literacyRate = require('./literacy-rate-open-data.json')

let literacyData = {}

const processliteracyData = (element) => {
    // console.log(element)
    // So, apparently we have three kinds of literacy rates since 1991 census
    // Male, Female and Persons.
    // What the hell is "Persons" literacy rate?

    let state = element[0].toUpperCase()

    let literacy1991Male = element[1]
    let literacy1991Female = element[2]
    let literacy1991Persons = element[3]

    let literacy2001Male = element[4]
    let literacy2001Female = element[5]
    let literacy2001Persons = element[6]

    let literacy2011Male = Math.round((element[7] + element[10]) / 2)
    let literacy2011Female = Math.round((element[8] + element[11]) / 2)
    let literacy2011Persons = Math.round((element[9] + element[12]) / 2)

    if (state !== "ALL INDIA") {
        literacyData[state] = {
            1991: {
                male: literacy1991Male,
                female: literacy1991Female,
                persons: literacy1991Persons
            },
            2001: {
                male: literacy2001Male,
                female: literacy2001Female,
                persons: literacy2001Persons
            },
            2011: {
                male: literacy2011Male,
                female: literacy2011Female,
                persons: literacy2011Persons
            }
        }
    }

}

literacyRate.data.forEach(processliteracyData)

const consolidated = JSON.stringify(literacyData)

fs.writeFile("literacy-rate-1991-2011.json", consolidated, 'utf8', function (err) {
    if (err) {
        return console.log(err)
    }
    console.log("The file was saved!")
})

let states = Object.keys(literacyData)
let years = ["1991", "2001", "2011"]
let fields = ["male", "female", "persons"]

let literacyDataArr = []

years.forEach(year => {
    fields.forEach(field => {
        states.forEach(state => {
            if (literacyData[state][year][field]) {
                literacyDataArr.push(parseInt(literacyData[state][year][field]))
            }
        })
    })
})

const content = JSON.stringify({
    literacy: literacyDataArr
})

fs.writeFile("literacy-rate.json", content, 'utf8', function (err) {
    if (err) {
        return console.log(err)
    }
    console.log("The file was saved!")
})