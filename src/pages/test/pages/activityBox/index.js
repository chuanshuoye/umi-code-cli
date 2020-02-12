import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleSearch = e => {
        e.preventDefault();
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        return (
            <Form labelAlign="left" onSubmit={this.handleSearch}>
                <Form.Item label="Filed1">
                    {getFieldDecorator('Filed1', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入Filed1" autoComplete="off" required={false} />,
                    )}
                </Form.Item>
                <Form.Item label="Filed2">
                    {getFieldDecorator('Filed2', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入Filed2" autoComplete="off" required={false} />,
                    )}
                </Form.Item>
                <Button type="primary" onClick={this.searchSubmit}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
            </Form>
            // TODO SearchResult SomeThings...
        );
    }

}

export default Form.create({})(Index);
