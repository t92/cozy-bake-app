# 🏗️ 项目结构概览

## 📂 完整目录树

```
cozy-bake-app/
│
├── 📄 配置文件
│   ├── package.json              # 项目依赖和脚本配置
│   ├── tsconfig.json             # TypeScript 编译配置
│   ├── tsconfig.node.json        # Vite 工具的 TS 配置
│   ├── vite.config.ts            # Vite 构建配置
│   ├── tailwind.config.js        # Tailwind CSS 配置
│   ├── postcss.config.js         # PostCSS 配置
│   ├── .gitignore                # Git 忽略文件
│   ├── .env.example              # 环境变量示例
│   ├── README.md                 # 项目说明文档
│   └── LEARNING_GUIDE.md         # 学习指南
│
├── 🌐 入口文件
│   └── index.html                # HTML 模板
│
└── 📁 src/                       # 源代码目录
    │
    ├── 🎨 样式
    │   └── index.css             # 全局样式 + Tailwind 导入
    │
    ├── 🚀 入口
    │   ├── main.tsx              # 应用入口文件
    │   └── App.tsx               # 根组件 + 路由配置
    │
    ├── 🧩 components/            # 可复用组件
    │   ├── BottomNav.tsx         # 底部导航栏
    │   ├── SearchBar.tsx         # 搜索输入框
    │   ├── RecipeCard.tsx        # 食谱卡片
    │   ├── RecipeListItem.tsx    # 食谱列表项
    │   └── CategoryButton.tsx    # 分类按钮
    │
    ├── 📄 pages/                 # 页面组件
    │   ├── HomePage.tsx          # 首页
    │   ├── ExplorePage.tsx       # 探索页
    │   ├── RecipeDetailPage.tsx  # 食谱详情页
    │   ├── FavoritesPage.tsx     # 收藏页
    │   └── SettingsPage.tsx      # 设置页
    │
    ├── 🗄️ stores/                # Zustand 状态管理
    │   └── useAppStore.ts        # 应用全局状态
    │
    ├── 📝 types/                 # TypeScript 类型定义
    │   └── index.ts              # 全局类型
    │
    ├── 📊 data/                  # 数据层
    │   └── mockData.ts           # 模拟食谱数据
    │
    └── 🔧 utils/                 # 工具函数
        └── helpers.ts            # 辅助函数
```

---

## 📦 核心依赖说明

### 生产依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `react` | ^18.2.0 | UI 框架 |
| `react-dom` | ^18.2.0 | DOM 渲染 |
| `react-router-dom` | ^6.20.0 | 路由管理 |
| `zustand` | ^4.4.7 | 状态管理 |
| `lucide-react` | ^0.294.0 | 图标库 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `vite` | ^5.0.8 | 构建工具 |
| `typescript` | ^5.2.2 | 类型系统 |
| `tailwindcss` | ^3.3.6 | CSS 框架 |
| `@vitejs/plugin-react` | ^4.2.1 | Vite React 插件 |

---

## 🎯 文件职责说明

### 配置文件

#### `package.json`
- 定义项目元数据
- 管理依赖版本
- 配置 npm 脚本

#### `tsconfig.json`
- TypeScript 编译选项
- 模块解析策略
- 类型检查严格度

#### `tailwind.config.js`
- 自定义主题色
- 扩展工具类
- 配置内容路径

#### `vite.config.ts`
- 开发服务器配置
- 构建优化选项
- 插件配置

---

### 源代码文件

#### `src/main.tsx`
**职责：** 应用启动入口
```typescript
// 挂载 React 应用到 DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `src/App.tsx`
**职责：** 配置路由和布局
```typescript
// 定义所有页面路由
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/explore" element={<ExplorePage />} />
  {/* ... */}
</Routes>
```

#### `src/stores/useAppStore.ts`
**职责：** 全局状态管理
- 管理食谱数据
- 管理收藏列表
- 管理搜索和筛选状态
- 提供状态操作方法

#### `src/types/index.ts`
**职责：** 类型定义
- Recipe 接口
- Ingredient 接口
- RecipeStep 接口
- RecipeCategory 类型

#### `src/data/mockData.ts`
**职责：** 模拟数据源
- 提供示例食谱
- 提供分类列表
- 提供热门标签

---

## 🔄 数据流向

```
用户操作
   ↓
组件事件处理
   ↓
调用 Store Action
   ↓
更新 Store State
   ↓
触发组件重渲染
   ↓
UI 更新
```

### 实例：收藏功能

```typescript
// 1. 用户点击收藏按钮
<button onClick={() => toggleFavorite(recipe.id)}>

// 2. 调用 Store 方法
const toggleFavorite = useAppStore((state) => state.toggleFavorite);

// 3. 更新状态
toggleFavorite: (recipeId) => {
  set((state) => ({
    favoriteRecipes: [...state.favoriteRecipes, recipeId]
  }));
}

// 4. 组件自动重渲染
const isFavorited = useAppStore((state) => 
  state.favoriteRecipes.includes(recipeId)
);
```

---

## 🎨 样式组织

### Tailwind 配置层级

```
1. Base Layer (基础层)
   - CSS Reset
   - 默认样式

2. Components Layer (组件层)
   - 可复用的组件类
   - 例如：.btn, .card

3. Utilities Layer (工具层)
   - Tailwind 工具类
   - 自定义工具类
```

### 主题色系统

```javascript
colors: {
  primary: {
    DEFAULT: '#D4A574',  // 主色
    light: '#E5C4A0',    // 浅色
    dark: '#B88A5E',     // 深色
  },
  secondary: {
    DEFAULT: '#F5F1ED',  // 次要色
    light: '#FDFCFB',    
    dark: '#E8E3DD',
  },
}
```

---

## 🧭 路由结构

```
/ (首页)
├── /explore (探索页)
├── /favorites (收藏页)
├── /settings (设置页)
└── /recipe/:id (食谱详情)
```

### 路由守卫

目前没有实现路由守卫，所有页面公开访问。

**扩展建议：**
```typescript
// 可以添加私有路由组件
<Route 
  path="/favorites" 
  element={
    <PrivateRoute>
      <FavoritesPage />
    </PrivateRoute>
  } 
/>
```

---

## 🔌 组件通信

### 父子组件

```typescript
// 父组件传递 props
<RecipeCard recipe={recipe} featured={true} />

// 子组件接收 props
const RecipeCard = ({ recipe, featured }: RecipeCardProps) => {
  // ...
}
```

### 跨组件（通过 Store）

```typescript
// 组件 A 更新状态
const setCategory = useAppStore((state) => state.setSelectedCategory);
setCategory('cakes');

// 组件 B 读取状态
const category = useAppStore((state) => state.selectedCategory);
```

---

## 🚀 性能优化

### 1. 选择性订阅

```typescript
// ❌ 订阅整个 store - 任何变化都重渲染
const store = useAppStore();

// ✅ 只订阅需要的数据
const recipes = useAppStore((state) => state.recipes);
```

### 2. 图片懒加载

```tsx
<img 
  src={recipe.image} 
  loading="lazy"  // 原生懒加载
  alt={recipe.title}
/>
```

### 3. 路由代码分割

```typescript
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
</Suspense>
```

---

## 📱 响应式设计

### 断点系统

```javascript
// Tailwind 默认断点
sm: '640px'   // 小型设备
md: '768px'   // 中型设备
lg: '1024px'  // 大型设备
xl: '1280px'  // 超大设备
2xl: '1536px' // 超超大设备
```

### 移动优先策略

```tsx
<div className="
  w-full        // 默认全宽（移动端）
  md:w-1/2      // 中等屏幕 50%
  lg:w-1/3      // 大屏幕 33%
">
```

---

## 🧪 测试建议

### 单元测试
- 测试 Store 的 action
- 测试工具函数

### 组件测试
- 测试组件渲染
- 测试用户交互

### E2E 测试
- 测试完整用户流程
- 测试页面导航

---

## 📈 后续扩展方向

### 1. 后端集成
```typescript
// API 服务
export const recipeService = {
  getAll: () => axios.get('/api/recipes'),
  getById: (id) => axios.get(`/api/recipes/${id}`),
  create: (data) => axios.post('/api/recipes', data),
};
```

### 2. 认证系统
```typescript
interface AuthState {
  user: User | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
}
```

### 3. 缓存策略
```typescript
// React Query 集成
const { data, isLoading } = useQuery('recipes', fetchRecipes, {
  staleTime: 5 * 60 * 1000, // 5 分钟
});
```

### 4. PWA 支持
- 添加 Service Worker
- 实现离线缓存
- 支持添加到主屏幕

---

## 💻 开发工作流

```bash
# 1. 克隆项目
git clone <repository-url>

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 代码修改
# 保存后自动热更新

# 5. 构建生产版本
npm run build

# 6. 预览生产版本
npm run preview
```

---

Happy Coding! 🎉
