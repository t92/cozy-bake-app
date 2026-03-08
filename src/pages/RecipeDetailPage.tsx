import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, ChefHat, Users } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { getDifficultyStars } from '../utils/helpers';

/**
 * RecipeDetailPage 组件
 * 显示单个食谱的详细信息
 * 
 * 包含以下部分：
 * 1. 顶部封面图和返回按钮
 * 2. 食谱标题和描述
 * 3. 快速信息栏（准备时间、烘焙时间、难度、份数）
 * 4. 食材列表
 * 5. 制作步骤
 * 6. 底部操作按钮
 */
const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 从 store 获取食谱数据和收藏功能
  const getRecipeById = useAppStore((state) => state.getRecipeById);
  const isFavorite = useAppStore((state) => state.isFavorite);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  
  // 获取当前食谱
  const recipe = id ? getRecipeById(id) : undefined;

  // 如果食谱不存在，显示错误信息
  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* 封面图区域 */}
      <div className="relative h-96">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

        {/* 顶部控制按钮 */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6">
          {/* 返回按钮 */}
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full 
                       hover:bg-white transition-colors shadow-lg"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </button>

          {/* 收藏按钮 */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full 
                       hover:bg-white transition-colors shadow-lg"
          >
            <Heart
              size={24}
              className={favorited ? 'text-red-500 fill-red-500' : 'text-gray-800'}
            />
          </button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-6 -mt-8 relative">
        {/* 白色圆角容器 */}
        <div className="bg-white rounded-t-3xl pt-10 pb-6">
          {/* 标题和描述 */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {recipe.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {recipe.description}
          </p>

          {/* 快速信息栏 */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {/* 准备时间 */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Prep</p>
                  <p className="font-semibold text-gray-800">{recipe.prepTime}</p>
                </div>
              </div>
            </div>

            {/* 烘焙时间 */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Bake</p>
                  <p className="font-semibold text-gray-800">{recipe.cookTime}</p>
                </div>
              </div>
            </div>

            {/* 难度 */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <ChefHat size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="font-semibold text-gray-800">
                    {getDifficultyStars(recipe.difficulty)} Stars
                  </p>
                </div>
              </div>
            </div>

            {/* 份数 */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <Users size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Serves</p>
                  <p className="font-semibold text-gray-800">{recipe.servings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 食材区域 */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
            </div>
            
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center space-x-3"
                >
                  {/* 复选框样式的小圆点 */}
                  <div className="w-6 h-6 rounded border-2 border-gray-300 flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full m-auto mt-1.5" />
                  </div>
                  <span className="text-gray-700">
                    {ingredient.amount} {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 制作步骤区域 */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold text-gray-800">Preparation</h2>
            </div>

            <div className="space-y-6">
              {recipe.steps.map((step) => (
                <div key={step.id} className="space-y-3">
                  {/* 步骤图片（如果有） */}
                  {step.image && (
                    <div className="relative rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-80 object-cover"
                      />
                      {/* 步骤编号标签 */}
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white 
                                    rounded flex items-center justify-center 
                                    font-bold text-gray-800 shadow-lg">
                        {step.stepNumber}
                      </div>
                    </div>
                  )}

                  {/* 步骤标题 */}
                  <h3 className="text-xl font-bold text-gray-800">
                    {step.title}
                  </h3>
                  
                  {/* 步骤描述 */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="mt-10">
            <button className="w-full py-4 bg-primary text-white rounded-xl 
                             font-semibold text-lg hover:bg-primary-dark 
                             transition-colors shadow-lg">
              Start Cooking Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
