const fs = require('fs');
const path = require('path');

const moveIndex = {
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
};

const outcomeIndex = {
    LOSS: 0,
    DRAW: 1,
    WIN: 2
};

const moveEnums = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS'
};

const outcomeEnums = {
    X: 'LOSS',
    Y: 'DRAW',
    Z: 'WIN'
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

const whatDoIPlay = (opponentPlay, outcome) => {
    const { A, B, C } = moveEnums;
    const matrix = [
        [C, A, B],
        [A, B, C],
        [B, C, A]
    ];
    return matrix[opponentPlay][outcome];
};

const getRoundScore = round => {
    const roundPlays = round.split(' ');
    const opponentPlay = moveEnums[roundPlays[0]];
    const outcome = outcomeEnums[roundPlays[1]];
    const outcomeScore = roundOutcomeScores[outcome];
    const myPlay = whatDoIPlay(moveIndex[opponentPlay], outcomeIndex[outcome]);
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
