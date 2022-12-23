const fs = require('fs');
const path = require('path');

const FILESYSTEM_CAPACITY = 70000000;
const SPACE_NEEDED = 30000000;

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

const calculateSpaceNeeded = (usedSpace) => {
    const spaceAvailable = FILESYSTEM_CAPACITY - usedSpace;
    return SPACE_NEEDED - spaceAvailable;
}

const getOptimalDirectorySize = (directorySizes, spaceNeeded) => {
    const optimalDirectorySizes = Object.values(directorySizes).filter(size => size >= spaceNeeded);
    return Math.min(...optimalDirectorySizes);
}

const getAnswer = (data) => {
    const fileSystem = parseData(data);
    const directorySizes = searchFileSystem(fileSystem);
    const spaceNeeded = calculateSpaceNeeded(directorySizes['/']);
    return getOptimalDirectorySize(directorySizes, spaceNeeded);
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
