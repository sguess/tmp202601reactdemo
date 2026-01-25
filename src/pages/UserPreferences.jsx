// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 偏好设置页面组件 - 用于配置用户偏好选项
function UserPreferences() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>偏好设置</h1>
      {/* 页面描述文本 */}
      <p>配置您的系统偏好选项，如主题、通知设置等</p>
    </div>
  )
}

// 导出 UserPreferences 组件，使其可以在其他地方被导入使用
export default UserPreferences