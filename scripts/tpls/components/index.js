import React, { Component } from 'react';
import { ANTD_COMPONENT_LIST } from 'antd';
import style from './index.less'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={style.header}>
      </div>
    )
  }
}

export default Demo;
