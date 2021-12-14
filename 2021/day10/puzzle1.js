const fs = require('fs');
const path = require('path');

const OPENINGS = ['(', '[', '{', '<'];
const ENDINGS = [')', ']', '}', '>'];

const areMatching = (opening, ending) => {
  const endIndex = ENDINGS.indexOf(ending);
  return opening === OPENINGS[endIndex];
}

const readChunk = chunk => {
  const readPieces = [];
  let lastOpening = null;
  let result = ''
  for (let i = 0; i < chunk.length; i++) {
    const currentPiece = chunk.substring(i, i+1);
    if (!lastOpening) {
      readPieces.push(currentPiece);
      lastOpening = currentPiece;
    } else if (ENDINGS.includes(currentPiece)) {
      if (!areMatching(lastOpening, currentPiece)) {
        result = currentPiece;
        i = chunk.length;
      } else {
        readPieces.pop();
        lastOpening = readPieces[readPieces.length-1];
      }
    } else {
      readPieces.push(currentPiece);
      lastOpening = currentPiece;
    }
  }
  return result;
}

const getScore = list => {
  const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  let sum = 0;
  list.forEach(item => sum += scores[item]);
  return sum;
}

const getAnswer = (data) => {
  const corrupted = [];
  data.forEach(line => {
    const result = readChunk(line);
    if (result !== '') corrupted.push(result);
  });
  return getScore(corrupted);
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n'));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
