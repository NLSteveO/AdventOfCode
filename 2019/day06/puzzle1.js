const fs = require('fs');
const path = require('path');

const countMasterOrbits = length => {
  let count = 0;
  for(let i = length; i >= 0; i--) {
    count += i;
  }
  return count;
}

const countBranches = branches => {
  let count = 0;
  branches.forEach((n) => {
    n.forEach((m, j) => {
      if (m !== 'XXX') count += j;
    });
  });
  return count;
} 

const getBranches = list => {
  const left = list.map(n => n.split(')')[0]);
  const right = list.map(n => n.split(')')[1]);
  const branches = [];
  right.forEach(node => {
    const sublist = [];
    if (!left.includes(node)) {
      sublist.push(node);
      let tmp = node;
      while(tmp !== 'COM') {
        sublist.push(left[right.indexOf(tmp)])
        tmp = left[right.indexOf(tmp)];
      }
    }
    if (sublist.length !== 0) branches.push(sublist.reverse());
  });
  return branches;
};

const getMasterBranch = branches => {
  let max = 0;
  branches.forEach(n => {
    if (n.length > max) max = n.length
  });
  return branches.find(n => n.length === max);
}

const removeAllCommon = (master, branches) => {
  branches.forEach((n, i) => {
    n.forEach((m, j) => {
      if (master.includes(m)) n[j] = 'XXX';
    });
  });

  branches.forEach((n, i) => {
    branches.forEach((m, j) => {
      if (i !== j) {
        m.forEach((l, k) => {
          if (n.includes(l)) m[k] = 'XXX'
        })
      }
    });
  });
}

const main = list => {
  const branches = getBranches(list);
  const master = getMasterBranch(branches);

  branches.splice(branches.indexOf(master), 1);
  removeAllCommon(master, branches);

  const total = countMasterOrbits(master.length-1) + countBranches(branches);
  
  console.log(total);
}

const getFile = fileName => {
  const filePath = path.join(__dirname, fileName);
   fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    if (!err) {
      data = data.split('\n');
      data.splice(-1, 2);
      main(data);
    } else {
      console.error(err);
    }
  });
}

getFile(process.argv[2]);
