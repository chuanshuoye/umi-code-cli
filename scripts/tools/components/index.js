const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const antdList = require('../antdList');
const util = require('../util');


const COMPONENT_REGEXP = `${util.assetDir(['src/pages/**/components/'])}`;

const COMPONENT_TEMPLATE_DIR = `${path.resolve(__dirname, '../../tpls/components/*')}`;
const COMPONENT_ANTD_PAGE_FILE = 'index.js';

// 生成的模板目标目录
let targetDir = '';


// 创建目录
function PromptTargetDir() {

    const componentDirs = util.findFilesByDir(COMPONENT_REGEXP);
    const componentDirSelections = [];
    componentDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        componentDirSelections.push({
            key: regexp.split('/')[1][0],
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'rawlist',
        message: '请选择Component创建目录路径:',
        name: 'componentdir',
        choices: componentDirSelections
    },{
        type: 'input',
        message: '请输入Component名称:',
        name: 'componentName',
        default: 'Demo'
    }];

    inquirer.prompt(promptList).then(answers => {
        targetDir = util.assetDir([answers.componentdir]);
        targetDir = path.join(targetDir, answers.componentName);
        if (util.CheckfileExsit(targetDir)) {
            console.error('该Component已经存在，请重新输入名称')
            PromptTargetDir();
            return;
        }
        console.log(targetDir)
        shelljs.mkdir(targetDir);
        shelljs.cp('-R', COMPONENT_TEMPLATE_DIR, targetDir);
        PromptAntd()
    });

}

// 勾选Antd组件
function PromptAntd() {
    const promptList = [{
        type: 'checkbox',
        message: '请选择默认Page需要的Antd组件列表:',
        name: 'antdSelections',
        choices: antdList
    }];

    inquirer.prompt(promptList).then(answers => {
        // console.log(answers); // 返回的结果
        const { antdSelections } = answers;
        const antdPageFile = path.resolve(targetDir, COMPONENT_ANTD_PAGE_FILE);
        shelljs.sed('-i', 'ANTD_COMPONENT_LIST', `${antdSelections}`, antdPageFile);
    });
}

const ComponentCreator = () => {
    PromptTargetDir()
}

module.exports = ComponentCreator;
