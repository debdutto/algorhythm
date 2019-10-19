import React from "react";
import { Link } from "react-router-dom";
import MIDI from "midi.js";
import crimeData from "./crime-data.json";
import { prepareNotes, playNote } from "../../modules/music";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const cardStyles = {
  card: {
    maxWidth: 40
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  }
};

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
    margin: "5vh auto"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5vh auto",
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
          <Grid item lg={2} md={2} style={{ textAlign: "center" }}>
            <Card className={cardStyles.card}>
              <Link
                target="_blank"
                to="https://joyc.bandcamp.com/album/india-in-b-major"
                style={{ textDecorationLine: "none" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="India in B Major"
                    // className={cardStyles.media}
                    // height="100"
                    image="cover_sketch_small.jpg"
                    title="India in B Major"
                  />
                </CardActionArea>
              </Link>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Crimes Against Women
                </Typography>
              </CardContent>
            </Card>
          </Grid>
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
          <Grid
            item
            lg={12}
            md={2}
            style={{ textAlign: "center", color: "#FFF" }}
          >
            <label>If you wish to see the data or checkout the repo</label>
          </Grid>
          <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
            <Link
              target="_blank"
              to="https://github.com/debdutto/algorhythm"
              style={{ textDecorationLine: "none" }}
            >
              <StyledButton variant="contained" size="large" color="primary">
                Github
              </StyledButton>
            </Link>
          </Grid>
          <Grid item lg={1} md={2} style={{ textAlign: "center" }}>
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
    if (play === true) {
      return;
    }
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

let play = false;

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
