import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MIDI from "midi.js";
import { prepareNotes } from "../../modules/music";
import literacyData from "./literacy-rate.json";
import normalize from "../../modules/normalize";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter";

class LiteracyRates extends React.Component {
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
        // console.log(piPlaces)
        literacyData.literacy = normalize(literacyData.literacy, 0, 100);
        notes = prepareNotes("B", 2, "major", 4);
      }
    });
  }

  startMusic() {
    play = true;
    if (play) {
      setTimeout(() => {
        playLeadIn(0, () => {
          playMusic(getLiteracyAtN(1), getLiteracyAtN(2), 1);
        });
      }, 500);
    }
  }

  stopMusic() {
    play = false;
  }
}

const baseBarCount = literacyData.literacy.length;
const leadInCount = 0;
let barCount = baseBarCount;

const BPM = 70;
const barTime = 60000 / BPM;
const delay = n => n * 0.25 * barTime;
let notes = [];

let play = true;

const playNote = (note, velocity, delay) => {
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000);
  MIDI.noteOff(0, MIDI.keyToNote[note], barTime);
};

const playLeadIn = (n, callback) => {
  playNote(notes[14], 120, 0);

  if (n++ < leadInCount) {
    setTimeout(() => {
      playLeadIn(n, callback);
    }, barTime);
  } else {
    callback();
  }
};

const playMusic = (current, next, n) => {
  // playNote(notes[sum % notes.length], (sum % 97) + 30, delay(sum % 8))
  // playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4))

  if (!(n % 4)) {
    if (current > next) {
      playNote(
        notes[(current - next) % notes.length],
        ((current - next) % 37) + 90,
        0
      );
    } else {
      playNote(
        notes[(next - current) % notes.length],
        ((next - current) % 37) + 90,
        0
      );
    }
  }

  // playNote(notes[current % notes.length], (current % 97) + 30, 0)
  playNote(notes[current % notes.length], current % 97, delay(current % 8));
  // playNote(
  //   notes[(next * current) % notes.length],
  //   ((next * current) % 97) + 30,
  //   delay((next * current) % ((next * current) % 8))
  // );
  playNote(
    notes[(next + current) % notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 8))
  );
  // console.log(n)
  if (n <= literacyData.literacy.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getLiteracyAtN(n + 1), n + 1);
    }, barTime);
    // console.log(barCount, n)
  } else if (play) {
    console.log("seriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getLiteracyAtN(1), getLiteracyAtN(2), 1);
    }, barTime);
  }
};

const getLiteracyAtN = n => {
  return literacyData.literacy[n - 1];
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
)(LiteracyRates);
