import React from 'react';
import style from './index.less'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render () {
    return (
      <div className={style.header}>
      </div>
    )
  }
}

export default Demo;