const path = require('path');
const fs = require('fs');
const glob = require("glob");
const fuzzy = require('fuzzy');

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



function searchStates(states, input) {
    input = input || '';

    const options = {
        extract: function (el) { return el.value; }
    };

    return new Promise(function (resolve) {
        const fuzzyResult = fuzzy.filter(input, states, options);
        const matches = fuzzyResult.map(function (el) {
            return el.original;
        });
        resolve(matches);
    });
}

function searchKeys(states, input) {
    input = input || '';

    return new Promise(function (resolve) {
        const fuzzyResult = fuzzy.filter(input, states);
        const matches = fuzzyResult.map(function (el) {
            return el.original;
        });
        resolve(matches);
    });
}


module.exports = {
    assetDir,
    CheckfileExsit,
    findFilesByDir,
    searchStates,
    searchKeys
}
