import transformSharps from "./transform-sharps";
import scale from "music-scale";

export const prepareNotes = (selectedScale, startOctave, selectedTone) => {
  let notes = [];
  selectedScale = selectedScale ? selectedScale : "A";
  startOctave = startOctave ? startOctave : 2;
  selectedTone = selectedTone ? selectedTone : "major";
  let octave = startOctave ? startOctave : 2;
  // let tempNotes =
  for (octave; octave < startOctave + 5; octave++) {
    let selectedScaleArr = scale(selectedTone, selectedScale + octave);
    notes.push(...transformSharps(selectedScaleArr));
  }
  // for()
  console.log("Notes: ", notes, notes.length);
  return notes;
};
