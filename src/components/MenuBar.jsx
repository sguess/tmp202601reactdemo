// 从 React Router DOM 导入 NavLink 组件
// NavLink 是一个特殊的 Link 组件，当其对应的路由处于活动状态时，会自动添加特定的 CSS 类
import { NavLink } from 'react-router-dom'
// 导入 useState 和 useEffect Hook，用于管理组件状态
import { useState } from 'react'
// 导入侧边栏菜单的样式文件
import './MenuBar.css'

// 侧边栏菜单组件
// 接收两个属性：
// isCollapsed: 布尔值，表示菜单是否处于折叠状态
// onToggle: 函数，用于切换菜单的折叠状态
function MenuBar({ isCollapsed, onToggle }) {
  // 使用状态管理展开的菜单项
  const [expandedMenus, setExpandedMenus] = useState([])

  // 定义菜单项数组，支持嵌套子菜单
  const menuItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/dashboard', label: '仪表盘', icon: '📊' },
    // 设置菜单包含子菜单
    { 
      label: '设置', 
      icon: '⚙️',
      children: [
        { path: '/settings', label: '常规设置', icon: '🔧' },
        { path: '/settings/security', label: '安全设置', icon: '🔒' },
        { path: '/settings/account', label: '账户设置', icon: '👤' },
      ]
    },
    // 用户菜单包含子菜单
    { 
      label: '个人资料', 
      icon: '👤',
      children: [
        { path: '/profile', label: '个人信息', icon: '📋' },
        { path: '/profile/edit', label: '编辑资料', icon: '✏️' },
        { path: '/profile/preferences', label: '偏好设置', icon: '⚙️' },
      ]
    },
    // API示例菜单包含子菜单
    {
      label: 'API示例',
      icon: '🔌',
      children: [
        { path: '/api/get', label: 'GET请求示例', icon: '📥' },
        { path: '/api/post', label: 'POST请求示例', icon: '📤' },
        { path: '/api/put', label: 'PUT请求示例', icon: '🔄' },
        { path: '/api/delete', label: 'DELETE请求示例', icon: '🗑️' },
      ]
    },
    // 表格示例菜单项
    { path: '/table', label: '表格示例', icon: '📋' },
    // 高级表格示例菜单项
    { path: '/advanced-table', label: '高级表格示例', icon: '📊' },
  ]

  // 切换菜单展开状态的函数
  const toggleMenu = (menuLabel) => {
    setExpandedMenus(prev =>
      prev.includes(menuLabel)
        ? prev.filter(item => item !== menuLabel)
        : [...prev, menuLabel]
    )
  }

  // 渲染菜单项的函数，支持递归渲染子菜单
  const renderMenuItem = (item, depth = 0) => {
    // 如果菜单项有子项，则渲染为父菜单
    if (item.children) {
      const isExpanded = expandedMenus.includes(item.label)
      
      return (
        <li key={item.label} className="menu-parent-item">
          <div 
            className={`menu-item ${isExpanded ? 'expanded' : ''}`}
            onClick={() => toggleMenu(item.label)}
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="menu-label">{item.label}</span>}
            {!isCollapsed && (
              <span className="menu-arrow">
                {isExpanded ? '▲' : '▼'}
              </span>
            )}
          </div>
          
          {/* 渲染子菜单项 */}
          {!isCollapsed && isExpanded && (
            <ul className="submenu-list">
              {item.children.map(child => (
                <li key={child.path} className="submenu-item">
                  <NavLink
                    to={child.path}
                    className={({ isActive }) =>
                      `menu-item ${isActive ? 'active' : ''}`
                    }
                    title={child.label}
                  >
                    <span className="menu-icon">{child.icon}</span>
                    <span className="menu-label">{child.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      )
    } else {
      // 如果是叶子节点，则渲染为普通菜单项
      return (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${depth > 0 ? 'submenu-item' : ''} ${isActive ? 'active' : ''}`
            }
            title={isCollapsed ? item.label : ''}
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="menu-label">{item.label}</span>}
          </NavLink>
        </li>
      )
    }
  }

  return (
    // aside 元素表示页面的侧边栏导航区域
    <aside className={`menu-bar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* 菜单头部，包含标题和折叠按钮 */}
      <div className="menu-header">
        {/* 只有在未折叠状态下才显示菜单标题 */}
        {!isCollapsed && <h2 className="menu-title">系统菜单</h2>}
        {/* 切换菜单折叠状态的按钮 */}
        <button className="menu-toggle" onClick={onToggle}>
          {/* 根据折叠状态显示不同的图标 */}
          {isCollapsed ? '☰' : '✕'}
        </button>
      </div>
      {/* 导航区域 */}
      <nav className="menu-nav">
        {/* 菜单列表 */}
        <ul className="menu-list">
          {/* 使用 map 方法遍历菜单项数组，为每个菜单项创建列表项 */}
          {menuItems.map(item => renderMenuItem(item))}
        </ul>
      </nav>
    </aside>
  )
}

// 导出 MenuBar 组件，使其可以在其他地方被导入使用
export default MenuBar
