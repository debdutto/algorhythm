import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MIDI from "midi.js";
import { prepareNotes, playNote } from "../../modules/music";
import BasicPlayer from "../../elements/basic-player-no-gui/index.js";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter";

class Fibonacci extends React.Component {
  render() {
    return BasicPlayer();
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
}

const midNum = 1;
const lastNum = 2;

const baseBarCount = Number.POSITIVE_INFINITY;

let barCount = baseBarCount;

const BPM = 80;
const barTime = 60000 / BPM;
const delay = n => n * 0.125 * barTime;
let notes = [];

let play = true;

const playMusic = (current, next) => {
  playNote(notes[current % 21], (current % 97) + 30, delay(current % 8));

  playNote(notes[next % 21], (next % 97) + 30, delay(current % 8));

  let nextFibo = generateFibonacci(current, next)[0];
  if (nextFibo < Number.MAX_SAFE_INTEGER && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, nextFibo);
    }, barTime);
  } else if (play) {
    console.log("seriesReset", next);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(midNum, lastNum);
    }, barTime);
  }
};

const generateFibonacci = (nMinus1, nMinus2, n) => {
  var i;
  var fib = [];
  if (n > 0) {
    n = n - 1;
  } else {
    n = 0;
  }

  fib[0] = nMinus2;
  fib[1] = nMinus1;
  for (i = 2; i <= 2 + n; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  return fib.slice(2);
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
)(Fibonacci);
