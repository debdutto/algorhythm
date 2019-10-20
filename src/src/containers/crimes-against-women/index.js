import React from "react";
import MIDI from "midi.js";
import crimeData from "./crime-data.json";
import {
  prepareNotes,
  playNote,
  startMusic,
  stopMusic,
  humanize4by4
} from "../../modules/music";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class CrimesAgainstWomen extends React.Component {
  constructor() {
    super();
    this.headlineText = "Crimes Against Women";
  }

  render() {
    let { classes } = this.props;

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
        // crimeData.crimes = normalize(crimeData.crimes);
        notes = prepareNotes("B", 2, "major", 3);
      }
    });
  }
}

const baseBarCount = crimeData.crimes.length;
let barCount = baseBarCount;

const BPM = 80;
const barTime = 60000 / BPM;
const delay = n => n * 0.25 * barTime;
let notes = [];

let play = false;

const playMusic = (current, next, n) => {
  humanize4by4();

  console.log(
    notes[(next + current) % notes.length],
    notes[current % notes.length]
  );
  playNote(
    notes[current % notes.length],
    current % 97,
    delay(current % (current % 16))
  );
  playNote(
    notes[(next * current) % notes.length],
    ((next * current) % 97) + 30,
    delay((next * current) % ((next * current) % 16))
  );
  playNote(
    notes[(next + current) % notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 16))
  );
  // console.log(n)
  if (n <= crimeData.crimes.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getCrimesAtN(n + 1), n + 1);
    }, barTime);
    console.log(barCount, n);
  } else if (play) {
    console.log("seriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getCrimesAtN(1), getCrimesAtN(2), 1);
    }, barTime);
  }
};

const getCrimesAtN = n => {
  return crimeData.crimes[n - 1];
};

export default withStyles(GridStyles)(CrimesAgainstWomen);
