# umi-code-cli

基于umi+dva+antd开发用code-cli

# 安装

- 全局安装

```bash
  npm install umi-code-cli -g
```

# CLI 指令

- `zumi`：默认指令，根据提示进行初始化项目模块，备注：请使用者统一默认在项目根目录路径下进行指令操作，**所有文件，文件夹创建的路径统一挂载`src/pages`起始目录下**

```bash
e:\WORK\demo>zumi
? 请选择需要创建的模板类型: (Use arrow keys)
> Umi（umi标准page模板）
  Dva（umi+dva标准模板）
  Component（antd标准组件模板）
  Block（antd标准区块模板）


? 请选择需要创建的模板类型: Umi（umi标准page模板）
e:\WORK\demo\src\pages
? 是否选择已有Page创建子目录名称: Yes
? 请选择Page创建子目录路径:
  1) /activityBox/pages
  Answer:
e:\WORK\demo>zumi
? 请选择需要创建的模板类型: Dva（umi+dva标准模板）
? 请选择Dva创建目录路径:
  1) /activityBox/pages/baseInfo
  2) /activityBox/pages/detail
  3) /activityBox/pages/Index
  4) /activityBox/pages/lottery
  5) /activityBox/pages/prizeLibrary
  6) /activityBox/pages/prizeRecord
(Move up and down to reveal more choices)
  Answer: 4
``` 