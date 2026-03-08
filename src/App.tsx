import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';

/**
 * App 组件
 * 应用的根组件
 * 
 * 功能：
 * - 设置路由
 * - 渲染底部导航栏
 * - 管理页面切换
 */
function App() {
  return (
    <BrowserRouter>
      {/* 最大宽度容器，模拟移动端界面 */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* 路由配置 */}
        <Routes>
          {/* 首页 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 探索页面 */}
          <Route path="/explore" element={<ExplorePage />} />
          
          {/* 食谱详情页 */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          
          {/* 收藏页面 */}
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* 设置页面 */}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

        {/* 底部导航栏 */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
