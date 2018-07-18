import React from "react"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import MIDI from "midi.js"
import scale from 'music-scale'
import piPlaces from './pi-places.json'
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
        console.log(piPlaces)
        prepareNotes("C")
      }
    })
  }

  startMusic() {
    play = true
    if (play) {
      setTimeout(() => {
        playMusic(getPiAtN(1), getPiAtN(2), 1)
      }, 500)
    }
  }

  stopMusic() {
    play = false
  }
}

const firstNum = 1
const midNum = 1
const lastNum = 2

const baseBarCount = piPlaces.pi.length

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

const playMusic = (current, next, n) => {

  // playNote(notes[sum % 21], (sum % 97) + 30, delay(sum % 8))
  // playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4))

  if (!(n % 4)) {
    console.log("Played Bar")
    playNote(notes[next - (current / 2) % 21], (next - (current / 2) % 30) + 97, delay(next - (current / 2) % 4))
  }

  playNote(notes[current % 21], (current % 77) + 50, delay(current % 4))

  playNote(notes[next - current % 21], (next - current % 97) + 30, delay(next - current % 4))
  console.log(n)
  if (n <= piPlaces.pi.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getPiAtN(n + 1), n + 1)
    }, barTime)
  } else if (play) {
    console.log("seriesReset", n)
    barCount = baseBarCount
    setTimeout(() => {
      playMusic(getPiAtN(1), getPiAtN(2), 1)
    }, barTime)
  }
}

const getPiAtN = (n) => {
  return piPlaces.pi[n - 1]
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
