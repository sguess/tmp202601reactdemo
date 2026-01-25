// 从 React 导入 useState Hook，用于管理组件状态
import { useState } from 'react'
// 导入侧边栏菜单组件
import MenuBar from './MenuBar'
// 导入布局组件的样式文件
import './Layout.css'

// 布局组件 - 定义应用的整体结构
// 接收 children 属性，用于渲染子组件内容
function Layout({ children }) {
  // 使用 useState Hook 管理菜单折叠状态
  // isMenuCollapsed: 当前菜单是否折叠的状态变量
  // setIsMenuCollapsed: 更新菜单折叠状态的函数
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)

  return (
    // 主容器 div，使用 layout 类名应用样式
    <div className="layout">
      {/* 侧边栏菜单组件，传递当前折叠状态和切换状态的回调函数 */}
      <MenuBar 
        isCollapsed={isMenuCollapsed} 
        onToggle={() => setIsMenuCollapsed(!isMenuCollapsed)} 
      />
      {/* 主内容区域，根据菜单折叠状态应用不同的 CSS 类 */}
      <main className={`main-content ${isMenuCollapsed ? 'collapsed' : ''}`}>
        {/* 渲染传入的子组件内容 */}
        {children}
      </main>
    </div>
  )
}

// 导出 Layout 组件，使其可以在其他地方被导入使用
export default Layout
