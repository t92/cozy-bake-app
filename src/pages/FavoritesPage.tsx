import { Heart } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import RecipeCard from '../components/RecipeCard';

const FavoritesPage = () => {
  const favoriteRecipes = useAppStore((state) => state.favoriteRecipes);
  const recipes = useAppStore((state) => state.recipes);
  const favoriteRecipesList = recipes.filter((recipe) => favoriteRecipes.includes(recipe.id));

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <p className="text-sm text-gray-500 mt-1">{favoriteRecipesList.length} recipe{favoriteRecipesList.length !== 1 ? 's' : ''} saved</p>
      </div>
      <div className="px-6 mt-6">
        {favoriteRecipesList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Heart size={40} className="text-gray-400" /></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
            <p className="text-gray-500 text-center max-w-xs">Start exploring and save your favorite recipes to find them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">{favoriteRecipesList.map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe} />))}</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
