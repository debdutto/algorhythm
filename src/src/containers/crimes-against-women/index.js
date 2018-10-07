import React from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import MIDI from "midi.js"
import scale from 'music-scale'
import crimeData from './crime-data.json'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter"

class Pi extends React.Component {
  render() {
    return (
      <div>
        <p>
          <button
            onClick={this.startMusic}
          >
            Start
          </button>

          <button
            onClick={this.stopMusic}
          >
            Stop
          </button>
        </p>
      </div>
    )
  }

  componentDidMount() {
    console.log("MIDIObj", MIDI)
    MIDI.loadPlugin({
      soundfontUrl: process.env.PUBLIC_URL + "/soundfont/",
      instrument: "acoustic_grand_piano",
      onprogress: function (state, progress) {
        console.log(state, progress)
      },
      onsuccess: function () {
        // console.log(piPlaces)
        prepareNotes("C")
      }
    })
  }

  startMusic() {
    play = true
    if (play) {
      setTimeout(() => {
        playLeadIn(0, () => {
          playMusic(getCrimesAtN(1), getCrimesAtN(2), 1)
        })
      }, 500)
    }
  }

  stopMusic() {
    play = false
  }
}

const baseBarCount = crimeData.crimes.length
const leadInCount = 0
let barCount = baseBarCount

const BPM = 80
const barTime = 60000 / BPM
const delay = (n) => (n * 0.25 * barTime)
const notes = []
const prepareNotes = (selectedScale, startOctave) => {
  selectedScale = selectedScale ? selectedScale : 'A'
  startOctave = startOctave ? startOctave : 3
  let octave = startOctave ? startOctave : 3
  // let tempNotes = 
  for (octave; octave < startOctave + 3; octave++) {
    notes.push(...scale('major', selectedScale + octave))
  }
  // for()
  console.log(notes, notes.length)
}

let play = true

const playNote = (note, velocity, delay) => {
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000)
  MIDI.noteOff(0, MIDI.keyToNote[note], barTime)
}

const playLeadIn = (n, callback) => {
  playNote(notes[14], 120, 0)

  if (n++ < leadInCount) {
    setTimeout(() => {
      playLeadIn(n, callback)
    }, barTime)
  } else {
    callback()
  }

}

const playMusic = (current, next, n) => {

  // playNote(notes[sum % 21], (sum % 97) + 30, delay(sum % 8))
  // playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4))

  if (!(n % 4)) {
    if (current > next) {
      playNote(notes[(current - next) % 21], ((current - next) % 37) + 90, 0)
    } else {
      playNote(notes[(next - current) % 21], ((next - current) % 37) + 90, 0)
    }
  }

  // playNote(notes[current % 21], (current % 97) + 30, 0)
  playNote(notes[current % 21], (current % 97), delay(current % 4))

  playNote(notes[(next + current) % 21], ((next + current) % 97), delay((next + current) % 4))
  // console.log(n)
  if (n <= crimeData.crimes.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getCrimesAtN(n + 1), n + 1)
    }, barTime)
    console.log(barCount, n)
  } else if (play) {
    console.log("seriesReset", n)
    barCount = baseBarCount
    setTimeout(() => {
      playMusic(getCrimesAtN(1), getCrimesAtN(2), 1)
    }, barTime)
  }
}

const getCrimesAtN = (n) => {
  return crimeData.crimes[n - 1]
}

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push("/about-us")
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Pi)
