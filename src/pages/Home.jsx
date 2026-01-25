// 导入页面的样式文件
import './Home.css'

// 首页组件 - 系统的欢迎页面
function Home() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>欢迎首页</h1>
      {/* 页面描述文本 */}
      <p>这是系统的主页</p>
    </div>
  )
}

// 导出 Home 组件，使其可以在其他地方被导入使用
export default Home
