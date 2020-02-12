const path = require('path');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const blockList = require('./blockList');
const util = require('../util');

const BLOCK_REGEXP = `${util.assetDir(['src/pages/**/!(*.js|*.less|*.scss|*.css)'])}`;
const BLOCK_TEMPLATE_DIR = `${path.resolve(__dirname, '../../blocks/')}`;

// 生成的模板目标目录
let targetDir = '';


// 创建目录
function PromptTargetDir() {

    const blockDirs = util.findFilesByDir(BLOCK_REGEXP);
    const blockDirSelections = [];
    blockDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        // 忽略models，services【dva】组件目录
        if (/\/(models|services)$/.test(regexp)) return;
        blockDirSelections.push({
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'autocomplete',
        message: '请选择Block创建目录路径:',
        name: 'blockdir',
        source: function (answersSoFar, input) {
            return util.searchStates(blockDirSelections, input)
        }
    }, {
        type: 'input',
        message: '请输入Block名称:',
        name: 'blockName',
        default: 'Demo'
    }];

    inquirer.prompt(promptList).then(answers => {
        console.log(answers)
        targetDir = util.assetDir([answers.blockdir]);
        targetDir = path.join(targetDir, answers.blockName);
        if (util.CheckfileExsit(targetDir)) {
            console.error('该Block已经存在，请重新输入名称')
            PromptTargetDir();
            return;
        }
        console.log(targetDir)
        PromptBlock();
    });

}

// 勾选Block区块组件
function PromptBlock() {
    const promptList = [{
        type: 'list',
        message: '请选择默认需要的Block区块组件列表:',
        name: 'blockSelection',
        pageSize: 10,
        choices: blockList
    }];

    inquirer.prompt(promptList).then(answers => {
        const { blockSelection } = answers;
        shelljs.mkdir(targetDir);
        shelljs.cp('-R', path.resolve(BLOCK_TEMPLATE_DIR, blockSelection, '*'), targetDir);
    });
}

const BlockCreator = () => {
    PromptTargetDir()
}

module.exports = BlockCreator;
