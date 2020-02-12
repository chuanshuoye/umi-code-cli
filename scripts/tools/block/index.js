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

    const componentDirs = util.findFilesByDir(BLOCK_REGEXP);
    const componentDirSelections = [];
    componentDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        // 忽略models，services【dva】组件目录
        if (/\/(models|services)$/.test(regexp)) return;
        componentDirSelections.push({
            key: regexp.split('/')[1][0],
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'rawlist',
        message: '请选择Block创建目录路径:',
        name: 'componentdir',
        pageSize: 10,
        choices: componentDirSelections
    }, {
        type: 'input',
        message: '请输入Block名称:',
        name: 'componentName',
        default: 'Demo'
    }];

    inquirer.prompt(promptList).then(answers => {
        targetDir = util.assetDir([answers.componentdir]);
        targetDir = path.join(targetDir, answers.componentName);
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
