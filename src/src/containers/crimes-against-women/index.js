import React from "react";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MIDI from "midi.js";
import crimeData from "./crime-data.json";
import normalize from "../../modules/normalize";
import { prepareNotes } from "../../modules/music";
import AudioPlayer from "../../elements/AudioPlayer";
import { SongList } from "../../modules/songs";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../modules/counter";

const StyledButton = withStyles({
  root: {
    margin: "10px auto",
    textAlign: "center"
  },
  label: {
    textTransform: "none"
  }
})(Button);

const gridStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20vh auto"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10vh auto",
    textAlign: "center"
  }
};

class CrimesAgainstWomen extends React.Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid
        container
        spacing={16}
        justify="center"
        alignItems="center"
        classes={classes}
      >
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
            <StyledButton
              onClick={this.startMusic}
              variant="contained"
              size="large"
            >
              Start
            </StyledButton>
          </Grid>
          <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
            <StyledButton
              onClick={this.stopMusic}
              variant="contained"
              size="large"
            >
              Stop
            </StyledButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={8}
          justify="center"
          alignItems="center"
          classes={classes}
        >
          <Grid item lg={12} md={2} style={{ textAlign: "center" }}>
            <label>If you wish to see the data</label>
          </Grid>
          <Grid item lg={12} md={2} style={{ textAlign: "center" }}>
            <Link
              target="_blank"
              to="https://github.com/Debdutto/algorhythm"
              style={{ textDecorationLine: "none" }}
            >
              <StyledButton variant="contained" size="large" color="primary">
                Github
              </StyledButton>
            </Link>
          </Grid>
          <Grid item lg={12} md={2} style={{ textAlign: "center" }}>
            <label>OR</label>
          </Grid>
          <Grid item lg={12} md={2} style={{ textAlign: "center" }}>
            <Link
              target="_blank"
              to="mailto:debduttoc@gmail.com"
              style={{ textDecorationLine: "none" }}
            >
              <StyledButton variant="contained" size="large" color="primary">
                Email
              </StyledButton>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  /* <button onClick={this.startMusic}>Start</button>

          <button onClick={this.stopMusic}>Stop</button> */

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

  startMusic() {
    play = true;
    if (play) {
      setTimeout(() => {
        playLeadIn(0, () => {
          playMusic(getCrimesAtN(1), getCrimesAtN(2), 1);
        });
      }, 500);
    }
  }

  stopMusic() {
    play = false;
  }
}

const baseBarCount = crimeData.crimes.length;
const leadInCount = 0;
let barCount = baseBarCount;

const BPM = 80;
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
  console.log(current);
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
    playNote(notes[(2 * current) % notes.length], ((2 * current) % 37) + 90, 0);
  }

  // playNote(notes[current % notes.length], (current % 97) + 30, 0)
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

export default withStyles(gridStyles)(CrimesAgainstWomen);
