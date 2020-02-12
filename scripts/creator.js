#!/usr/bin/env node

const inquirer = require('inquirer');

// 创建umi标准版page
const pageCreator = require('./tools/umi');
// 创建标准Component
const ComponentCreator = require('./tools/components');
// 创建dva模块
const DvaCreator = require('./tools/dva');
// 创建区块模块
const BlockCreator = require('./tools/block');

const promptList = [{
    type: 'list',
    message: '请选择需要创建的模板类型:',
    name: 'template',
    choices: [
        {
            name: "Umi（umi标准page模板）",
            value: "umi"
        },
        {
            name: "Dva（umi+dva标准模板）",
            value: "dva"
        },
        {
            name: "Component（antd标准组件模板）",
            value: "component"
        },
        {
            name: "Block（基于antd标准区块模板）",
            value: "block"
        }
    ],
}];

inquirer.prompt(promptList).then(answers => {
    // console.log(answers); // 返回的结果
    if(answers.template === 'umi') {
        pageCreator();
    }
    if(answers.template === 'dva') {
        DvaCreator();
    }
    if(answers.template === 'component') {
        ComponentCreator();
    }
    if(answers.template === 'block') {
       BlockCreator();
    }
});
