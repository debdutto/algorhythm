import transformSharps from "./transform-sharps";
import scale from "music-scale";

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

export const playNote = (note, velocity, delay) => {
  MIDI.noteOn(0, MIDI.keyToNote[note], velocity, delay / 1000);
  MIDI.noteOff(0, MIDI.keyToNote[note], barTime);
};

export const startMusic = (playFlag, playFunction) => {
  if (playFlag === true) {
    return;
  }
  playFlag = true;
  if (playFlag) {
    setTimeout(() => {
      playLeadIn(0, () => {
        playMusic(playFunction(1), playFunction(2), 1);
      });
    }, 500);
  }
  return playFlag;
};

export const stopMusic = () => {
  return false;
};
