import transformSharps from "./transform-sharps";
import scale from "music-scale";
import MIDI from "midi.js";

export const prepareNotes = (
  selectedScale,
  startOctave,
  selectedTone,
  octaveStretch
) => {
  let notes = [];
  selectedScale = selectedScale ? selectedScale : "A";
  startOctave = startOctave ? startOctave : 2;
  selectedTone = selectedTone ? selectedTone : "major";
  octaveStretch = octaveStretch ? octaveStretch : 5;
  let octave = startOctave;
  // let tempNotes =
  for (octave; octave < startOctave + octaveStretch; octave++) {
    let selectedScaleArr = scale(selectedTone, selectedScale + octave);
    notes.push(...transformSharps(selectedScaleArr));
  }
  return notes;
};

export const playNote = (note, velocity, delay, playParams) => {
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000);
  MIDI.noteOff(0, MIDI.keyToNote[note], playParams.barTime);
};

const playLeadIn = (n, callback, playParams, leadInCount) => {
  playNote(playParams.notes[14], 120, 0, playParams);

  leadInCount = leadInCount ? leadInCount : 0;

  if (n++ < leadInCount) {
    setTimeout(() => {
      playLeadIn(n, callback);
    }, playParams.barTime);
  } else {
    callback();
  }
};

export const startMusic = playParams => {
  if (!playParams.play) {
    playParams.play = true;
    setTimeout(() => {
      playLeadIn(
        0,
        () => {
          playParams.playMusic(
            playParams.valueFunc(1),
            playParams.valueFunc(2),
            1,
            playParams
          );
        },
        playParams
      );
    }, 500);
  }
  return playParams.play;
};

export const stopMusic = playParams => {
  playParams.play = false;
};

export const delay = (n, barTime) => n * 0.25 * barTime;

export const humanize4by4 = (current, next, n, playParams) => {
  if (!playParams.notes) throw new Error("No notes defined");
  if (!n) throw new Error("n is not defined");
  // if (!playParams.playExtra) console.log("No Humanizing")

  if (!(n % 4)) {
    if (current > next) {
      playNote(
        playParams.notes[(current - next) % playParams.notes.length],
        ((current - next) % 37) + 90,
        0,
        playParams
      );
    } else {
      playNote(
        playParams.notes[(next - current) % playParams.notes.length],
        ((next - current) % 37) + 90,
        0,
        playParams
      );
    }
    if (playParams.playExtra)
      playNote(
        playParams.notes[(2 * current) % playParams.notes.length],
        ((2 * current) % 37) + 90,
        0,
        playParams
      );
  }
};
