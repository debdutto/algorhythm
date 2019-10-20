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
import literacyData from "./literacy-rate.json";
import normalize from "../../modules/normalize";
import { withStyles } from "@material-ui/core/styles";
import { GridStyles } from "../../styles";
import ComplexPlayer from "../../elements/complex-player";

class LiteracyRates extends React.Component {
  constructor() {
    super();
    this.headlineText = "Literacy Rates";

    this.notes = prepareNotes("B", 2, "major", 4);
    literacyData.literacy = normalize(literacyData.literacy, 0, 100);
    this.play = false;
    this.playParams = new PlayParams(
      startMusic,
      this.play,
      this.notes,
      playMusic,
      getLiteracyAtN,
      stopMusic
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

const baseBarCount = literacyData.literacy.length;
let barCount = baseBarCount;

const playMusic = (current, next, n, playParams) => {
  humanize4by4(current, next, n, playParams);
  playNote(
    playParams.notes[current % playParams.notes.length],
    current % 97,
    delay(current % 8, playParams.barTime),
    playParams
  );
  playNote(
    playParams.notes[(next + current) % playParams.notes.length],
    ((next + current) % 97) + 30,
    delay((next + current) % ((next + current) % 8), playParams.barTime),
    playParams
  );
  if (n <= literacyData.literacy.length && --barCount > 0 && playParams.play) {
    setTimeout(() => {
      playMusic(next, getLiteracyAtN(n + 1), n + 1, playParams);
    }, playParams.barTime);
    console.log("barCount: ", barCount);
  } else if (playParams.play) {
    console.log("SeriesReset", n);
    barCount = baseBarCount;
    setTimeout(() => {
      playMusic(getLiteracyAtN(1), getLiteracyAtN(2), 1, playParams);
    }, playParams.barTime);
  }
};

const getLiteracyAtN = n => {
  return literacyData.literacy[n - 1];
};

export default withStyles(GridStyles)(LiteracyRates);
