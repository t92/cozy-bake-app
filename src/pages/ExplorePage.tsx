import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { categories, trendingTags } from '../data/mockData';
import { Bell } from 'lucide-react';
import { RecipeCategory } from '../types';
import { useAppStore } from '../stores/useAppStore';

/**
 * ExplorePage 组件
 * 探索和浏览分类页面
 * 
 * 包含以下部分：
 * 1. 顶部栏和搜索
 * 2. 热门标签
 * 3. 分类网格展示
 * 4. 底部灵感卡片
 */
const ExplorePage = () => {
  const navigate = useNavigate();
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  /**
   * 处理分类点击
   * 跳转到对应分类的食谱列表
   */
  const handleCategoryClick = (categoryId: RecipeCategory) => {
    // 复用首页已有的分类筛选逻辑，避免跳转到不存在的路由
    setSelectedCategory(categoryId);
    navigate('/');
  };

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      {/* 顶部栏 */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Explore</h1>
          
          {/* 通知按钮 */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-600" />
          </button>
        </div>

        {/* 搜索栏 */}
        <SearchBar placeholder="Find your next bake..." />
      </div>

      {/* 热门标签 */}
      <div className="mt-6 px-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">TRENDING</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white rounded-full text-sm text-gray-700
                         border border-gray-200 hover:border-primary
                         transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 分类网格 */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 过滤掉 'all' 分类，只显示具体分类 */}
          {categories
            .filter((cat) => cat.id !== 'all')
            .map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="relative h-48 rounded-2xl overflow-hidden cursor-pointer
                           shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 分类图片 */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* 分类名称 */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* "Techniques" 特殊展示 */}
      <div className="mt-6 px-6">
        <div
          onClick={() => handleCategoryClick('techniques')}
          className="relative h-32 rounded-2xl overflow-hidden cursor-pointer
                     shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
            alt="Techniques"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white font-bold text-2xl">Techniques</h3>
          </div>
        </div>
      </div>

      {/* 周末灵感卡片 */}
      <div className="mt-8 mx-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Weekend Inspiration
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Master the art of the perfect macaron with our new masterclass series.
        </p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg 
                         hover:bg-primary-dark transition-colors font-medium">
          Start Learning
        </button>
      </div>

      {/* 底部留白 */}
      <div className="h-8" />
    </div>
  );
};

export default ExplorePage;
