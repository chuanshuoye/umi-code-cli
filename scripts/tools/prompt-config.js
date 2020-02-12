const util = require('./util');
const antdList = require('./antdList');

module.exports = {
    antdPromptConfig: {
        type: 'checkbox-plus',
        message: '请选择默认Page需要的Antd组件列表:',
        name: 'antdSelections',
        highlight: true,
        searchable: true,
        pageSize: 10,
        source: function (answersSoFar, input) {
            return util.searchKeys(antdList, input)
        }
    }
}