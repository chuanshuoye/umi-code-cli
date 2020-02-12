const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const util = require('../util');


const DVA_REGEXP = `${util.assetDir(['src/pages/**/pages/*'])}`;

const DVA_TEMPLATE_DIR = `${path.resolve(__dirname, '../../tpls/dva/*')}`;
const DVA_MODEL_DIR = 'models';
const DVA_MODEL_FILE = 'models/demoModel.js';

// 生成的模板目标目录
let targetDir = '';


// 创建目录
function PromptTargetDir() {

    const dvaDirs = util.findFilesByDir(DVA_REGEXP);
    const dvaDirSelections = [];
    dvaDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        dvaDirSelections.push({
            key: regexp.split('/')[1][0],
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'rawlist',
        message: '请选择Dva创建目录路径:',
        name: 'dvadir',
        pageSize: 10,
        choices: dvaDirSelections
    },{
        type: 'input',
        message: '请输入Dva Model名称:',
        name: 'modelName',
        default: 'demoModel'
    }];

    inquirer.prompt(promptList).then(answers => {
        targetDir = util.assetDir([answers.dvadir]);
        const dvaModelDir = path.join(targetDir, DVA_MODEL_DIR);
        if (util.CheckfileExsit(dvaModelDir)) {
            console.error('该Page的Dva配置已经存在，请重新输入名称')
            PromptTargetDir();
            return;
        }
        console.log(targetDir)
        shelljs.cp('-R', DVA_TEMPLATE_DIR, targetDir);
        const modelFile = path.resolve(targetDir, DVA_MODEL_FILE);
        shelljs.sed('-i', 'DVA_NAMESPACE', answers.modelName, modelFile);
        const customModelFile = path.resolve(targetDir, DVA_MODEL_DIR, answers.modelName + '.js');
        fs.renameSync(modelFile, customModelFile)
    });

}


const DvaCreator = () => {
    PromptTargetDir()
}

module.exports = DvaCreator;
