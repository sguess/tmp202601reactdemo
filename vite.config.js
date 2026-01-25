// 导入 Vite 的配置函数
import { defineConfig } from 'vite'
// 导入 React 插件，提供 Fast Refresh 功能
import react from '@vitejs/plugin-react'

// Vite 配置文件
// Vite 是一个现代化的前端构建工具，提供更快的冷启动和热更新
// 更多配置信息：https://vitejs.dev/config/
export default defineConfig({
  // 插件配置：添加 React 支持
  plugins: [react()],
  // 开发服务器配置
  server: {
    // 指定开发服务器端口
    port: 3000,
    // 启动时自动在浏览器中打开应用
    open: true
  }
})
