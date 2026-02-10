import { Home, Search, Heart, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Categories', path: '/explore' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

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
                <Icon size={24} className={`transition-colors ${active ? 'text-primary' : 'text-gray-400'}`} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-xs transition-colors ${active ? 'text-primary font-medium' : 'text-gray-500'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
