// 导入 React 核心库，提供创建组件所需的基本功能
import React from 'react'
// 导入 React DOM 客户端库，用于将 React 组件渲染到 DOM
import ReactDOM from 'react-dom/client'
// 导入 React Router 的浏览器路由器组件，用于处理前端路由
import { BrowserRouter } from 'react-router-dom'
// 导入应用主组件
import App from './App'
// 导入全局样式
import './index.css'

// 获取页面中的根 DOM 元素（id 为 'root'）并创建 React 根实例
// React.StrictMode 是一个辅助组件，帮助识别潜在问题
// 在严格模式下，React 会额外执行一些检查和警告
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 使用 BrowserRouter 包装应用，启用客户端路由功能 */}
    <BrowserRouter>
      {/* 渲染主应用组件 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
