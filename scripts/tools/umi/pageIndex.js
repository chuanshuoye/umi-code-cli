const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const antdList = require('../antdList');
const util = require('../util');

// 项目当前Page目录
const ROOT_PAGE_DIR = `${util.assetDir(['src/pages'])}`;
const UMI_PAGE_REGEXP = `${util.assetDir(['src/pages/**/pages/'])}`;

const UMI_TEMPLATE_DIR = `${path.resolve(__dirname, '../../tpls/umi')}`;
const UMI_ANTD_PAGE_FILE = 'pages/pageOne/index.js';

// 生成的模板目标目录
let targetDir = '';


// 创建目录
function PromptTargetDir() {

    const pageDirs = util.findFilesByDir(UMI_PAGE_REGEXP);
    const pageDirSelections = [];
    pageDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        pageDirSelections.push({
            key: regexp.split('/')[1][0],
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'confirm',
        message: '是否选择已有Page创建子目录名称:',
        name: 'isPageChild',
        default: false
    },{
        type: 'rawlist',
        message: '请选择Page创建子目录路径:',
        name: 'pagechilddir',
        choices: pageDirSelections,
        when: answers => answers.isPageChild
    },{
        type: 'input',
        message: '请输入Page创建目录名称:',
        name: 'pagedir',
        default: null
    }];

    inquirer.prompt(promptList).then(answers => {
        targetDir = util.assetDir([ROOT_PAGE_DIR, answers.pagedir]);
        if (answers.isPageChild) {
            targetDir = util.assetDir([answers.pagechilddir, answers.pagedir]);
        }
        console.log(targetDir)
        if (util.CheckfileExsit(targetDir)) {
            console.error('该Page已经存在，请重新输入名称')
            PromptTargetDir();
            return;
        }
        shelljs.cp('-R', UMI_TEMPLATE_DIR, targetDir);
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
        const antdPageFile = path.resolve(targetDir, UMI_ANTD_PAGE_FILE);
        shelljs.sed('-i', 'ANTD_COMPONENT_LIST', `${antdSelections}`, antdPageFile);
    });
}


const PageCreator = () => {
    console.log(ROOT_PAGE_DIR)
    PromptTargetDir();
}

module.exports = PageCreator;
