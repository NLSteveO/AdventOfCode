const fs = require('fs');
const path = require('path');

const getFishList = (data) => {
  const fishList = Array(9).fill(0);
  data.forEach(element => {
    fishList[element]++;
  });
  return fishList;
}

const ageFish = (fishList, newFishCount) => {
  for (let i = 0; i < 9; i++) {
    if (i === 8) {
      fishList[i] = newFishCount;
      fishList[6] += newFishCount;
    } else {
      fishList[i] = fishList[i + 1];
    }
  }
}

const getFishCount = fishList => {
  let sum = 0;
  fishList.forEach(fishCount => sum += fishCount);
  return sum;
}

const getAnswer = (data) => {
  const fishList = getFishList(data.split(',').map(Number));
  for (let i = 0; i < 256; i++) {
    const newFishCount = fishList[0];
    ageFish(fishList, newFishCount);
  }
  return getFishCount(fishList);
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = getAnswer(data.split('\n')[0]);
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
