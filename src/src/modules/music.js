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
  let octave = startOctave ? startOctave : 2;
  // let tempNotes =
  for (octave; octave < startOctave + octaveStretch; octave++) {
    let selectedScaleArr = scale(selectedTone, selectedScale + octave);
    notes.push(...transformSharps(selectedScaleArr));
  }
  // for()
  console.log("Notes: ", notes, notes.length);
  return notes;
};
