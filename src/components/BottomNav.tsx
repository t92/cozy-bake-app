import { Home, Search, Heart, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * BottomNav 组件
 * 移动端底部导航栏，包含四个主要导航选项
 * 
 * 功能：
 * - 显示四个导航图标（首页、分类、收藏、设置）
 * - 高亮当前活动页面
 * - 点击图标切换页面
 */
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 导航项配置
   * 每个导航项包含：图标、标签、路径
   */
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
    },
    {
      icon: Search,
      label: 'Categories',
      path: '/explore',
    },
    {
      icon: Heart,
      label: 'Favorites',
      path: '/favorites',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
    },
  ];

  /**
   * 检查当前路径是否为活动状态
   */
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center space-y-1 min-w-0 flex-1"
              >
                {/* 图标 */}
                <Icon
                  size={24}
                  className={`transition-colors ${
                    active ? 'text-primary' : 'text-gray-400'
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                
                {/* 标签文字 */}
                <span
                  className={`text-xs transition-colors ${
                    active ? 'text-primary font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
