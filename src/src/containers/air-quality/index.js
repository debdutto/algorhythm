import React from "react";
import MIDI from "midi.js";
import {
  prepareNotes,
  playNote,
  startMusic,
  stopMusic,
  humanize4by4,
  delay
} from "../../modules/music";
import PlayParams from "../../models/playParams";
import AirQualityData from "./air-quality-index-delhi.json";
import normalize from "../../modules/normalize";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class AirQuality extends React.Component {
  constructor() {
    super();
    this.headlineText = "Air Quality - Delhi";
    this.notes = prepareNotes("B", 2, "major", 4);
    AirQualityData.airQualityIndex = normalize(
      AirQualityData.airQualityIndex,
      0,
      100
    );
    this.play = false;
    this.playParams = new PlayParams(
      startMusic,
      this.play,
      this.notes,
      playMusic,
      getAirQUalityAtN,
      stopMusic
    );
  }

  render() {
    let { classes } = this.props;

    return ComplexPlayer(this.playParams, classes, this.headlineText);
  }

  componentDidMount() {
    console.log("MIDIObj", MIDI);
    MIDI.loadPlugin({
      soundfontUrl: process.env.PUBLIC_URL + "/soundfont/",
      instrument: "acoustic_grand_piano",
      onprogress: function(state, progress) {
        console.log(state, progress);
      }
    });
  }
}

const baseBarCount = AirQualityData.airQualityIndex.length;
let barCount = baseBarCount;

const playMusic = (current, next, n, playParams) => {
  // playNote(notes[sum % notes.length], (sum % 97) + 30, delay(sum % 8))
  // playNote(notes[(sum % 11) + 10], (sum % 97) + 30, delay(sum % 4))
  console.log("here1", current, next, n);
  humanize4by4(current, next, n, playParams);
  console.log("here2", playParams);
  playNote(
    playParams.notes[current % playParams.notes.length],
    (current % 97) + 30,
    delay(current % 8, playParams.barTime),
    playParams
  );
  console.log("here3");
  playNote(
    playParams.notes[(next + current) % playParams.notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 8), playParams.barTime),
    playParams
  );
  console.log("here4", playParams);
  if (
    n <= AirQualityData.airQualityIndex.length &&
    --barCount > 0 &&
    playParams.play
  ) {
    console.log("here5");
    setTimeout(() => {
      playMusic(next, getAirQUalityAtN(n + 1), n + 1, playParams);
    }, playParams.barTime);
  } else if (playParams.play) {
    console.log("here6");
    console.log("seriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getAirQUalityAtN(1), getAirQUalityAtN(2), 1, playParams);
    }, playParams.barTime);
  }
};

const getAirQUalityAtN = n => {
  return AirQualityData.airQualityIndex[n - 1];
};

export default withStyles(GridStyles)(AirQuality);
