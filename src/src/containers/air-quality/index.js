import React from "react";
import MIDI from "midi.js";
import {
  prepareNotes,
  playNote,
  startMusic,
  stopMusic,
  humanize4by4
} from "../../modules/music";
import AirQualityData from "./air-quality-index-delhi.json";
import normalize from "../../modules/normalize";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class AirQuality extends React.Component {
  constructor() {
    super();
    this.headlineText = "Air Quality - Delhi";
  }

  render() {
    let { classes } = this.props;

    return ComplexPlayer(startMusic, stopMusic, classes);
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
        notes = prepareNotes("B", 2, "major", 4);
        AirQualityData.airQualityIndex = normalize(
          AirQualityData.airQualityIndex,
          0,
          100
        );
      }
    });
  }
}

const baseBarCount = AirQualityData.airQualityIndex.length;
let barCount = baseBarCount;

const BPM = 70;
const barTime = 60000 / BPM;
const delay = n => n * 0.25 * barTime;
let notes = [];

let play = false;

const playMusic = (current, next, n) => {
  // playNote(notes[sum % notes.length], (sum % 97) + 30, delay(sum % 8))
  // playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4))

  humanize4by4();

  playNote(
    notes[current % notes.length],
    (current % 97) + 30,
    delay(current % 8)
  );

  playNote(
    notes[(next + current) % notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 8))
  );

  if (n <= AirQualityData.airQualityIndex.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getAirQUalityAtN(n + 1), n + 1);
    }, barTime);
  } else if (play) {
    console.log("seriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getAirQUalityAtN(1), getAirQUalityAtN(2), 1);
    }, barTime);
  }
};

const getAirQUalityAtN = n => {
  return AirQualityData.airQualityIndex[n - 1];
};

export default withStyles(GridStyles)(AirQuality);
