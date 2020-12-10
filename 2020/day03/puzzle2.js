const fs = require('fs');
const path = require('path');

const slopes = [
  { r: 1, d: 1 },
  { r: 3, d: 1 },
  { r: 5, d: 1 },
  { r: 7, d: 1 },
  { r: 1, d: 2 },
]

const getNumberOfTrees = (forest, slope) => {
  let treeCount = 0;
  let pos = slope.r;
  for (let i = 0; i < forest.length-1; i+=slope.d) {
    const nextLine = forest[i + slope.d];
    const posInLine = pos % nextLine.length;

    const isTree = nextLine[posInLine] === '#';
    if (isTree) treeCount++;

    pos +=  slope.r;
  }
  return treeCount;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      let product = 1;
      slopes.forEach(slope => {
        const answer = getNumberOfTrees(data.split('\n'), slope);
        product *= answer;
      });
      console.log(product);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
