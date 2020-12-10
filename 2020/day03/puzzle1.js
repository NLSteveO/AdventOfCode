const fs = require('fs');
const path = require('path');

const getNumberOfTrees = forest => {
  let treeCount = 0;
  let pos = 3;
  for (let i = 0; i < forest.length-1; i++) {
    const nextLine = forest[i + 1];
    const posInLine = pos % nextLine.length;

    const isTree = nextLine[posInLine] === '#';
    if (isTree) treeCount++;

    pos += 3;
  }
  return treeCount;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getNumberOfTrees(data.split('\n'));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
