const fs = require('fs');
const path = require('path');

const a = array => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        if (i !== j || i !== k || j !== k) {
          const sum = array[i] + array[j] + array[k];
          if (sum === 2020) return array[i] * array[j] * array[k];
        }
      }
    }
  } 
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const answer = a(data.split('\n').map(Number));
      console.log(answer);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
