const fs = require('fs');
const path = require('path');

const getAnswer = (data) => {
    let count = 0;
    data.forEach(elfPairing => {
        const [elfOne, elfTwo] = elfPairing.split(',');
        const [elfOneStart, elfOneEnd] = elfOne.split('-').map(Number);
        const [elfTwoStart, elfTwoEnd] = elfTwo.split('-').map(Number);
        if ((elfTwoStart >= elfOneStart && elfTwoStart <= elfOneEnd) || (elfTwoEnd <= elfOneEnd && elfTwoEnd >= elfOneStart)) {
            count++;
        } else if ((elfOneStart >= elfTwoStart && elfOneStart <= elfTwoEnd) || (elfOneEnd <= elfTwoEnd && elfOneEnd >= elfTwoStart)) {
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
