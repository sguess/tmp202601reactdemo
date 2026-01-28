// POST请求示例页面
// 演示如何使用fetch API发送POST请求提交数据
import { useState } from 'react'

function PostExample() {
  // 状态管理
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  }) // 表单数据
  const [response, setResponse] = useState(null) // 响应数据
  const [loading, setLoading] = useState(false) // 加载状态
  const [error, setError] = useState(null) // 错误信息
  const [responseTime, setResponseTime] = useState(null) // 响应时间

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 发送POST请求的函数
  const submitPost = async (e) => {
    e.preventDefault() // 阻止表单默认提交
    
    try {
      setLoading(true) // 设置加载状态为true
      setError(null) // 清除之前的错误
      setResponse(null) // 清除之前的响应
      const startTime = Date.now() // 记录请求开始时间

      // 使用fetch API发送POST请求到JSONPlaceholder API
      // JSONPlaceholder是一个免费的在线REST API，用于测试和原型开发
      const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', // 指定请求方法为POST
        headers: {
          'Content-Type': 'application/json' // 设置请求头，指定内容类型为JSON
        },
        body: JSON.stringify(formData) // 将表单数据转换为JSON字符串作为请求体
      })

      // 检查响应状态
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }

      // 解析响应数据为JSON
      const data = await fetchResponse.json()
      setResponse(data) // 更新响应数据状态

      const endTime = Date.now() // 记录请求结束时间
      setResponseTime(endTime - startTime) // 计算响应时间
    } catch (err) {
      // 捕获并处理错误
      setError(err.message)
      setResponse(null) // 清空响应数据
    } finally {
      setLoading(false) // 无论成功失败，都设置加载状态为false
    }
  }

  return (
    <div className="api-example-page">
      <h1>POST请求示例</h1>
      <p>本示例演示如何使用浏览器内置的fetch API发送POST请求提交数据。</p>
      
      <div className="example-container">
        <h2>功能说明</h2>
        <ul>
          <li>填写表单数据</li>
          <li>点击提交按钮发送POST请求到JSONPlaceholder API</li>
          <li>显示服务器返回的响应数据</li>
          <li>展示请求的响应时间</li>
          <li>处理可能出现的错误</li>
        </ul>

        {/* 表单 */}
        <form onSubmit={submitPost} className="api-form">
          <div className="form-group">
            <label htmlFor="title">标题:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">内容:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              rows={4}
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="userId">用户ID:</label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              min="1"
              required
              className="form-input"
            />
          </div>

          <div className="action-section">
            <button 
              type="submit" 
              disabled={loading}
              className="api-button"
            >
              {loading ? '提交中...' : '提交数据'}
            </button>
          </div>
        </form>

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

        {/* 显示响应数据 */}
        {response && (
          <div className="data-display">
            <h3>服务器响应</h3>
            <div className="response-item">
              <p><strong>ID:</strong> {response.id}</p>
              <p><strong>标题:</strong> {response.title}</p>
              <p><strong>内容:</strong> {response.body}</p>
              <p><strong>用户ID:</strong> {response.userId}</p>
            </div>
          </div>
        )}

        <div className="code-example">
          <h3>代码示例</h3>
          <pre>
{"// 发送POST请求的代码示例\nconst submitPost = async (e) => {\n  e.preventDefault();\n  \n  try {\n    setLoading(true);\n    setError(null);\n    \n    // 使用fetch API发送POST请求\n    const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(formData)\n    });\n    \n    if (!fetchResponse.ok) {\n      throw new Error(\"HTTP error! status: \" + fetchResponse.status);\n    }\n    \n    // 解析响应数据\n    const data = await fetchResponse.json();\n    setResponse(data);\n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setLoading(false);\n  }\n};"}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default PostExample