const inquirer = require('inquirer');

module.exports = [
    new inquirer.Separator('---表单---'), // 添加分隔符
    {
        name: 'searchForm【标准查询表单区块】',
        value: 'searchForm',
    }
];
