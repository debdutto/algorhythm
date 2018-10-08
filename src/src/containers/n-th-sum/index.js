import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MIDI from "midi.js";
import { prepareNotes } from "../../modules/music";

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter";

class NthSum extends React.Component {
  render() {
    return (
      <div>
        <p>
          <button onClick={this.startMusic}>Start</button>

          <button onClick={this.stopMusic}>Stop</button>
        </p>
      </div>
    );
  }

  componentDidMount() {
    console.log("MIDIObj", MIDI);
    MIDI.loadPlugin({
      soundfontUrl: process.env.PUBLIC_URL + "/soundfont/",
      instrument: "acoustic_grand_piano",
      onprogress: function(state, progress) {
        console.log(state, progress);
      },
      onsuccess: function() {
        notes = prepareNotes("C");
      }
    });
  }

  startMusic() {
    play = true;
    if (play) {
      setTimeout(() => {
        playMusic(1, 1);
      }, 500);
    }
  }

  stopMusic() {
    play = false;
  }
}

const baseBarCount = Number.POSITIVE_INFINITY;

let barCount = baseBarCount;

const BPM = 80;
const barTime = 60000 / BPM;
const delay = n => n * 0.125 * barTime;
let notes = [];

let play = true;

const playNote = (note, velocity, delay) => {
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000);
  MIDI.noteOff(0, MIDI.keyToNote[note], barTime);
};

const playMusic = (sum, n) => {
  playNote(notes[sum % 21], (sum % 97) + 30, delay(sum % 8));
  playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4));

  let nextSum = generateNthSum(n + 1);
  if (nextSum < Number.MAX_SAFE_INTEGER && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(nextSum, n + 1);
    }, barTime);
  } else if (play) {
    console.log("seriesReset", nextSum);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(1, 1);
    }, barTime);
  }
};

const generateNthSum = n => {
  return (n * (n + 1)) / 2;
};

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

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
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NthSum);
