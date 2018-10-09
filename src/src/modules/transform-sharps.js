export default scaleArr => {
  let noteRegex = /([A-G])(#)(\d{1,2})/;
  return scaleArr.map(el => {
    return el.replace(noteRegex, (_1, p1, _3, p3) => {
      return replaceWithFlat(p1, p3);
    });
  });
};

const replaceWithFlat = (note, octave) => {
  let nextNote = nextLetter(note.charAt(0));
  return nextNote + "b" + octave;
};

const nextLetter = s => {
  return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
    var c = a.charCodeAt(0);
    switch (c) {
      case 71:
        return "A"; // returning for "G"
      case 103:
        return "A"; // returning for "G"
      default:
        return String.fromCharCode(++c);
    }
  });
};
