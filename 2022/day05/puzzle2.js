const fs = require('fs');
const path = require('path');

const parseRow = (row) => {
    let emptyCounts = 0;
    const list = [];
    for (let i = 0; i < row.length; i++) {
        const element = row[i];
        if (element === '') {
            emptyCounts++
            if (emptyCounts > 3) {
                emptyCounts = 0;
                list.push('-');
            }
            continue;
        }
        list.push(element.substring(1, 2));
        emptyCounts = 0;
    }
    return list;
}

const setup = (startingStacks) => {
    const stacks = [];
    startingStacks.forEach((row, index) => {
        const rowParsed = parseRow(row.split(' '));
        rowParsed.forEach((crate, crateIndex) => {
            if (index === 0) {
                stacks[crateIndex] = [];
            }
            if (crate !== '-') {
                stacks[crateIndex].unshift(crate);
            }
        });
    });
    return stacks;
}

const makeMove = (startStack, endStack, qty) => {
    const crateBeingMoved = startStack.splice(-qty, qty);
    if (crateBeingMoved) {
        endStack.push(...crateBeingMoved);
    }
    return [startStack, endStack];
}

const processRearrangement = (stacks, moves) => {
    moves.forEach(move => {
        const [, qty, , start, , end] = move.split(' ');
        const [startStack, endStack] = makeMove(stacks[start - 1], stacks[end - 1], qty);
        stacks.splice(start - 1, 1, startStack);
        stacks.splice(end - 1, 1, endStack);
    });
}

const getTops = (stacks) => {
    return stacks.map(stack => stack.pop()).toString().replaceAll(',', '');
}

const getAnswer = (data) => {
    const separatorIndex = data.findIndex(item => item === '');
    const startingStacks = setup(data.slice(0, separatorIndex - 1));
    const movesToMake = data.slice(separatorIndex + 1);
    processRearrangement(startingStacks, movesToMake);

    return getTops(startingStacks);
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
