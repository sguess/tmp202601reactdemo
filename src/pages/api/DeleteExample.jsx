// DELETE请求示例页面
// 演示如何使用fetch API发送DELETE请求删除数据
import { useState } from 'react'

function DeleteExample() {
  // 状态管理
  const [postId, setPostId] = useState(1) // 要删除的帖子ID
  const [response, setResponse] = useState(null) // 响应数据
  const [loading, setLoading] = useState(false) // 加载状态
  const [error, setError] = useState(null) // 错误信息
  const [responseTime, setResponseTime] = useState(null) // 响应时间
  const [success, setSuccess] = useState(false) // 成功状态

  // 处理输入变化
  const handleIdChange = (e) => {
    setPostId(e.target.value)
  }

  // 发送DELETE请求的函数
  const deletePost = async (e) => {
    e.preventDefault() // 阻止表单默认提交
    
    try {
      setLoading(true) // 设置加载状态为true
      setError(null) // 清除之前的错误
      setResponse(null) // 清除之前的响应
      setSuccess(false) // 重置成功状态
      const startTime = Date.now() // 记录请求开始时间

      // 使用fetch API发送DELETE请求到JSONPlaceholder API
      // JSONPlaceholder是一个免费的在线REST API，用于测试和原型开发
      const fetchResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE' // 指定请求方法为DELETE
        // DELETE请求通常不需要请求体
      })

      // 检查响应状态
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }

      // 解析响应数据为JSON
      // 注意：JSONPlaceholder的DELETE请求返回空对象
      const data = await fetchResponse.json()
      setResponse(data) // 更新响应数据状态
      setSuccess(true) // 设置成功状态为true

      const endTime = Date.now() // 记录请求结束时间
      setResponseTime(endTime - startTime) // 计算响应时间
    } catch (err) {
      // 捕获并处理错误
      setError(err.message)
      setResponse(null) // 清空响应数据
      setSuccess(false) // 设置成功状态为false
    } finally {
      setLoading(false) // 无论成功失败，都设置加载状态为false
    }
  }

  return (
    <div className="api-example-page">
      <h1>DELETE请求示例</h1>
      <p>本示例演示如何使用浏览器内置的fetch API发送DELETE请求删除数据。</p>
      
      <div className="example-container">
        <h2>功能说明</h2>
        <ul>
          <li>输入要删除的帖子ID</li>
          <li>点击删除按钮发送DELETE请求到JSONPlaceholder API</li>
          <li>显示操作结果</li>
          <li>展示请求的响应时间</li>
          <li>处理可能出现的错误</li>
        </ul>

        {/* 表单 */}
        <form onSubmit={deletePost} className="api-form">
          <div className="form-group">
            <label htmlFor="postId">帖子ID:</label>
            <input
              type="number"
              id="postId"
              value={postId}
              onChange={handleIdChange}
              min="1"
              required
              className="form-input"
            />
          </div>

          <div className="action-section">
            <button 
              type="submit" 
              disabled={loading}
              className="api-button delete-button"
            >
              {loading ? '删除中...' : '删除帖子'}
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

        {/* 显示成功信息 */}
        {success && (
          <div className="success-message">
            <p>成功: 帖子 #{postId} 已被删除</p>
            {response && (
              <div className="response-item">
                <p><strong>服务器响应:</strong> {JSON.stringify(response)}</p>
              </div>
            )}
          </div>
        )}

        <div className="code-example">
          <h3>代码示例</h3>
          <pre>
{"// 发送DELETE请求的代码示例\nconst deletePost = async (e) => {\n  e.preventDefault();\n  \n  try {\n    setLoading(true);\n    setError(null);\n    \n    // 使用fetch API发送DELETE请求\n    const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {\n      method: 'DELETE'\n      // DELETE请求通常不需要请求体\n    });\n    \n    if (!fetchResponse.ok) {\n      throw new Error(\"HTTP error! status: \" + fetchResponse.status);\n    }\n    \n    // 解析响应数据\n    const data = await fetchResponse.json();\n    setResponse(data);\n    setSuccess(true);\n  } catch (err) {\n    setError(err.message);\n  } finally {\n    setLoading(false);\n  }\n};"}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default DeleteExample