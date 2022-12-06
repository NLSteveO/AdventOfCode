const fs = require('fs');
const path = require('path');

const itemTypePriority = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const getSum = (list) => {
    let sum = 0;
    list.forEach(item => {
        sum += (itemTypePriority.findIndex(itemType => itemType === item) + 1);
    });
    return sum;
};

const compareRucksacks = (rucksackOne, rucksackTwo, rucksackThree) => {
    const duplicates = [];
    rucksackOne.split('').forEach(itemType => {
        if (rucksackTwo.includes(itemType) && rucksackThree.includes(itemType) && !duplicates.includes(itemType)) {
            duplicates.push(itemType);
        }
    });
    return duplicates;
};

const getAnswer = (data) => {
    let list = [];
    for(let i = 0; i < data.length; i += 3) {
        const rucksackOne = data[i];
        const rucksackTwo = data[i+1];
        const rucksackThree = data[i+2];
        const badge = compareRucksacks(rucksackOne, rucksackTwo, rucksackThree);
        list = [...list, ...badge];
    };
    return getSum(list);
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
