import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import AiChatPage from './pages/AiChatPage';

/**
 * AppRoutes 组件
 * 应用主体（路由 + 底部导航）
 */
function AppRoutes() {
  const location = useLocation();
  const hideBottomNav = location.pathname === '/ai-chat';

  return (
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

        {/* AI 聊天页面 */}
        <Route path="/ai-chat" element={<AiChatPage />} />
      </Routes>

      {/* 底部导航栏 */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

/**
 * App 组件
 * 应用的根组件
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
