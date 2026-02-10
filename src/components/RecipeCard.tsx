import { Star, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { formatReviewCount } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${featured ? 'w-64' : 'w-full'}`}
    >
      <div className={`relative ${featured ? 'h-80' : 'h-48'} overflow-hidden`}>
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        {featured && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{recipe.rating}</span>
            <span className="text-gray-400">({formatReviewCount(recipe.reviewCount)})</span>
          </div>
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
