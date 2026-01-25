# package.json 文件详解

## 文件概述
`package.json` 是 Node.js 项目的配置文件，定义了项目的基本信息、依赖关系和脚本命令。

## 字段解释

### 基本信息字段
- `name`: 项目名称，这里是 "react-system-frontend"
- `private`: 设为 true，表示这是一个私有项目，不会发布到 npm
- `version`: 项目版本号，当前为 1.0.0
- `type`: 设为 "module"，表示项目使用 ES 模块语法

### 脚本命令（scripts）
- `"dev"`: 开发环境启动命令，运行 `vite` 命令启动开发服务器
- `"build"`: 构建生产版本命令，运行 `vite build` 生成部署文件
- `"preview"`: 预览生产构建命令，运行 `vite preview` 在本地预览构建结果

### 依赖项（dependencies）
- `react`: React 核心库，用于构建用户界面的 JavaScript 库
- `react-dom`: React DOM 绑定，提供与 DOM 交互的接口
- `react-router-dom`: React 路由库，处理前端路由

### 开发依赖项（devDependencies）
- `@types/react`: React 类型定义，为 TypeScript 提供类型支持
- `@types/react-dom`: React DOM 类型定义
- `@vitejs/plugin-react`: Vite React 插件，集成 React 的 Fast Refresh 功能
- `vite`: 现代前端构建工具，提供快速的热更新

## 依赖版本说明
- 使用 `^` 符号表示兼容版本，例如 `^18.2.0` 表示安装 18.x.x 的最新版本但不低于 18.2.0
- 这种方式允许安全的向后兼容更新