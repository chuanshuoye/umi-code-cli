const inquirer = require('inquirer');

module.exports = [
    new inquirer.Separator('---布局---'), // 添加分隔符
    'Row',
    'Col',
    new inquirer.Separator('---表单---'), // 添加分隔符
    'Form',
    'Input',
    'AutoComplete',
    'Cascader',
    'TimePicker',
    'Select',
    'Button',
    'Checkbox',
    'DatePicker',
    'Radio',
    'Switch',
    'Tabs',
    'Upload',
    new inquirer.Separator('---表格---'), // 添加分隔符
    'Table',
    'Pagination',
    new inquirer.Separator('---弹层---'), // 添加分隔符
    'Popover',
    'Tooltip',
    'Popconfirm',
    'Modal',
    'Drawer'
]