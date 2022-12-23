const fs = require('fs');
const path = require('path');

const isCDCommand = (line) => line.startsWith('cd', 2);
const isLSCommand = (line) => line.startsWith('ls', 2);
const isDir = (line) => line.startsWith('dir');
const isFile = (line) => !line.startsWith('$') && !line.startsWith('dir');

const getCurrentDir = (fileSystem, currentDirectory) => {
    let position;
    currentDirectory.forEach(directory => {
        if (directory === '/') position = fileSystem;
        else position = position[directory];
    });
    return position;
}

const parseData = (data) => {
    const fileSystem = {};
    let currentDirectory = [];
    data.forEach(line => {
        if (isCDCommand(line)) {
            const [,, dir] = line.split(' ');
            if (dir === '..') currentDirectory.pop();
            else currentDirectory.push(dir);
        }
        if (isLSCommand(line)) {}
        if (isDir(line)) {
            const [,newDirectory] = line.split(' ');
            const openDirectory = getCurrentDir(fileSystem, currentDirectory);
            openDirectory[newDirectory] = {};
        }
        if (isFile(line)) {
            const [size, fileName] = line.split(' ');
            const openDirectory = getCurrentDir(fileSystem, currentDirectory);
            openDirectory[fileName] = Number(size);
        }
    });
    return fileSystem;
}

const getDirectorySize = (fileSystem, directorySizes, currentDirectory) => {
    let size = 0;
    const openDirectory = getCurrentDir(fileSystem, currentDirectory);
    Object.keys(openDirectory).forEach(item => {
        if (typeof openDirectory[item] === 'object') {
            const key = [...currentDirectory, item];
            const dirSize = getDirectorySize(fileSystem, directorySizes, key);
            directorySizes[key.toString()] = Number(dirSize);
            size += dirSize;
        } else {
            size += openDirectory[item];
        }
    });
    return size;
}

const searchFileSystem = (fileSystem) => {
    const directorySizes = {};
    const dirSize = getDirectorySize(fileSystem, directorySizes, ['/']);
    directorySizes['/'] = Number(dirSize);
    return directorySizes;
}

const getSum = (directorySizes) => {
    let sum = 0;
    Object.values(directorySizes).forEach(size => {
        if (size <= 100000) {
            sum += size;
        }
    });
    return sum;
}

const getAnswer = (data) => {
    const fileSystem = parseData(data);
    const directorySizes = searchFileSystem(fileSystem);
    return getSum(directorySizes);
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
