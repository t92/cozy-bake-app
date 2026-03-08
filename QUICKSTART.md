# 🚀 快速启动指南

## 📋 前置要求

在开始之前，请确保你的系统已安装：

- **Node.js** (版本 >= 16.0)
- **npm** (版本 >= 7.0) 或 **yarn** 或 **pnpm**
- **Git** (可选，用于版本控制)

检查安装：
```bash
node --version   # 应该显示 v16.x.x 或更高
npm --version    # 应该显示 7.x.x 或更高
```

---

## ⚡ 5 分钟快速上手

### 1️⃣ 进入项目目录

```bash
cd ~/workspace/cozy-bake-app
```

### 2️⃣ 安装依赖

选择你喜欢的包管理器：

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

**预计时间：** 2-3 分钟

### 3️⃣ 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

### 4️⃣ 打开浏览器

看到以下输出后：

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

在浏览器中访问：**http://localhost:3000**

🎉 **恭喜！** 应用已经运行起来了！

---

## 🎯 第一次使用指南

### 界面概览

启动后你会看到：

1. **顶部** - 欢迎语 "Welcome back, Cozy Bake" + 通知按钮
2. **搜索栏** - 搜索食谱的输入框
3. **精选食谱** - 横向滚动的大卡片
4. **分类按钮** - All Bakes、Cakes、Cookies、Breads
5. **最近更新** - 食谱列表
6. **底部导航** - Home、Categories、Favorites、Settings

### 试试这些操作

#### ✅ 浏览食谱
- 横向滑动查看精选食谱
- 点击任意食谱卡片查看详情

#### ✅ 搜索功能
- 在搜索框输入 "chocolate"
- 实时看到搜索结果

#### ✅ 分类筛选
- 点击 "Cakes" 按钮
- 页面显示所有蛋糕食谱

#### ✅ 收藏功能
- 进入任意食谱详情页
- 点击右上角的心形按钮
- 点击底部导航的 "Favorites" 查看收藏

#### ✅ 探索页面
- 点击底部导航的 "Categories"
- 浏览分类网格
- 查看热门标签

---

## 📝 常用命令

```bash
# 启动开发服务器（带热重载）
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# TypeScript 类型检查
npx tsc --noEmit
```

---

## 🔧 自定义配置

### 修改端口

编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,  // 改为你想要的端口
  },
})
```

### 修改主题色

编辑 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#D4A574',  // 改为你喜欢的颜色
      },
    },
  },
}
```

保存后，页面会自动刷新！

---

## 🐛 遇到问题？

### 问题 1：端口被占用

**错误信息：**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解决方案：**
```bash
# 方案 1: 杀掉占用端口的进程
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 方案 2: 使用不同端口
# 修改 vite.config.ts 中的 port
```

### 问题 2：依赖安装失败

**解决方案：**
```bash
# 清理缓存
npm cache clean --force
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 3：TypeScript 报错

**解决方案：**
```bash
# 重启 TypeScript 服务器
# 在 VS Code 中：Ctrl/Cmd + Shift + P
# 输入：TypeScript: Restart TS Server
```

### 问题 4：样式不生效

**检查清单：**
- [ ] 是否导入了 `index.css`
- [ ] `tailwind.config.js` 的 `content` 路径是否正确
- [ ] 浏览器是否缓存了旧样式（尝试强制刷新 Ctrl+Shift+R）

---

## 📚 下一步学习

### 1. 查看完整文档
- 📖 [README.md](./README.md) - 项目介绍
- 🎓 [LEARNING_GUIDE.md](./LEARNING_GUIDE.md) - 深度学习指南
- 🏗️ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - 项目结构

### 2. 修改代码

从简单的开始：

#### 🔹 修改文字
`src/pages/HomePage.tsx`
```tsx
<h1 className="text-2xl font-bold text-gray-800">
  Cozy Bake  {/* 改成你的名字 */}
</h1>
```

#### 🔹 修改颜色
`tailwind.config.js`
```javascript
colors: {
  primary: {
    DEFAULT: '#FF6B6B',  // 试试红色
  },
}
```

#### 🔹 添加新食谱
`src/data/mockData.ts`
```typescript
{
  id: '7',
  title: '我的特制蛋糕',
  description: '这是我最喜欢的配方',
  // ... 其他属性
}
```

### 3. 尝试练习

在学习指南中有 3 个进阶练习：
- 练习 1：添加搜索历史
- 练习 2：多条件筛选
- 练习 3：主题切换

---

## 💡 开发技巧

### VS Code 推荐扩展

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "styled-components.vscode-styled-components"
  ]
}
```

### 快捷键

- `Ctrl/Cmd + S` - 保存（触发热重载）
- `Ctrl/Cmd + Shift + P` - 命令面板
- `Ctrl/Cmd + ~` - 打开终端
- `Alt + Shift + F` - 格式化代码

### 浏览器开发者工具

- `F12` 或 `Ctrl/Cmd + Shift + I` - 打开开发者工具
- `Ctrl/Cmd + Shift + M` - 切换设备模拟器（测试移动端）

---

## 🎓 学习路径建议

### 初学者
1. 运行项目，熟悉界面
2. 阅读 `README.md`
3. 修改简单的文字和颜色
4. 查看 React DevTools
5. 尝试添加新食谱

### 进阶
1. 阅读 `LEARNING_GUIDE.md`
2. 理解 Zustand 状态管理
3. 学习 TypeScript 类型
4. 完成练习题
5. 尝试添加新功能

### 高级
1. 阅读 `PROJECT_STRUCTURE.md`
2. 集成真实后端 API
3. 添加用户认证
4. 实现 PWA
5. 优化性能

---

## 📞 获取帮助

- 📖 查看文档：[README.md](./README.md)
- 🎓 学习指南：[LEARNING_GUIDE.md](./LEARNING_GUIDE.md)
- 🏗️ 项目结构：[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

**准备好了吗？开始你的烘焙应用之旅！** 🎉

```bash
npm run dev
```
