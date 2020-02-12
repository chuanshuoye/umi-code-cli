import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import React, { Component } from 'react';
import { Row,Col } from 'antd';
import Demo from '../components/Demo';

@withRouter
@connect(state => {
    return {
        ...state.demoModel,
    };
})
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

    }

    async componentDidMount() {
        const { dispatch } = this.props;
        const result = await dispatch({
            type: 'demoModel/getSaveInfo',
            payload: {}
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Demo />
        )
    }

}

export default Index;
