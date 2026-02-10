import { Star, Clock, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';
import { useNavigate } from 'react-router-dom';
import { formatReviewCount } from '../utils/helpers';

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="flex items-center space-x-4 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 truncate">{recipe.title}</h4>
        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-700">{recipe.rating}</span>
            <span className="text-gray-400">({formatReviewCount(recipe.reviewCount)})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={12} className="text-gray-400" />
            <span>{recipe.cookTime}</span>
          </div>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
    </div>
  );
};

export default RecipeListItem;
