const path = require('path');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const util = require('../util');
const promptConfigs = require('../prompt-config');

// 项目当前Page根目录
const ROOT_PAGE_DIR = `${util.assetDir(['src/pages'])}`;
// 子Page目录
const UMI_PAGE_REGEXP = `${util.assetDir(['src/pages/**/pages/'])}`;

const UMI_TEMPLATE_DIR = `${path.resolve(__dirname, '../../tpls/umi')}`;
const UMI_ANTD_PAGE_FILE = 'pages/index.js';

// 生成的模板目标目录
let targetDir = '';


// 创建目录
function PromptTargetDir() {

    const pageDirs = util.findFilesByDir(UMI_PAGE_REGEXP);
    const pageDirSelections = [];
    pageDirs.forEach(i => {
        const regexp = i.replace(/.*\/src\/pages/, '');
        pageDirSelections.push({
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
        type: 'autocomplete',
        message: '请选择Block创建目录路径:',
        name: 'pagechilddir',
        source: function (answersSoFar, input) {
            return util.searchStates(pageDirSelections, input)
        },
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
        PromptAntd()
    });

}

// 勾选Antd组件
function PromptAntd() {
    const promptList = [promptConfigs.antdPromptConfig];

    inquirer.prompt(promptList).then(answers => {
        // console.log(answers); // 返回的结果
        const { antdSelections } = answers;
        shelljs.cp('-R', UMI_TEMPLATE_DIR, targetDir);
        const antdPageFile = path.resolve(targetDir, UMI_ANTD_PAGE_FILE);
        shelljs.sed('-i', 'ANTD_COMPONENT_LIST', `${antdSelections}`, antdPageFile);
    });
}


const PageCreator = () => {
    console.log(ROOT_PAGE_DIR)
    PromptTargetDir();
}

module.exports = PageCreator;
