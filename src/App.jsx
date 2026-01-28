// 从 React Router DOM 导入路由相关组件
// Routes: 用于包裹多个路由规则
// Route: 定义单个路由规则
import { Routes, Route } from 'react-router-dom'
// 导入布局组件，作为整个应用的外壳
import Layout from './components/Layout'
// 导入各个页面组件
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
// 导入新增的子页面组件
import SecuritySettings from './pages/SecuritySettings'
import AccountSettings from './pages/AccountSettings'
import UserProfileEdit from './pages/UserProfileEdit'
import UserPreferences from './pages/UserPreferences'
// 导入API示例页面组件
import GetExample from './pages/api/GetExample'
import PostExample from './pages/api/PostExample'
import PutExample from './pages/api/PutExample'
import DeleteExample from './pages/api/DeleteExample'
// 导入表格示例页面组件
import TableExample from './pages/TableExample'
// 导入高级表格示例页面组件
import AdvancedTableExample from './pages/AdvancedTableExample'

// 主应用组件 - 整个应用的入口点
function App() {
  return (
    // 使用 Layout 组件作为应用的整体布局
    <Layout>
      {/* 定义应用的路由规则 */}
      <Routes>
        {/* 当路径为 '/' 时，渲染 Home 组件 */}
        <Route path="/" element={<Home />} />
        {/* 当路径为 '/dashboard' 时，渲染 Dashboard 组件 */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 当路径为 '/settings' 时，渲染 Settings 组件 */}
        <Route path="/settings" element={<Settings />} />
        {/* 新增的安全设置路由 */}
        <Route path="/settings/security" element={<SecuritySettings />} />
        {/* 新增的账户设置路由 */}
        <Route path="/settings/account" element={<AccountSettings />} />
        {/* 当路径为 '/profile' 时，渲染 Profile 组件 */}
        <Route path="/profile" element={<Profile />} />
        {/* 新增的编辑资料路由 */}
        <Route path="/profile/edit" element={<UserProfileEdit />} />
        {/* 新增的偏好设置路由 */}
        <Route path="/profile/preferences" element={<UserPreferences />} />
        {/* API示例路由 */}
        <Route path="/api/get" element={<GetExample />} />
        <Route path="/api/post" element={<PostExample />} />
        <Route path="/api/put" element={<PutExample />} />
        <Route path="/api/delete" element={<DeleteExample />} />
        {/* 表格示例路由 */}
        <Route path="/table" element={<TableExample />} />
        {/* 高级表格示例路由 */}
        <Route path="/advanced-table" element={<AdvancedTableExample />} />
      </Routes>
    </Layout>
  )
}

// 导出 App 组件，使其可以在其他地方被导入使用
export default App
