// GET请求示例页面
// 演示如何使用fetch API发送GET请求获取数据
import { useState } from 'react'

function GetExample() {
  // 状态管理
  const [users, setUsers] = useState([]) // 存储获取的用户数据
  const [loading, setLoading] = useState(false) // 加载状态
  const [error, setError] = useState(null) // 错误信息
  const [responseTime, setResponseTime] = useState(null) // 响应时间

  // 发送GET请求的函数
  const fetchUsers = async () => {
    try {
      setLoading(true) // 设置加载状态为true
      setError(null) // 清除之前的错误
      const startTime = Date.now() // 记录请求开始时间

      // 使用fetch API发送GET请求到JSONPlaceholder API
      // JSONPlaceholder是一个免费的在线REST API，用于测试和原型开发
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 解析响应数据为JSON
      const data = await response.json()
      setUsers(data) // 更新用户数据状态

      const endTime = Date.now() // 记录请求结束时间
      setResponseTime(endTime - startTime) // 计算响应时间
    } catch (err) {
      // 捕获并处理错误
      setError(err.message)
      setUsers([]) // 清空用户数据
    } finally {
      setLoading(false) // 无论成功失败，都设置加载状态为false
    }
  }

  return (
    <div className="api-example-page">
      <h1>GET请求示例</h1>
      <p>本示例演示如何使用浏览器内置的fetch API发送GET请求获取数据。</p>
      
      <div className="example-container">
        <h2>功能说明</h2>
        <ul>
          <li>点击下方按钮发送GET请求到JSONPlaceholder API</li>
          <li>获取用户列表数据并显示</li>
          <li>展示请求的响应时间</li>
          <li>处理可能出现的错误</li>
        </ul>

        <div className="action-section">
          <button 
            onClick={fetchUsers} 
            disabled={loading}
            className="api-button"
          >
            {loading ? '加载中...' : '获取用户数据'}
          </button>
        </div>

        {/* 显示响应时间 */}
        {responseTime !== null && (
          <div className="response-time">
            <p>响应时间: {responseTime}ms</p>
          </div>
        )}

        {/* 显示错误信息 */}
        {error && (
          <div className="error-message">
            <p>错误: {error}</p>
          </div>
        )}

        {/* 显示用户数据 */}
        {users.length > 0 && (
          <div className="data-display">
            <h3>用户数据</h3>
            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-item">
                  <h4>{user.name}</h4>
                  <p>邮箱: {user.email}</p>
                  <p>电话: {user.phone}</p>
                  <p>网站: {user.website}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="code-example">
          <h3>代码示例</h3>
          <pre>
{"// 发送GET请求的代码示例\nconst fetchUsers = async () => {\n  try {\n    setLoading(true);\n    setError(null);\n    \n    // 使用fetch API发送GET请求\n    const response = await fetch('https://jsonplaceholder.typicode.com/users');\n    \n    if (!response.ok) {\n      throw new Error(\"HTTP error! status: \" + response.status);\n    }\n    \n    // 解析响应数据\n    const data = await response.json();\n    setUsers(data);\n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setLoading(false);\n  }\n};"}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default GetExample