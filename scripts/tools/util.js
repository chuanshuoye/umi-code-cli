const path = require('path');
const fs = require('fs');
const glob = require("glob");

function assetDir(dir) {
    return path.resolve(process.cwd(), ...dir);
}

// 检查文件/文件夹是否存在
function CheckfileExsit(dir) {
    let isExist = false;
    return fs.existsSync(dir, function (exsit) {
        if (!exsit) {
            isExist = false;
        } else {
            isExist = exsit;
        }
        return isExist
    })
}

function findFilesByDir(dir) {
    const fileList = [];
    glob.sync(dir, {}).forEach(file => {
        fileList.push(file)
    })
    return fileList;
}

module.exports = {
    assetDir,
    CheckfileExsit,
    findFilesByDir
}
