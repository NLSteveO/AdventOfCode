const fs = require('fs');
const path = require('path');

const getNewFish = fishList => {
  const newFish = [];
  fishList.forEach(fish => {
    if (fish === 0) newFish.push(8);
  });
  return newFish;
}

const ageFish = fishList => {
  return fishList.map(fish => fish === 0 ? 6 : fish - 1);
}

const getAnswer = (data) => {
  let fish = data.split(',').map(Number);
  for (let i = 0; i < 80; i++) {
    const newFish = getNewFish(fish);
    fish = ageFish(fish).concat(newFish);
  }
  return fish.length;
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
