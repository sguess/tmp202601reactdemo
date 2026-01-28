# 添加API数据发送示例功能

## 1. 安装依赖
- 安装 axios 库，用于发送 HTTP 请求

## 2. 添加菜单结构
- 在 `MenuBar.jsx` 中添加新的 "API 示例" 菜单
- 为该菜单添加子菜单：
  - GET 请求示例
  - POST 请求示例
  - PUT 请求示例
  - DELETE 请求示例

## 3. 创建示例页面
- 创建 `src/pages/api/` 目录
- 创建以下页面组件：
  - `GetExample.jsx` - 展示 GET 请求示例
  - `PostExample.jsx` - 展示 POST 请求示例（包含表单提交）
  - `PutExample.jsx` - 展示 PUT 请求示例
  - `DeleteExample.jsx` - 展示 DELETE 请求示例

## 4. 配置路由
- 在 `App.jsx` 中导入新创建的页面组件
- 添加相应的路由配置

## 5. 实现功能
- 在每个示例页面中实现完整的 API 调用功能
- 包含：
  - 表单输入（适用于 POST 和 PUT）
  - 数据展示
  - 加载状态
  - 错误处理
  - 成功反馈

## 6. 代码示例
- 提供清晰的代码注释
- 展示如何使用 axios 发送不同类型的请求
- 展示如何处理响应和错误