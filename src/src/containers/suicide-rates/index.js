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
import suicideData from "./suicide-data.json";
import normalize from "../../modules/normalize";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class SuicideRates extends React.Component {
  constructor() {
    super();
    this.headlineText = "Suicide Rates";

    this.notes = prepareNotes("B", 2, "major", 5);
    suicideData.suicides = normalize(suicideData.suicides, 0, 100);
    this.play = false;
    this.playParams = new PlayParams(
      startMusic,
      this.play,
      this.notes,
      playMusic,
      getSuicideRatesAtN,
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
      instrument: "acoustic_grand_piano"
    });
  }
}

const baseBarCount = suicideData.suicides.length;
let barCount = baseBarCount;

const playMusic = (current, next, n, playParams) => {
  humanize4by4(current, next, n, playParams);
  let notes = playParams.notes;
  let barTime = playParams.barTime;
  let play = playParams.play;
  playNote(
    notes[current % notes.length],
    current % 97,
    delay(current % 8, playParams.barTime),
    playParams
  );
  playNote(
    notes[(next * current) % notes.length],
    ((next * current) % 97) + 30,
    delay((next * current) % ((next * current) % 8), playParams.barTime),
    playParams
  );
  playNote(
    notes[(next + current) % notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 8), playParams.barTime),
    playParams
  );

  if (n <= suicideData.suicides.length && --barCount > 0 && play) {
    setTimeout(() => {
      playMusic(next, getSuicideRatesAtN(n + 1), n + 1, playParams);
    }, barTime);
  } else if (play) {
    console.log("SeriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getSuicideRatesAtN(1), getSuicideRatesAtN(2), 1, playParams);
    }, barTime);
  }
};

const getSuicideRatesAtN = n => {
  return suicideData.suicides[n - 1];
};

export default withStyles(GridStyles)(SuicideRates);
