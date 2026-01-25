// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 个人资料页面组件 - 显示和编辑用户个人信息
function Profile() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>个人资料</h1>
      {/* 页面描述文本 */}
      <p>用户个人信息页面</p>
    </div>
  )
}

// 导出 Profile 组件，使其可以在其他地方被导入使用
export default Profile
