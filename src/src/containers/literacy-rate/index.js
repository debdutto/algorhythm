import React from "react";
import MIDI from "midi.js";
import {
  prepareNotes,
  playNote,
  startMusic,
  stopMusic,
  humanize4by4
} from "../../modules/music";
import literacyData from "./literacy-rate.json";
import normalize from "../../modules/normalize";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class LiteracyRates extends React.Component {
  constructor() {
    super();
    this.headlineText = "Literacy Rates";
  }

  render() {
    let { classes } = this.props;
    console.log(this.headlineText);
    return ComplexPlayer(startMusic, stopMusic, classes, this.headlineText);
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
}

const baseBarCount = literacyData.literacy.length;
let barCount = baseBarCount;

const BPM = 70;
const barTime = 60000 / BPM;
const delay = n => n * 0.25 * barTime;
let notes = [];

let play = false;

const playMusic = (current, next, n) => {
  humanize4by4();

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

export default withStyles(GridStyles)(LiteracyRates);
