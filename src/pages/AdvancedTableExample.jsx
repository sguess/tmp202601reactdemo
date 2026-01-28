// 高级表格示例页面
// 演示如何实现带有美观设计和列标题集成功能的表格
import { useState, useEffect } from 'react'

function AdvancedTableExample() {
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
  const [showFilters, setShowFilters] = useState({ // 控制过滤器显示/隐藏
    name: false,
    email: false,
    role: false,
    status: false
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

  // 切换过滤器显示/隐藏
  const toggleFilter = (key) => {
    setShowFilters(prev => ({
      ...prev,
      [key]: !prev[key]
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
    setShowFilters({
      name: false,
      email: false,
      role: false,
      status: false
    })
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
    return sortConfig.direction === 'ascending' ? '↑' : '↓'
  }

  return (
    <div className="advanced-table-example-page">
      <h1>高级表格示例</h1>
      <p>本示例演示如何实现带有美观设计和列标题集成功能的表格。</p>
      
      <div className="example-container">
        <h2>功能说明</h2>
        <ul>
          <li>点击表头进行列排序</li>
          <li>点击表头过滤器图标打开/关闭列过滤器</li>
          <li>使用搜索框搜索表格内容</li>
          <li>使用分页控件导航不同页面</li>
          <li>享受美观的视觉设计和流畅的交互体验</li>
        </ul>

        {/* 搜索和过滤器区域 */}
        <div className="table-controls">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button 
              onClick={clearFilters}
              className="clear-button"
            >
              清除所有过滤器
            </button>
          </div>
        </div>

        {/* 表格 */}
        <div className="table-container">
          <table className="advanced-data-table">
            <thead>
              <tr>
                <th 
                  className="table-header"
                  onClick={() => requestSort('id')}
                >
                  <div className="header-content">
                    <span className="header-title">ID</span>
                    <span className="header-actions">
                      {renderSortIcon('id')}
                    </span>
                  </div>
                </th>
                <th 
                  className="table-header"
                  onClick={() => requestSort('name')}
                >
                  <div className="header-content">
                    <span className="header-title">姓名</span>
                    <span className="header-actions">
                      {renderSortIcon('name')}
                      <button 
                        className="filter-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFilter('name')
                        }}
                      >
                        ⚙️
                      </button>
                    </span>
                  </div>
                  {showFilters.name && (
                    <div className="filter-dropdown">
                      <input
                        type="text"
                        placeholder="过滤姓名..."
                        value={filters.name}
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                        className="filter-input"
                      />
                    </div>
                  )}
                </th>
                <th 
                  className="table-header"
                  onClick={() => requestSort('email')}
                >
                  <div className="header-content">
                    <span className="header-title">邮箱</span>
                    <span className="header-actions">
                      {renderSortIcon('email')}
                      <button 
                        className="filter-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFilter('email')
                        }}
                      >
                        ⚙️
                      </button>
                    </span>
                  </div>
                  {showFilters.email && (
                    <div className="filter-dropdown">
                      <input
                        type="text"
                        placeholder="过滤邮箱..."
                        value={filters.email}
                        onChange={(e) => handleFilterChange('email', e.target.value)}
                        className="filter-input"
                      />
                    </div>
                  )}
                </th>
                <th 
                  className="table-header"
                  onClick={() => requestSort('role')}
                >
                  <div className="header-content">
                    <span className="header-title">角色</span>
                    <span className="header-actions">
                      {renderSortIcon('role')}
                      <button 
                        className="filter-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFilter('role')
                        }}
                      >
                        ⚙️
                      </button>
                    </span>
                  </div>
                  {showFilters.role && (
                    <div className="filter-dropdown">
                      <input
                        type="text"
                        placeholder="过滤角色..."
                        value={filters.role}
                        onChange={(e) => handleFilterChange('role', e.target.value)}
                        className="filter-input"
                      />
                    </div>
                  )}
                </th>
                <th 
                  className="table-header"
                  onClick={() => requestSort('status')}
                >
                  <div className="header-content">
                    <span className="header-title">状态</span>
                    <span className="header-actions">
                      {renderSortIcon('status')}
                      <button 
                        className="filter-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFilter('status')
                        }}
                      >
                        ⚙️
                      </button>
                    </span>
                  </div>
                  {showFilters.status && (
                    <div className="filter-dropdown">
                      <input
                        type="text"
                        placeholder="过滤状态..."
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="filter-input"
                      />
                    </div>
                  )}
                </th>
                <th 
                  className="table-header"
                  onClick={() => requestSort('createdAt')}
                >
                  <div className="header-content">
                    <span className="header-title">创建日期</span>
                    <span className="header-actions">
                      {renderSortIcon('createdAt')}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id} className="table-row">
                    <td className="table-cell">{user.id}</td>
                    <td className="table-cell">{user.name}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="table-cell">{user.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    <div className="no-data-content">
                      <div className="no-data-icon">🔍</div>
                      <p>没有找到匹配的用户数据</p>
                      <button 
                        onClick={clearFilters}
                        className="clear-button"
                      >
                        清除过滤器
                      </button>
                    </div>
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
              ← 上一页
            </button>
            
            {/* 页码范围显示 */}
            <div className="pagination-numbers">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              下一页 →
            </button>
            
            <div className="page-info">
              第 {currentPage} / {totalPages} 页
            </div>
          </div>
        )}

        {/* 数据统计 */}
        <div className="data-stats">
          <div className="stats-item">
            <span className="stats-label">总用户数:</span>
            <span className="stats-value">{filteredUsers.length}</span>
          </div>
          <div className="stats-item">
            <span className="stats-label">当前显示:</span>
            <span className="stats-value">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredUsers.length)}</span>
          </div>
          {Object.values(filters).some(value => value) && (
            <div className="stats-item filters-active">
              <span className="stats-label">活跃过滤器:</span>
              <span className="stats-value">{Object.values(filters).filter(value => value).length}</span>
            </div>
          )}
        </div>

        {/* 样式说明 */}
        <div className="style-info">
          <h3>设计特点</h3>
          <ul>
            <li>现代化的表格设计，带有柔和的阴影和圆角</li>
            <li>列标题集成了排序和过滤功能，界面更简洁</li>
            <li>流畅的悬停效果和过渡动画</li>
            <li>响应式设计，适配不同屏幕尺寸</li>
            <li>美观的状态和角色标签</li>
            <li>清晰的分页控件和数据统计信息</li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .advanced-table-example-page {
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .example-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        
        h1 {
          color: #333;
          margin-bottom: 10px;
        }
        
        h2 {
          color: #555;
          margin: 20px 0 10px;
        }
        
        h3 {
          color: #666;
          margin: 15px 0 10px;
        }
        
        p {
          color: #666;
          margin-bottom: 20px;
        }
        
        ul {
          margin-bottom: 20px;
          padding-left: 20px;
        }
        
        li {
          margin-bottom: 8px;
          color: #666;
        }
        
        /* 表格控件 */
        .table-controls {
          margin-bottom: 20px;
        }
        
        .search-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .search-input-container {
          position: relative;
          flex: 1;
          min-width: 300px;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
        }
        
        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }
        
        .clear-button {
          padding: 10px 20px;
          background-color: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .clear-button:hover {
          background-color: #e0e0e0;
        }
        
        /* 表格容器 */
        .table-container {
          margin-bottom: 20px;
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        /* 高级表格 */
        .advanced-data-table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
        }
        
        /* 表格头部 */
        .table-header {
          background-color: #f8f9fa;
          padding: 0;
          border-bottom: 2px solid #e0e0e0;
          position: relative;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .header-content:hover {
          background-color: #f0f2f5;
        }
        
        .header-title {
          font-weight: 600;
          color: #333;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
        }
        
        .filter-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.6;
          transition: opacity 0.2s ease;
          padding: 2px;
        }
        
        .filter-button:hover {
          opacity: 1;
        }
        
        /* 过滤器下拉菜单 */
        .filter-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        .filter-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
        }
        
        /* 表格行和单元格 */
        .table-row {
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s ease;
        }
        
        .table-row:hover {
          background-color: #f8f9fa;
        }
        
        .table-cell {
          padding: 12px 16px;
          color: #333;
          vertical-align: middle;
        }
        
        /* 状态和角色标签 */
        .status-badge, .role-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .status-badge.active {
          background-color: #e8f5e8;
          color: #2e7d32;
        }
        
        .status-badge.inactive {
          background-color: #ffebee;
          color: #c62828;
        }
        
        .status-badge.pending {
          background-color: #fff3e0;
          color: #ef6c00;
        }
        
        .role-badge.admin {
          background-color: #e3f2fd;
          color: #1565c0;
        }
        
        .role-badge.user {
          background-color: #f3e5f5;
          color: #6a1b9a;
        }
        
        .role-badge.editor {
          background-color: #e0f7fa;
          color: #006064;
        }
        
        .role-badge.viewer {
          background-color: #fafafa;
          color: #616161;
        }
        
        /* 无数据状态 */
        .no-data {
          padding: 60px 20px;
          text-align: center;
        }
        
        .no-data-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .no-data-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }
        
        .no-data p {
          margin-bottom: 20px;
          color: #666;
        }
        
        /* 分页控件 */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin: 30px 0;
          flex-wrap: wrap;
        }
        
        .pagination-button {
          padding: 8px 16px;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        
        .pagination-button:hover:not(:disabled) {
          background-color: #f5f5f5;
          border-color: #d0d0d0;
        }
        
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-numbers {
          display: flex;
          gap: 4px;
        }
        
        .pagination-number {
          padding: 8px 12px;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease;
          min-width: 36px;
          text-align: center;
        }
        
        .pagination-number:hover:not(.active) {
          background-color: #f5f5f5;
        }
        
        .pagination-number.active {
          background-color: #4a90e2;
          color: white;
          border-color: #4a90e2;
        }
        
        .page-info {
          margin-left: 16px;
          font-size: 14px;
          color: #666;
        }
        
        /* 数据统计 */
        .data-stats {
          display: flex;
          gap: 30px;
          padding: 16px;
          background-color: #f8f9fa;
          border-radius: 8px;
          flex-wrap: wrap;
        }
        
        .stats-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stats-label {
          font-size: 14px;
          color: #666;
        }
        
        .stats-value {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        
        .filters-active .stats-value {
          color: #4a90e2;
        }
        
        /* 样式说明 */
        .style-info {
          margin-top: 40px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .search-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-input-container {
            min-width: auto;
          }
          
          .data-stats {
            flex-direction: column;
            gap: 10px;
          }
          
          .pagination {
            flex-direction: column;
            align-items: stretch;
          }
          
          .pagination-numbers {
            justify-content: center;
          }
          
          .page-info {
            text-align: center;
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default AdvancedTableExample