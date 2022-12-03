const fs = require('fs');
const path = require('path');

const getAnswer = (data) => {
    const elfList = [];
    let elfIndex = 0;
    data.forEach(calories => {
        if (calories === '') elfIndex++;
        else {
            if (!elfList[elfIndex]) elfList[elfIndex] = 0;
            elfList[elfIndex] = elfList[elfIndex] + parseInt(calories);
        }
    });
    return Math.max(...elfList);
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
