const fs = require('fs');
const path = require('path');

const OPENINGS = ['(', '[', '{', '<'];
const ENDINGS = [')', ']', '}', '>'];

const areMatching = (opening, ending) => {
  const endIndex = ENDINGS.indexOf(ending);
  return opening === OPENINGS[endIndex];
}

const completeTheChunk = listOfOpenings => listOfOpenings.map(opening => ENDINGS[OPENINGS.indexOf(opening)]);

const readChunk = chunk => {
  const readPieces = [];
  let lastOpening = null;
  let isCorrupted = false;
  for (let i = 0; i < chunk.length; i++) {
    const currentPiece = chunk.substring(i, i+1);
    if (!lastOpening) {
      readPieces.push(currentPiece);
      lastOpening = currentPiece;
    } else if (ENDINGS.includes(currentPiece)) {
      if (!areMatching(lastOpening, currentPiece)) {
        isCorrupted = true;
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
  if (isCorrupted) return [];
  return completeTheChunk(readPieces);
}

const getScore = list => {
  const scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  let sum = 0;
  list.reverse().forEach(item => {
    sum = sum * 5 + scores[item];
  });
  return sum;
}

const getMiddleScore = scores => {
  const newScores = [...scores];
  while (newScores.length > 1) {
    const maxIndex = newScores.indexOf(Math.max(...newScores));
    newScores.splice(maxIndex, 1);
    const minIndex = newScores.indexOf(Math.min(...newScores));
    newScores.splice(minIndex, 1);
  }
  return newScores[0];
}

const getAnswer = (data) => {
  const scores = [];
  data.forEach(line => {
    const result = readChunk(line);
    if (result.length > 0) scores.push(getScore(result));
  });
  return getMiddleScore(scores);
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
