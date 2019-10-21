import React from "react";
import MIDI from "midi.js";
import crimeData from "./crime-data.json";
import {
  prepareNotes,
  playNote,
  startMusic,
  stopMusic,
  humanize4by4,
  delay
} from "../../modules/music";
import PlayParams from "../../models/playParams";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class CrimesAgainstWomen extends React.Component {
  constructor() {
    super();
    this.headlineText = "Crimes Against Women";

    this.notes = prepareNotes("B", 2, "major", 3);
    this.play = false;
    this.playParams = new PlayParams(
      startMusic,
      this.play,
      this.notes,
      playMusic,
      getCrimesAtN,
      stopMusic,
      80,
      true
    );
  }

  render() {
    let { classes } = this.props;

    return ComplexPlayer(this.playParams, classes, this.headlineText);
  }

  componentDidMount() {
    MIDI.loadPlugin({
      soundfontUrl: process.env.PUBLIC_URL + "/soundfont/",
      instrument: "acoustic_grand_piano"
    });
  }
}

const baseBarCount = crimeData.crimes.length;
let barCount = baseBarCount;

const playMusic = (current, next, n, playParams) => {
  humanize4by4(current, next, n, playParams);

  playNote(
    playParams.notes[current % playParams.notes.length],
    current % 97,
    delay(current % (current % 16), playParams.barTime),
    playParams
  );
  playNote(
    playParams.notes[(next * current) % playParams.notes.length],
    ((next * current) % 97) + 30,
    delay((next * current) % ((next * current) % 16), playParams.barTime),
    playParams
  );
  playNote(
    playParams.notes[(next + current) % playParams.notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 16), playParams.barTime),
    playParams
  );

  if (n <= crimeData.crimes.length && --barCount > 0 && playParams.play) {
    setTimeout(() => {
      playMusic(next, getCrimesAtN(n + 1), n + 1, playParams);
    }, playParams.barTime);
    console.log("barCount: ", barCount);
  } else if (playParams.play) {
    console.log("SeriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getCrimesAtN(1), getCrimesAtN(2), 1, playParams);
    }, playParams.barTime);
  }
};

const getCrimesAtN = n => {
  return crimeData.crimes[n - 1];
};

export default withStyles(GridStyles)(CrimesAgainstWomen);
