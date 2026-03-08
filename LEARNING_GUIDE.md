# 📖 Cozy Bake 学习指南

## 🎯 学习目标

通过这个项目，你将学习到：

1. **React 18** - 现代 React 开发模式
2. **TypeScript** - 类型安全的 JavaScript
3. **Zustand** - 简单高效的状态管理
4. **Tailwind CSS** - 实用优先的样式方案
5. **React Router** - 单页应用路由
6. **移动端开发** - 响应式设计最佳实践

---

## 📚 核心概念解析

### 1️⃣ 项目架构

```
用户界面 (UI)
    ↓
组件层 (Components)
    ↓
状态管理 (Zustand Store)
    ↓
数据层 (Mock Data / API)
```

**理解要点：**
- 单向数据流：数据从 Store → 组件 → UI
- 用户操作通过组件调用 Store 方法更新状态
- Store 更新后自动触发组件重新渲染

---

### 2️⃣ Zustand 状态管理详解

#### 为什么选择 Zustand？

- ✅ **简单** - 无需 Provider 包裹
- ✅ **轻量** - 体积小，性能好
- ✅ **TypeScript 友好** - 完美的类型推导
- ✅ **零样板代码** - 不需要 actions、reducers

#### 基础用法

```typescript
// 1. 创建 Store
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 2. 在组件中使用
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

#### 高级技巧

```typescript
// 选择性订阅 - 只在 count 变化时重渲染
const count = useCounterStore((state) => state.count);

// 获取值但不订阅
const getCount = () => useCounterStore.getState().count;

// 在组件外部使用
useCounterStore.getState().increment();
```

---

### 3️⃣ TypeScript 类型系统

#### 接口 vs 类型别名

```typescript
// 接口 - 推荐用于对象形状
interface Recipe {
  id: string;
  title: string;
}

// 类型别名 - 推荐用于联合类型
type Category = 'cakes' | 'cookies' | 'breads';
```

#### 实用类型工具

```typescript
// Partial - 所有属性可选
type PartialRecipe = Partial<Recipe>;

// Pick - 选择部分属性
type RecipePreview = Pick<Recipe, 'id' | 'title'>;

// Omit - 排除部分属性
type RecipeWithoutId = Omit<Recipe, 'id'>;

// Record - 创建映射类型
type RecipeMap = Record<string, Recipe>;
```

---

### 4️⃣ Tailwind CSS 最佳实践

#### 响应式设计

```tsx
<div className="
  w-full          // 默认全宽
  md:w-1/2        // 中等屏幕 50% 宽
  lg:w-1/3        // 大屏幕 33% 宽
">
```

#### 常用组合模式

```tsx
// 卡片容器
<div className="bg-white rounded-xl shadow-md p-6">

// 水平居中的弹性容器
<div className="flex items-center justify-center">

// 带间距的垂直堆叠
<div className="flex flex-col space-y-4">

// 带悬停效果的按钮
<button className="
  px-4 py-2 
  bg-blue-500 text-white 
  rounded-lg
  hover:bg-blue-600 
  transition-colors
">
```

#### 自定义工具类

```css
/* 在 index.css 中定义 */
@layer utilities {
  .scrollbar-hide {
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}

/* 在组件中使用 */
<div className="overflow-x-auto scrollbar-hide">
```

---

### 5️⃣ React Router 路由管理

#### 基础路由配置

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/user/:id" element={<UserPage />} />
  </Routes>
</BrowserRouter>
```

#### 编程式导航

```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');           // 导航到 /about
    navigate('/user/123');         // 带参数导航
    navigate(-1);                  // 后退
    navigate('/home', { replace: true }); // 替换当前历史记录
  };
}
```

#### 获取路由参数

```tsx
import { useParams } from 'react-router-dom';

function UserPage() {
  const { id } = useParams<{ id: string }>();
  
  return <div>User ID: {id}</div>;
}
```

---

## 🔍 关键代码解析

### useAppStore.ts 详解

```typescript
export const useAppStore = create<AppState>((set, get) => ({
  // === 状态 ===
  recipes: mockRecipes,
  selectedCategory: 'all',
  
  // === 简单更新 ===
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  // === 基于当前状态的更新 ===
  toggleFavorite: (recipeId) => {
    set((state) => {
      const isFavorited = state.favoriteRecipes.includes(recipeId);
      return {
        favoriteRecipes: isFavorited
          ? state.favoriteRecipes.filter((id) => id !== recipeId)
          : [...state.favoriteRecipes, recipeId],
      };
    });
  },
  
  // === 派生状态（计算属性）===
  getFilteredRecipes: () => {
    const { recipes, selectedCategory, searchQuery } = get();
    
    // 链式过滤
    return recipes
      .filter(r => selectedCategory === 'all' || r.category === selectedCategory)
      .filter(r => !searchQuery || r.title.includes(searchQuery));
  },
}));
```

**学习要点：**

1. `set()` - 更新状态的唯一方式
2. `set((state) => ({ ... }))` - 基于当前状态更新
3. `get()` - 在 action 中获取当前状态
4. 派生状态使用函数而非直接计算，避免重复计算

---

### RecipeCard.tsx 详解

```tsx
const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className={`
        bg-white rounded-2xl overflow-hidden shadow-sm 
        hover:shadow-md transition-all cursor-pointer
        ${featured ? 'w-64' : 'w-full'}
      `}
    >
      {/* 图片区域 */}
      <div className={`relative ${featured ? 'h-80' : 'h-48'}`}>
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover 
                     hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-500 fill-yellow-500" />
            <span>{recipe.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock />
            <span>{recipe.cookTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**学习要点：**

1. **Props 解构** - `{ recipe, featured = false }` 设置默认值
2. **条件类名** - 使用模板字符串动态拼接
3. **事件处理** - onClick 触发导航
4. **CSS 技巧** - `line-clamp-1` 文本截断，`hover:scale-105` 悬停放大

---

## 🎓 进阶练习

### 练习 1：添加搜索历史功能

在 `useAppStore.ts` 中添加：

```typescript
interface AppState {
  // 现有状态...
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

// 实现
addSearchHistory: (query) => {
  set((state) => ({
    searchHistory: [query, ...state.searchHistory.slice(0, 4)], // 只保留最近5条
  }));
},
```

### 练习 2：添加食谱筛选

添加多条件筛选：

```typescript
interface FilterOptions {
  difficulty?: string;
  maxTime?: number;
  minRating?: number;
}

getFilteredRecipes: (filters?: FilterOptions) => {
  const { recipes } = get();
  
  return recipes.filter((recipe) => {
    if (filters?.difficulty && recipe.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters?.minRating && recipe.rating < filters.minRating) {
      return false;
    }
    return true;
  });
},
```

### 练习 3：添加主题切换

```typescript
interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

toggleTheme: () => {
  set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
  }));
  
  // 更新 HTML class
  const html = document.documentElement;
  html.classList.toggle('dark');
},
```

---

## 🐛 常见问题

### Q1: Zustand 状态不更新？

**原因：** 直接修改了状态对象

```typescript
// ❌ 错误
toggleFavorite: (id) => {
  const state = get();
  state.favoriteRecipes.push(id); // 直接修改
},

// ✅ 正确
toggleFavorite: (id) => {
  set((state) => ({
    favoriteRecipes: [...state.favoriteRecipes, id], // 创建新数组
  }));
},
```

### Q2: Tailwind 样式不生效？

**检查清单：**
1. `tailwind.config.js` 的 `content` 配置是否正确
2. 是否导入了 `index.css`
3. 类名是否拼写错误
4. 是否使用了动态类名（不推荐）

```tsx
// ❌ 不推荐 - Tailwind 无法静态分析
const size = 'large';
<div className={`text-${size}`}> 

// ✅ 推荐
<div className={size === 'large' ? 'text-lg' : 'text-sm'}>
```

### Q3: TypeScript 类型错误？

```typescript
// 常见错误：参数隐式具有 'any' 类型
const handleClick = (e) => { } // ❌

// 解决方案
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { } // ✅
```

---

## 📖 推荐阅读

- [React 官方文档](https://react.dev/)
- [TypeScript 官方手册](https://www.typescriptlang.org/docs/)
- [Zustand 文档](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Router 文档](https://reactrouter.com/)

---

## 💡 学习建议

1. **循序渐进** - 先理解单个组件，再看整体架构
2. **实践为主** - 尝试修改代码，观察效果
3. **阅读源码** - 每个文件都有详细注释
4. **做小改动** - 从修改颜色、文字开始
5. **记录笔记** - 遇到问题和解决方案都记下来

---

祝学习愉快！🎉
