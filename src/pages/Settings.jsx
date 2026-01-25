// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 设置页面组件 - 用于系统配置和选项
function Settings() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>设置</h1>
      {/* 页面描述文本 */}
      <p>系统设置页面</p>
    </div>
  )
}

// 导出 Settings 组件，使其可以在其他地方被导入使用
export default Settings
