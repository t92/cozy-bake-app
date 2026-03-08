import { Bell } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';
import CategoryButton from '../components/CategoryButton';
import { useAppStore } from '../stores/useAppStore';

/**
 * HomePage 组件
 * 应用的主页面
 * 
 * 包含以下部分：
 * 1. 顶部栏 - 欢迎语和通知按钮
 * 2. 搜索栏
 * 3. 精选食谱横向滚动区
 * 4. 分类选择按钮
 * 5. 最近更新列表
 */
const HomePage = () => {
  // 从 store 获取食谱数据
  const recipes = useAppStore((state) => state.recipes);

  // 获取精选食谱（标记为 featured 的食谱）
  const featuredRecipes = recipes.filter((r) => r.isFeatured);

  // 获取最近更新的食谱（排除已在精选中显示的，取前 3 个）
  const featuredIds = new Set(featuredRecipes.map((r) => r.id));
  const recentRecipes = recipes
    .filter((r) => !featuredIds.has(r.id))
    .slice(0, 3);

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      {/* 顶部栏 */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          {/* 欢迎语 */}
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="text-2xl font-bold text-gray-800">Cozy Bake</h1>
          </div>

          {/* 通知按钮 */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-600" />
          </button>
        </div>

        {/* 搜索栏 */}
        <SearchBar />
      </div>

      {/* 精选食谱区域 */}
      <div className="mt-6">
        <div className="px-6 mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Featured Recipes</h2>
          <button className="text-sm text-primary font-medium">View all</button>
        </div>

        {/* 横向滚动的食谱卡片 */}
        <div className="flex space-x-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} featured />
          ))}
        </div>
      </div>

      {/* 分类区域 */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        
        {/* 横向滚动的分类按钮 */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryButton category="all" label="All Bakes" />
          <CategoryButton category="cakes" label="Cakes" />
          <CategoryButton category="cookies" label="Cookies" />
          <CategoryButton category="breads" label="Breads" />
        </div>
      </div>

      {/* 最近更新区域 */}
      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Updates</h2>
        
        {/* 食谱列表 */}
        <div className="space-y-3">
          {recentRecipes.map((recipe) => (
            <RecipeListItem
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      </div>

      {/* 底部留白，避免被底部导航栏遮挡 */}
      <div className="h-8" />
    </div>
  );
};

export default HomePage;
