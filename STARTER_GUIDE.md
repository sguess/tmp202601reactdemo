# 项目启动和学习指南

## 项目启动

### 1. 环境要求
- Node.js (推荐 v16 或更高版本)
- npm 或 yarn

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
这将启动开发服务器，默认运行在 http://localhost:3000（如果端口被占用，Vite 会自动选择其他端口）

### 4. 构建生产版本
```bash
npm run build
```

### 5. 预览生产构建
```bash
npm run preview
```

## 项目结构详解

```
src/
├── components/         # 可复用的UI组件
│   ├── Layout.jsx      # 应用布局组件（主界面框架）
│   ├── Layout.css      # 布局样式
│   ├── MenuBar.jsx     # 侧边栏菜单组件（导航菜单）
│   └── MenuBar.css     # 菜单样式
├── pages/              # 页面组件
│   ├── Home.jsx        # 首页（欢迎页面）
│   ├── Home.css        # 首页样式
│   ├── Dashboard.jsx   # 仪表盘页面（数据概览）
│   ├── Settings.jsx    # 设置页面（系统配置）
│   └── Profile.jsx     # 个人资料页面（用户信息）
├── App.jsx             # 主应用组件（路由配置中心）
├── main.jsx            # 应用入口文件（初始化React应用）
└── index.css           # 全局样式（全局变量和基础样式）
```

## 核心概念解释

### 1. React 组件
每个 `.jsx` 文件都是一个 React 组件，例如：
```jsx
// Home.jsx 示例
function Home() {
  return (
    <div className="page">
      <h1>欢迎首页</h1>
      <p>这是系统的主页</p>
    </div>
  )
}
```

### 2. 状态管理 (useState Hook)
在 Layout.jsx 中使用了 React 的状态管理：
```jsx
const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
```
这行代码创建了一个名为 `isMenuCollapsed` 的状态变量，初始值为 `false`。

### 3. 组件间通信
- **父组件向子组件传递数据**：通过 props
- **子组件向父组件传递数据**：通过回调函数

### 4. 路由系统
使用 React Router DOM 实现页面导航：
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

## 重点学习内容

### 1. React 基础
- JSX 语法：在 JavaScript 中写 HTML
- Props：组件间的通信方式
- State：组件内部数据管理
- Hooks：在函数组件中使用状态和其他特性

### 2. CSS 样式
- CSS 变量：定义可复用的颜色和尺寸
- Flexbox：灵活的布局系统
- 响应式设计：适配不同屏幕尺寸

### 3. 现代前端工具
- Vite：快速的构建工具
- ES 模块：现代化的模块系统
- 热重载：修改代码后自动更新浏览器

## 实践练习建议

### 初学者练习
1. 修改某个页面的文本内容
2. 更改 CSS 样式，如颜色、字体大小
3. 在现有组件中添加新的元素

### 进阶练习
1. 添加一个新的页面组件
2. 在侧边栏菜单中添加新的菜单项
3. 实现组件间的复杂数据传递
4. 使用 useEffect Hook 处理副作用

## 常见问题排查

### 1. 端口被占用
如果出现端口被占用的情况，Vite 会自动分配新的端口号，如 http://localhost:3001

### 2. 组件不更新
检查是否正确使用了 state 和 props，确保数据流正确

### 3. 样式不生效
确认 CSS 类名拼写正确，检查是否有 CSS 优先级问题

## 学习资源推荐

1. **官方文档**：
   - React 官方文档: https://react.dev
   - Vite 官方文档: https://vitejs.dev

2. **在线练习**：
   - React 官方教程
   - freeCodeCamp React 课程

3. **进阶学习**：
   - React 状态管理模式
   - 组件测试方法
   - 性能优化技巧