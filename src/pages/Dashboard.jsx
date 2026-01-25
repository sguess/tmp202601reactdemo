// 导入页面的样式文件（复用 Home 页面的样式）
import './Home.css'

// 仪表盘页面组件 - 显示系统数据概览
function Dashboard() {
  return (
    // 页面容器，使用 page 类名应用通用页面样式
    <div className="page">
      {/* 页面标题 */}
      <h1>仪表盘</h1>
      {/* 页面描述文本 */}
      <p>这里显示系统数据概览</p>
    </div>
  )
}

// 导出 Dashboard 组件，使其可以在其他地方被导入使用
export default Dashboard
