const fs = require('fs');
const path = require('path');

const calculateFuel = mass => {
  if (mass < 0) return 0;
  return mass + calculateFuel(Math.floor(mass/3)-2);
}

const calculateTotalFuel = arrayOfMasses => {
  let totalFuel = 0;
  arrayOfMasses.forEach(mass => {
    if (mass !== '') totalFuel += (calculateFuel(Number(mass)) - Number(mass));
  });
  return totalFuel;
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      const totalFuel = calculateTotalFuel(data.split('\n'));
      console.log(totalFuel);
    } else {
      console.error(err);
      return;
    }
  });
}

getFile(process.argv[2]);
