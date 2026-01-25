# 现代前端开发概念详解

## 1. 模块化开发

### 什么是模块化？
模块化是一种将复杂程序分解为独立、可复用模块的编程范式。

### 在项目中的体现：
- **ES6 模块语法**：使用 `import` 和 `export` 管理代码依赖
- **组件模块化**：将 UI 分解为独立的可复用组件
- **样式模块化**：将样式按功能分离到不同文件

```javascript
// 导入模块
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

// 导出模块
export default App;
```

## 2. 组件化架构

### 组件生命周期
在函数组件中，我们使用 `useEffect` Hook 来处理生命周期事件：

```javascript
import { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  // 相当于 componentDidMount
  useEffect(() => {
    // 组件挂载后执行
    fetchData().then(setData);
  }, []);

  // 相当于 componentDidUpdate
  useEffect(() => {
    // 依赖项变化时执行
    console.log('Data updated:', data);
  }, [data]);

  return <div>{data && <p>{data}</p>}</div>;
}
```

### 组件设计原则
1. **单一职责**：每个组件只负责一项功能
2. **可复用性**：组件应该能够在不同场景下重复使用
3. **可测试性**：组件应该是独立的，易于单元测试
4. **可组合性**：组件应该能够轻松地组合在一起

## 3. 状态管理

### React State 管理
React 提供了多种状态管理方式：

#### Local State（局部状态）
适用于组件内部的状态管理：

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

#### Prop Drilling（属性钻取）
通过组件层级传递数据：

```javascript
// 父组件
<UserProfile>
  <UserDetails userId={userId}>
    <UserName userId={userId} />
  </UserDetails>
</UserProfile>
```

### Context API
用于跨层级传递数据，避免属性钻取：

```javascript
// 创建上下文
const ThemeContext = createContext();

// 提供者组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 消费者组件
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button className={theme}>
      Current theme: {theme}
    </button>
  );
}
```

## 4. 前端路由

### React Router DOM
React Router 实现客户端路由，无需页面刷新即可切换视图：

```jsx
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={
          user.isAdmin ? <AdminPanel /> : <Navigate to="/" />
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### 动态路由
支持参数化路由：

```jsx
<Route path="/users/:id" element={<UserProfile />} />

// 在组件中访问参数
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

## 5. 性能优化

### React.memo
防止不必要的组件重渲染：

```javascript
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* 复杂的渲染逻辑 */}</div>;
});
```

### useMemo 和 useCallback
缓存计算结果和函数引用：

```javascript
// 缓存计算结果
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// 缓存函数引用
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []);
```

### 代码分割
按需加载组件，减少初始包大小：

```javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 6. CSS 现代技术

### CSS 变量（Custom Properties）
允许动态修改 CSS 值：

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

.button {
  background-color: var(--primary-color);
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
}
```

### Flexbox 布局
弹性盒子布局，适用于一维布局：

```css
.container {
  display: flex;
  justify-content: space-between;  /* 主轴对齐 */
  align-items: center;             /* 交叉轴对齐 */
  flex-wrap: wrap;                 /* 换行 */
}
```

### 响应式设计
使用媒体查询适配不同屏幕尺寸：

```css
.component {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .component {
    width: 50%;
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .component {
    width: 33.333%;
  }
}
```

## 7. 构建工具 - Vite

### Vite 的优势
1. **快速冷启动**：无需打包，直接服务源码
2. **即时热更新**：仅更新变更部分
3. **原生 ES 模块**：利用浏览器原生模块支持
4. **智能预构建**：自动优化依赖

### Vite 配置详解
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],           // 使用 React 插件
  server: {
    port: 3000,               // 开发服务器端口
    open: true,               // 启动时自动打开浏览器
    proxy: {                  // 代理配置
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',           // 输出目录
    sourcemap: true           // 生成源码映射
  }
})
```

## 8. 现代 JavaScript 特性

### 解构赋值
从对象或数组中提取值：

```javascript
// 对象解构
const { name, age } = user;

// 数组解构
const [first, second] = items;

// 参数解构
function greet({ name, age }) {
  return `Hello ${name}, you are ${age} years old`;
}
```

### 展开运算符
展开数组或对象：

```javascript
// 数组展开
const newArray = [...oldArray, newItem];

// 对象展开
const newObj = { ...oldObj, newProp: value };

// 函数参数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

### 模板字符串
嵌入表达式的字符串字面量：

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// 多行字符串
const multiline = `
  This is a
  multi-line
  string
`;
```

## 9. 异步编程

### Promise 和 async/await
处理异步操作：

```javascript
// Promise 方式
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// async/await 方式
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

## 10. 错误处理

### React 错误边界
捕获子组件的 JavaScript 错误：

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Try-Catch 在组件中的使用
```javascript
function DataComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await api.getData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  return <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>;
}
```

## 11. 测试基础

### React 组件测试
使用 Jest 和 React Testing Library：

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  
  const button = screen.getByText('+');
  const countDisplay = screen.getByText(/count:/i);
  
  expect(countDisplay).toHaveTextContent('Count: 0');
  
  fireEvent.click(button);
  
  expect(countDisplay).toHaveTextContent('Count: 1');
});
```

## 12. 最佳实践

### 代码组织
- 将组件按功能分组
- 使用一致的命名约定
- 合理拆分大型组件
- 保持组件纯度

### 可访问性（Accessibility）
```jsx
// 使用语义化 HTML
<header>, <nav>, <main>, <footer>

// 添加适当的标签
<button aria-label="Close modal">×</button>

// 使用正确的表单标签
<label htmlFor="username">Username</label>
<input id="username" />
```

### 性能监控
- 使用 React DevTools Profiler
- 监控组件重渲染
- 使用性能测量 API
- 优化关键渲染路径