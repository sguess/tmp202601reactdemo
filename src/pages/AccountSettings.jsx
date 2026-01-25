// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 账户设置页面组件 - 用于管理用户账户相关信息
function AccountSettings() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>账户设置</h1>
      {/* 页面描述文本 */}
      <p>管理您的账户信息，如用户名、邮箱、联系方式等</p>
    </div>
  )
}

// 导出 AccountSettings 组件，使其可以在其他地方被导入使用
export default AccountSettings