// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 编辑资料页面组件 - 用于编辑用户个人信息
function UserProfileEdit() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>编辑资料</h1>
      {/* 页面描述文本 */}
      <p>编辑您的个人信息，如姓名、头像、个人简介等</p>
    </div>
  )
}

// 导出 UserProfileEdit 组件，使其可以在其他地方被导入使用
export default UserProfileEdit