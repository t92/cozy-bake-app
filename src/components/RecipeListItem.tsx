import { Star, Clock, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';
import { useNavigate } from 'react-router-dom';
import { formatReviewCount } from '../utils/helpers';

/**
 * RecipeListItem 组件
 * 用于在列表中展示食谱的简洁项
 *
 * 功能：
 * - 显示缩略图
 * - 显示标题、评分和烹饪时间
 * - 显示右侧箭头
 * - 点击跳转到详情
 *
 * @param recipe - 食谱数据
 */
interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="flex items-center space-x-4 p-4 bg-white rounded-xl
                 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      {/* 缩略图 */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />

      {/* 文字信息 */}
      <div className="flex-1 min-w-0">
        {/* 标题 */}
        <h4 className="font-medium text-gray-800 truncate">
          {recipe.title}
        </h4>

        {/* 评分和时间 */}
        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
          {/* 评分 */}
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-700">{recipe.rating}</span>
            <span className="text-gray-400">({formatReviewCount(recipe.reviewCount)})</span>
          </div>

          {/* 烹饪时间 */}
          <div className="flex items-center space-x-1">
            <Clock size={12} className="text-gray-400" />
            <span>{recipe.cookTime}</span>
          </div>
        </div>
      </div>

      {/* 右侧箭头 */}
      <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
    </div>
  );
};

export default RecipeListItem;
