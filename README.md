## 项目概述
这是一个基于React的实时音视频通信应用，名为"veRTCRoom"，主要用于视频会议场景。项目使用TypeScript开发，采用Redux Toolkit进行状态管理，Ant Design作为UI组件库，以及React Router进行路由管理。

## 根目录结构
```
d:\workspace\Meeting\jusi_web_meeting
├── .env                    # 环境变量配置
├── .gitignore              # Git忽略文件配置
├── LICENSE                 # 许可证文件
├── build/                  # 构建输出目录
├── craco.config.js         # CRA配置扩展
├── node_modules/           # 项目依赖包
└── src/                    # 主要源代码目录
```

## src目录结构与文件作用

### 1. 核心入口文件
- **index.tsx**：React应用入口点，配置了Redux Provider
- **App.tsx**：应用主组件，定义了路由结构
- **index.less**：全局样式文件

### 2. 配置文件
- **config.ts**：应用配置文件，包含：
  - 视频分辨率、帧率等媒体配置
  - 环境判断（开发/生产）
  - API地址和基础路径
  - TOS（对象存储）配置
  - 应用ID和密钥等敏感信息（从环境变量读取）

### 3. 页面组件 (pages/)
- **Login/**：登录页面
- **Replay/**：会议回放页面
- **Scene/**：场景选择页面
  - **constants.ts**：场景列表配置

### 4. 核心功能模块 (core/)
- **rtc/**：实时音视频通信核心
  - **RtcClient.ts**：RTC客户端实现
- **board/**：白板功能核心
  - **BoardClient.ts**：白板客户端实现
- **hooks/**：核心功能相关的自定义Hook
  - **useJoinRoom.ts**：加入房间逻辑
  - **useLeaveRoom.ts**：离开房间逻辑
  - **useNetStatusChange.ts**：网络状态变化监听
- **rtcHooks/**：RTC相关自定义Hook
- **boardHooks/**：白板相关自定义Hook
- **tos/**：对象存储相关功能

### 5. 会议场景 (meeting/)
- **Room/**：会议房间主组件
  - **BottomMenu/**：底部菜单组件
  - **PlayerWrapper/**：视频播放器包装组件
  - **UserList/**：参会者列表组件
- **apis/**：会议相关API
- **hooks/**：会议相关自定义Hook
- **utils/**：会议相关工具函数

### 6. 通用组件 (components/)
包含多个可复用组件：
- **AudioAskModal/**：音频请求模态框
- **Auth/**：认证组件
- **DeviceButton/**：设备控制按钮
- **Header/**：头部组件
- **Loading/**：加载动画
- **SettingButton/**：设置按钮
- **Toast/**：提示组件
- **UserListButton/**：用户列表按钮
- **WhiteBoard/**：白板组件

### 7. 状态管理 (store/)
使用Redux Toolkit进行状态管理：
- **index.ts**：Store配置
- **slices/**：各个功能模块的状态切片
  - **user.ts**：用户信息
  - **rts.ts**：实时信令
  - **device.ts**：设备状态
  - **meetingRoom.ts**：会议室状态
  - **ui.ts**：UI状态
  - **setting.ts**：设置
  - **scene.ts**：场景
  - **symbols.ts**：符号定义
  - **board.ts**：白板状态

### 8. 资源文件 (assets/)
- **images/**：图片资源
- **mp4/**：视频资源

### 9. API接口 (apis/)
- **index.ts**：API入口
- **login.ts**：登录相关API

### 10. 类型定义 (types/)
- **rtsTypes.ts**：实时信令类型
- **state.ts**：状态类型

### 11. 工具函数 (utils/)
通用工具函数集合

### 12. 主题样式 (theme/)
- **color.less**：颜色变量
- **theme.less**：主题样式
- **dark.css**：深色主题
- **light.css**：浅色主题

## 路由结构

应用使用React Router配置了以下路由：
- `/login`：登录页面
- `/replay`：会议回放页面
- `/vc`：视频会议房间
- `/`：场景选择页面（默认）

## 技术栈

- **框架**：React 18 + TypeScript
- **状态管理**：Redux Toolkit
- **UI组件库**：Ant Design
- **路由**：React Router
- **构建工具**：Create React App + Craco
- **样式**：Less
- **实时通信**：WebRTC

## 核心功能流程

1. 用户登录/选择场景
2. 进入会议房间
3. 初始化RTC和白板客户端
4. 加入音视频通话
5. 进行会议交互（聊天、共享屏幕、使用白板等）
6. 离开会议房间

这个项目是一个完整的视频会议解决方案，具有音视频通信、白板协作、屏幕共享等核心功能，支持多用户实时交互。
