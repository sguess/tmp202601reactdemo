// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 安全设置页面组件 - 用于配置账户安全相关设置
function SecuritySettings() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>安全设置</h1>
      {/* 页面描述文本 */}
      <p>配置您的账户安全选项，如密码、双因素认证等</p>
    </div>
  )
}

// 导出 SecuritySettings 组件，使其可以在其他地方被导入使用
export default SecuritySettings