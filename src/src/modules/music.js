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
  // for()
  console.log("Notes: ", notes, notes.length);
  return notes;
};

export const playNote = (note, velocity, delay, BPM) => {
  const barTime = 60000 / BPM;
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000);
  MIDI.noteOff(0, MIDI.keyToNote[note], barTime);
};

const playLeadIn = (n, notes, callback, BPM, leadInCount) => {
  const barTime = 60000 / BPM;

  playNote(notes[14], 120, 0);

  leadInCount = leadInCount ? leadInCount : 0;

  if (n++ < leadInCount) {
    setTimeout(() => {
      playLeadIn(n, callback);
    }, barTime);
  } else {
    callback();
  }
};

export const startMusic = (playFlag, playFunc, valueFunc) => {
  if (!playFlag) {
    playFlag = true;
    setTimeout(() => {
      playLeadIn(0, () => {
        playFunc(valueFunc(1), valueFunc(2), 1);
      });
    }, 500);
  }
  return playFlag;
};

export const stopMusic = () => {
  return false;
};

export const humanize4by4 = (current, next, n, notes, playExtra) => {
  if (!notes) throw new Error("No notes defined");
  if (!n) throw new Error("n is not defined");
  if (!playExtra) playExtra = false;

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
    if (playExtra)
      playNote(
        notes[(2 * current) % notes.length],
        ((2 * current) % 37) + 90,
        0
      );
  }
};
