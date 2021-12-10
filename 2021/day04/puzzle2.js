const { count } = require('console');
const fs = require('fs');
const path = require('path');

const getCallNumbers = (data) => {
  return data[0].split(',');
}

const getGameBoards = (data) => {
  data.shift();
  data.shift();
  const gameBoards = {};
  let count = 0;
  let board = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '') {
      gameBoards[count] = board;
      count++;
      board = [];
    } else {
      const splitLine = data[i].split(' ');
      const filteredSplitLine = splitLine.filter(num => num !== '');
      board.push(filteredSplitLine.map(Number));
    }
  }
  return gameBoards;
}

const updateBoard = (board, currentCall) => {
  return board.map(line => {
    const index = line.findIndex(element => {
      return element === Number(currentCall);
    });
    if (index >= 0) {
      line.splice(index, 1, '');
      return line;
    }
    return line;
  });
}

const checkForWin = (board) => {
  let win = false;
  board.forEach(line => {
    const emptyLine = line.every(cell => cell === '');
    if (emptyLine) win = true;
  });
  if (win) return win;
  let column = 0;
  for(let i = 0; i < board.length; i++) {
    if (board[i][column] !== '') {
      column++;
      if (column >= 5) i = board.length;
      else i = -1;
    } else if (i === 4) {
      win = true;
    }
  }
  return win;
}

const getScore = (board, number) => {
  let sum = 0;
  board.forEach(row => {
    row.forEach(cell => {
      if (cell !== '') sum += cell;
    })
  })
  return sum * number;
}

const getAnswer = (data) => {
  const callNumbers = getCallNumbers(data);
  const gameBoards = getGameBoards(data);
  let currentCall;
  let score = 0;
  callNumbers.forEach((number, dex) => {
      currentCall = number;
      Object.keys(gameBoards).forEach(key => {
        const board = gameBoards[key];
        const updatedBoard = updateBoard(board, currentCall);
        const isWinner = checkForWin(updatedBoard);
        if (isWinner) {
          console.log(currentCall, updatedBoard, Object.keys(gameBoards).length);
          score = getScore(updatedBoard, currentCall);
          delete gameBoards[key];
        } else {
          gameBoards[key] = updatedBoard;
        }
      });
  });
  return score;
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
