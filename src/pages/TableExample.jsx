// 表格示例页面
// 演示如何实现带有分页、排序、过滤和搜索功能的表格
import { useState, useEffect } from 'react'

function TableExample() {
  // 状态管理
  const [users, setUsers] = useState([]) // 原始用户数据
  const [filteredUsers, setFilteredUsers] = useState([]) // 过滤后的用户数据
  const [currentPage, setCurrentPage] = useState(1) // 当前页码
  const [itemsPerPage] = useState(10) // 每页显示的条目数
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }) // 排序配置
  const [searchTerm, setSearchTerm] = useState('') // 搜索关键词
  const [filters, setFilters] = useState({ // 列过滤器
    name: '',
    email: '',
    role: '',
    status: ''
  })

  // 生成模拟数据
  useEffect(() => {
    const generateUsers = () => {
      const roles = ['Admin', 'User', 'Editor', 'Viewer']
      const statuses = ['Active', 'Inactive', 'Pending']
      const users = []
      
      for (let i = 1; i <= 100; i++) {
        users.push({
          id: i,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          role: roles[Math.floor(Math.random() * roles.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          createdAt: new Date(Date.now() - Math.random() * 31536000000).toISOString().split('T')[0] // 随机日期
        })
      }
      
      return users
    }
    
    const userData = generateUsers()
    setUsers(userData)
    setFilteredUsers(userData)
  }, [])

  // 当搜索词、过滤器或排序配置变化时，更新过滤后的用户数据
  useEffect(() => {
    let result = [...users]
    
    // 应用搜索
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.status.toLowerCase().includes(term)
      )
    }
    
    // 应用过滤器
    if (filters.name) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(filters.name.toLowerCase())
      )
    }
    
    if (filters.email) {
      result = result.filter(user => 
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      )
    }
    
    if (filters.role) {
      result = result.filter(user => 
        user.role.toLowerCase().includes(filters.role.toLowerCase())
      )
    }
    
    if (filters.status) {
      result = result.filter(user => 
        user.status.toLowerCase().includes(filters.status.toLowerCase())
      )
    }
    
    // 应用排序
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    
    setFilteredUsers(result)
    setCurrentPage(1) // 重置到第一页
  }, [users, searchTerm, filters, sortConfig])

  // 处理排序
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // 处理搜索
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // 处理过滤器变化
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // 清除所有过滤器
  const clearFilters = () => {
    setFilters({
      name: '',
      email: '',
      role: '',
      status: ''
    })
    setSearchTerm('')
  }

  // 获取当前页的用户数据
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // 计算总页数
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // 生成页码数组
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  // 处理页码变化
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // 渲染排序图标
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? '🔼' : '🔽'
  }

  return (
    <div className="table-example-page">
      <h1>表格示例</h1>
      <p>本示例演示如何实现带有分页、排序、过滤和搜索功能的表格。</p>
      
      <div className="example-container">
        <h2>功能说明</h2>
        <ul>
          <li>点击表头进行列排序</li>
          <li>使用搜索框搜索表格内容</li>
          <li>使用列过滤器过滤特定列的数据</li>
          <li>使用分页控件导航不同页面</li>
        </ul>

        {/* 搜索和过滤器区域 */}
        <div className="table-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button 
              onClick={clearFilters}
              className="clear-button"
            >
              清除过滤器
            </button>
          </div>

          {/* 列过滤器 */}
          <div className="filter-section">
            <div className="filter-group">
              <label>姓名:</label>
              <input
                type="text"
                placeholder="过滤姓名..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>邮箱:</label>
              <input
                type="text"
                placeholder="过滤邮箱..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>角色:</label>
              <input
                type="text"
                placeholder="过滤角色..."
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>状态:</label>
              <input
                type="text"
                placeholder="过滤状态..."
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>

        {/* 表格 */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')} className="sortable">
                  ID {renderSortIcon('id')}
                </th>
                <th onClick={() => requestSort('name')} className="sortable">
                  姓名 {renderSortIcon('name')}
                </th>
                <th onClick={() => requestSort('email')} className="sortable">
                  邮箱 {renderSortIcon('email')}
                </th>
                <th onClick={() => requestSort('role')} className="sortable">
                  角色 {renderSortIcon('role')}
                </th>
                <th onClick={() => requestSort('status')} className="sortable">
                  状态 {renderSortIcon('status')}
                </th>
                <th onClick={() => requestSort('createdAt')} className="sortable">
                  创建日期 {renderSortIcon('createdAt')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    没有找到匹配的用户数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              上一页
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`pagination-button ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              下一页
            </button>
            
            <div className="page-info">
              第 {currentPage} 页，共 {totalPages} 页
            </div>
          </div>
        )}

        {/* 数据统计 */}
        <div className="data-stats">
          <p>显示 {filteredUsers.length} 个用户中的 {indexOfFirstItem + 1} 到 {Math.min(indexOfLastItem, filteredUsers.length)} 个</p>
        </div>

        <div className="code-example">
          <h3>代码示例</h3>
          <pre>
{"// 表格核心功能实现示例\n\n// 1. 过滤和搜索逻辑\nuseEffect(() => {\n  let result = [...users];\n  \n  // 应用搜索\n  if (searchTerm) {\n    const term = searchTerm.toLowerCase();\n    result = result.filter(user => \n      user.name.toLowerCase().includes(term) ||\n      user.email.toLowerCase().includes(term) ||\n      user.role.toLowerCase().includes(term) ||\n      user.status.toLowerCase().includes(term)\n    );\n  }\n  \n  // 应用过滤器\n  if (filters.name) {\n    result = result.filter(user => \n      user.name.toLowerCase().includes(filters.name.toLowerCase())\n    );\n  }\n  \n  // 应用排序\n  if (sortConfig.key) {\n    result.sort((a, b) => {\n      if (a[sortConfig.key] < b[sortConfig.key]) {\n        return sortConfig.direction === 'ascending' ? -1 : 1;\n      }\n      if (a[sortConfig.key] > b[sortConfig.key]) {\n        return sortConfig.direction === 'ascending' ? 1 : -1;\n      }\n      return 0;\n    });\n  }\n  \n  setFilteredUsers(result);\n  setCurrentPage(1);\n}, [users, searchTerm, filters, sortConfig]);\n\n// 2. 分页逻辑\nconst indexOfLastItem = currentPage * itemsPerPage;\nconst indexOfFirstItem = indexOfLastItem - itemsPerPage;\nconst currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);\nconst totalPages = Math.ceil(filteredUsers.length / itemsPerPage);"}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default TableExample