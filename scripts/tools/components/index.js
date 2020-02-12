const path = require('path');
const inquirer = require('inquirer');
const shelljs = require('shelljs');
const util = require('../util');
const promptConfigs = require('../prompt-config');


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
            name: regexp,
            value: i
        })
    })

    const promptList = [{
        type: 'autocomplete',
        message: '请选择Component创建目录路径:',
        name: 'componentdir',
        source: function (answersSoFar, input) {
            return util.searchStates(componentDirSelections, input)
        }
    }, {
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
        PromptAntd()
    });

}

// 勾选Antd组件
function PromptAntd() {
    const promptList = [promptConfigs.antdPromptConfig];

    inquirer.prompt(promptList).then(answers => {
        // console.log(answers); // 返回的结果
        const { antdSelections } = answers;
        shelljs.mkdir(targetDir);
        shelljs.cp('-R', COMPONENT_TEMPLATE_DIR, targetDir);
        const antdPageFile = path.resolve(targetDir, COMPONENT_ANTD_PAGE_FILE);
        shelljs.sed('-i', 'ANTD_COMPONENT_LIST', `${antdSelections}`, antdPageFile);
    });
}

const ComponentCreator = () => {
    PromptTargetDir()
}

module.exports = ComponentCreator;
