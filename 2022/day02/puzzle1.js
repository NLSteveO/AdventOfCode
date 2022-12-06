const fs = require('fs');
const path = require('path');

const moveIndex = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
};

const opponentEnums = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS'
};

const myEnums = {
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS'
};

const scores = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
};

const roundOutcomeScores = {
    LOSS: 0,
    DRAW: 3,
    WIN: 6
};

const whoWon = (opponentPlay, myPlay) => {
    const { LOSS, DRAW, WIN } = roundOutcomeScores;
    const matrix = [
        [DRAW, WIN, LOSS],
        [LOSS, DRAW, WIN],
        [WIN, LOSS, DRAW]
    ];
    return matrix[opponentPlay][myPlay];
};

const getRoundScore = round => {
    const roundPlays = round.split(' ');
    const opponentPlay = opponentEnums[roundPlays[0]];
    const myPlay = myEnums[roundPlays[1]];
    const outcomeScore = whoWon(moveIndex[opponentPlay], moveIndex[myPlay]);
    const myScore = scores[myPlay];
    return (outcomeScore + myScore);
};

const getAnswer = (data) => {
    let total = 0;
    data.forEach(round => {
        total = total + getRoundScore(round);
    });
    return total;
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
