import { Heart } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import RecipeCard from '../components/RecipeCard';

/**
 * FavoritesPage 组件
 * 显示用户收藏的所有食谱
 * 
 * 功能：
 * - 显示收藏的食谱网格
 * - 空状态提示
 */
const FavoritesPage = () => {
  // 从 store 获取收藏列表和食谱数据
  const favoriteRecipes = useAppStore((state) => state.favoriteRecipes);
  const recipes = useAppStore((state) => state.recipes);

  // 根据收藏 ID 列表获取完整的食谱对象
  const favoriteRecipesList = recipes.filter((recipe) =>
    favoriteRecipes.includes(recipe.id)
  );

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      {/* 顶部栏 */}
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <p className="text-sm text-gray-500 mt-1">
          {favoriteRecipesList.length} recipe{favoriteRecipesList.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {/* 内容区域 */}
      <div className="px-6 mt-6">
        {favoriteRecipesList.length === 0 ? (
          // 空状态
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 text-center max-w-xs">
              Start exploring and save your favorite recipes to find them here
            </p>
          </div>
        ) : (
          // 收藏食谱网格
          <div className="grid grid-cols-1 gap-4">
            {favoriteRecipesList.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
