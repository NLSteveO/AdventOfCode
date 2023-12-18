const fs = require('fs');
const path = require('path');

const MAX_VALUES = { red: 12, green: 13, blue: 14 };

const parseRound = (round) => {
  const colors = {
    red: 0,
    green: 0,
    blue: 0
  };
  round.split(',').forEach(value => {
    const [count, color] = value.trim().split(' ');
    colors[color] = Number(count);
  });
  return colors;
}

const parseRounds = (rounds) => {
  return rounds.split(';').reduce((colors, round) => {
    const { red, green, blue } = parseRound(round);
    colors.redCounts.push(red);
    colors.greenCounts.push(green);
    colors.blueCounts.push(blue);
    return colors;
  }, { redCounts: [], greenCounts: [], blueCounts: [] });
}

const getGamesPower = (game) => {
  const [gameId, rounds] = game.split(':');
  const { redCounts, greenCounts, blueCounts } = parseRounds(rounds);
  const redMax = Math.max(...redCounts);
  const greenMax = Math.max(...greenCounts);
  const blueMax = Math.max(...blueCounts);
  return redMax * greenMax * blueMax;
}

const getAnswer = (listOfGames) => {
  return listOfGames.reduce((accumulator, game) => {
    if (game === '') {
      return accumulator;
    }
    const calibrationValue = getGamesPower(game);
    return accumulator + Number(calibrationValue);
  }, 0);
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
