/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 13:57:40
 * @LastEditTime: 2019-10-23 19:38:57
 * @LastEditors: Please set LastEditors
 */
import React, { Component } from 'react';
import style from './index.less';
import { WrapAuth } from '@/components/WrapAuth/index';
import { Button } from 'antd';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contentA: {
        tmpl: '退回成功通知',
        begin: '这里是展示开始语的地方',
        name: '尊享E生',
        date: '2019-08-27',
        end: '这里是展示结束语的地方，可以多输入一点文字',
      },
      contentB: {
        title: '标题是例子',
        subTitle:
          '内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字',
      },
      contentC: {
        title: '标题是例子',
        subTitle:
          '内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字',
        image:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568878721&di=d931a08b2d4b032cf467c5dd11cdb0c3&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F470409aa25c3d941a96f339f5c85369e35e33e16.jpg',
      },
    };
  }

  render() {
    const Auth = WrapAuth(Button);
    var key = 'qq';
    return (
      <div className={style.demo}>
        {<Auth creator="1111">1111</Auth>}
        {
          <Auth
            creator="liuyan003"
            onClick={() => {
              console.log('tan', key);
            }}
          >
            hello
          </Auth>
        }

        {/* <div className={style.container}>
          <h3>组件PhoneWrap</h3>
          <PhoneWrap></PhoneWrap>
        </div>
        >
        <div className={style.container}>
          <h3>组件WechatPreviewTmpl</h3>
          <WechatPreviewTmpl content={this.state.contentA}></WechatPreviewTmpl>
        </div>
        <div className={style.container}>
          <h3>组件AppPreviewTmpl:卡片类 布局：normal</h3>
          <APPPreviewTmpl content={this.state.contentB} layout="normal"></APPPreviewTmpl>
        </div>
        <div className={style.container}>
          <h3>组件AppPreviewTmpl:卡片类 布局：左右</h3>
          <APPPreviewTmpl content={this.state.contentC} layout="left"></APPPreviewTmpl>
        </div>
        <div className={style.container}>
          <h3>组件AppPreviewTmpl:卡片类 布局：上下</h3>
          <APPPreviewTmpl content={this.state.contentC} layout="bottom"></APPPreviewTmpl>
        </div>
        <div className={style.container}>
          <h3>组件AppPreviewTmpl:弹框类 布局：normal</h3>
          <APPPreviewTmpl
            content={this.state.contentB}
            layout="normal"
            type="modal"
          ></APPPreviewTmpl>
        </div>
        <div className={style.container}>
          <h3>组件AppPreviewTmpl:弹框类 布局：左右</h3>
          <APPPreviewTmpl content={this.state.contentC} layout="left" type="modal"></APPPreviewTmpl>
        </div> */}
      </div>
    );
  }
}

export default Demo;
