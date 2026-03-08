import { Star, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { formatReviewCount } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

/**
 * RecipeCard 组件
 * 用于展示单个食谱的卡片
 * 
 * 功能：
 * - 显示食谱封面图
 * - 显示食谱标题
 * - 显示评分和烹饪时间
 * - 点击跳转到详情页
 * 
 * @param recipe - 食谱数据
 * @param featured - 是否为精选样式（更大的卡片）
 */
interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  const navigate = useNavigate();

  /**
   * 点击卡片跳转到食谱详情页
   */
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md
        transition-all cursor-pointer
        ${featured ? 'w-64' : 'w-full'}
      `}
    >
      {/* 食谱图片 */}
      <div className={`relative ${featured ? 'h-80' : 'h-48'} overflow-hidden`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* 图片上的渐变遮罩（仅在精选模式下显示） */}
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        )}
      </div>

      {/* 食谱信息 */}
      <div className="p-4">
        {/* 标题 */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        {/* 评分和时间信息 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* 评分 */}
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{recipe.rating}</span>
            <span className="text-gray-400">
              ({formatReviewCount(recipe.reviewCount)})
            </span>
          </div>

          {/* 烹饪时间 */}
          <div className="flex items-center space-x-1">
            <Clock size={14} className="text-gray-400" />
            <span>{recipe.cookTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
