const fs = require('fs');
const path = require('path');

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

const getBranchBasedOnEndNode = (node, branches) => {
  let branchIWant;
  branches.forEach(branch => {
    if (branch.includes(node)) branchIWant = branch;
  });
  return branchIWant;
}

const getCommonNode = (branch1, branch2) => {
  for(let i = 0; i < branch1.length; i++) {
    if (branch1[i] !== branch2[i]) {
      return i;
    }
  }
}

const getOrbitalTransfers = (me, santa) => {
  const x = getCommonNode(me, santa);
  me.splice(0, x);
  santa.splice(0, x);
  return (me.length-1) + (santa.length-1);
}

const main = list => {
  const branches = getBranches(list);

  const me = getBranchBasedOnEndNode('YOU', branches);
  const santa = getBranchBasedOnEndNode('SAN', branches);

  const orbitalTransfers = getOrbitalTransfers(me, santa);
  console.log(orbitalTransfers);
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
