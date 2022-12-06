const fs = require('fs');
const path = require('path');

const getAnswer = (data) => {
    let count = 0;
    data.forEach(elfPairing => {
        const [elfOne, elfTwo] = elfPairing.split(',');
        const [elfOneStart, elfOneEnd] = elfOne.split('-').map(Number);
        const [elfTwoStart, elfTwoEnd] = elfTwo.split('-').map(Number);
        if (elfTwoStart >= elfOneStart && elfTwoEnd <= elfOneEnd) {
            count++;
        } else if (elfOneStart >= elfTwoStart && elfOneEnd <= elfTwoEnd) {
            count++;
        }
    });
    return count;
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
