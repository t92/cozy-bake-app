# 🧁 Cozy Bake - 温馨烘焙应用

一个基于 React + TypeScript + Zustand + Tailwind CSS 构建的移动端烘焙食谱应用。

## 📋 项目简介

Cozy Bake 是一个精美的移动端食谱应用，专为烘焙爱好者设计。用户可以浏览精选食谱、搜索喜爱的烘焙配方、查看详细的制作步骤，并收藏最喜欢的食谱。

## ✨ 主要功能

- **首页展示** - 精选食谱横向滚动、分类快速切换、最近更新列表
- **探索页面** - 分类网格浏览、热门标签筛选、灵感推荐
- **食谱详情** - 完整食材列表、分步骤制作指南、图文并茂
- **收藏功能** - 一键收藏喜爱的食谱，方便后续查找
- **搜索功能** - 实时搜索食谱，支持标题、描述、标签匹配
- **响应式设计** - 针对移动端优化的界面体验

## 🛠 技术栈

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Zustand** - 轻量级状态管理库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React Router** - 客户端路由管理
- **Vite** - 快速的前端构建工具
- **Lucide React** - 精美的图标库

## 📁 项目结构

```
cozy-bake-app/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── BottomNav.tsx       # 底部导航栏
│   │   ├── SearchBar.tsx       # 搜索输入框
│   │   ├── RecipeCard.tsx      # 食谱卡片
│   │   ├── RecipeListItem.tsx  # 食谱列表项
│   │   └── CategoryButton.tsx  # 分类按钮
│   ├── pages/               # 页面组件
│   │   ├── HomePage.tsx        # 首页
│   │   ├── ExplorePage.tsx     # 探索页
│   │   ├── RecipeDetailPage.tsx # 食谱详情页
│   │   ├── FavoritesPage.tsx   # 收藏页
│   │   └── SettingsPage.tsx    # 设置页
│   ├── stores/              # Zustand 状态管理
│   │   └── useAppStore.ts      # 应用主 Store
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts            # 全局类型
│   ├── data/                # 模拟数据
│   │   └── mockData.ts         # 食谱数据
│   ├── utils/               # 工具函数
│   │   └── helpers.ts          # 辅助函数
│   ├── App.tsx              # 应用根组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── public/                  # 静态资源
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts           # Vite 配置
└── README.md                # 项目文档
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

应用将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

构建文件将输出到 `dist/` 目录。

### 4. 预览生产版本

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 🎨 设计特点

- **温馨配色** - 采用温暖的金棕色主题，营造舒适的烘焙氛围
- **卡片式布局** - 使用圆角卡片展示内容，现代简洁
- **流畅动画** - 细腻的过渡效果和交互反馈
- **移动优先** - 专为移动设备设计，最大宽度 448px
- **图文并茂** - 高质量食谱图片配合详细步骤说明

## 📚 学习要点

### 1. Zustand 状态管理

```typescript
// 创建 Store
export const useAppStore = create<AppState>((set, get) => ({
  recipes: mockRecipes,
  favoriteRecipes: [],
  
  toggleFavorite: (recipeId) => {
    set((state) => ({
      favoriteRecipes: state.favoriteRecipes.includes(recipeId)
        ? state.favoriteRecipes.filter((id) => id !== recipeId)
        : [...state.favoriteRecipes, recipeId],
    }));
  },
}));

// 在组件中使用
const { recipes, toggleFavorite } = useAppStore();
```

### 2. TypeScript 类型定义

```typescript
// 定义接口
interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

// 使用类型
const recipe: Recipe = { ... };
```

### 3. Tailwind CSS 实用类

```tsx
// 组合多个工具类
<div className="flex items-center space-x-4 p-4 bg-white rounded-xl">
  ...
</div>

// 响应式设计
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  ...
</div>

// 条件类名
<button className={`${isActive ? 'bg-primary' : 'bg-gray-100'}`}>
  ...
</button>
```

### 4. React Router 路由

```tsx
// 定义路由
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/recipe/:id" element={<RecipeDetailPage />} />
</Routes>

// 编程式导航
const navigate = useNavigate();
navigate('/recipe/1');

// 获取路由参数
const { id } = useParams<{ id: string }>();
```

## 🔧 自定义配置

### 修改主题色

编辑 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#D4A574', // 修改为你喜欢的颜色
        light: '#E5C4A0',
        dark: '#B88A5E',
      },
    },
  },
}
```

### 添加新食谱

编辑 `src/data/mockData.ts`：

```typescript
export const mockRecipes: Recipe[] = [
  {
    id: '7',
    title: '你的新食谱',
    description: '食谱描述',
    // ... 其他属性
  },
  // ... 现有食谱
];
```

## 📝 待改进功能

- [ ] 添加用户认证系统
- [ ] 接入真实后端 API
- [ ] 添加食谱评论功能
- [ ] 支持深色模式
- [ ] 添加食谱分享功能
- [ ] 支持多语言
- [ ] 添加烹饪计时器
- [ ] 支持离线访问（PWA）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Happy Baking! 🧁**
