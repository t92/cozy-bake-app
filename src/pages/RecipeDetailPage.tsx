import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, ChefHat, Users } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { getDifficultyStars } from '../utils/helpers';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getRecipeById = useAppStore((state) => state.getRecipeById);
  const isFavorite = useAppStore((state) => state.isFavorite);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const recipe = id ? getRecipeById(id) : undefined;

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe not found</h2>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">Go back to home</button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(recipe.id);

  return (
    <div className="pb-24 bg-white min-h-screen">
      <div className="relative h-96">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6">
          <button onClick={() => navigate(-1)} className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          <button onClick={() => toggleFavorite(recipe.id)} className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
            <Heart size={24} className={favorited ? 'text-red-500 fill-red-500' : 'text-gray-800'} />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-8 relative">
        <div className="bg-white rounded-t-3xl pt-10 pb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{recipe.title}</h1>
          <p className="text-gray-600 leading-relaxed">{recipe.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex items-center space-x-3"><Clock size={20} className="text-primary" /><div><p className="text-xs text-gray-500">Prep</p><p className="font-semibold text-gray-800">{recipe.prepTime}</p></div></div></div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex items-center space-x-3"><Clock size={20} className="text-primary" /><div><p className="text-xs text-gray-500">Bake</p><p className="font-semibold text-gray-800">{recipe.cookTime}</p></div></div></div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex items-center space-x-3"><ChefHat size={20} className="text-primary" /><div><p className="text-xs text-gray-500">Level</p><p className="font-semibold text-gray-800">{getDifficultyStars(recipe.difficulty)} Stars</p></div></div></div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200"><div className="flex items-center space-x-3"><Users size={20} className="text-primary" /><div><p className="text-xs text-gray-500">Serves</p><p className="font-semibold text-gray-800">{recipe.servings}</p></div></div></div>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4"><div className="w-1.5 h-6 bg-primary rounded-full" /><h2 className="text-2xl font-bold text-gray-800">Ingredients</h2></div>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded border-2 border-gray-300 flex-shrink-0"><div className="w-2 h-2 bg-gray-400 rounded-full m-auto mt-1.5" /></div>
                  <span className="text-gray-700">{ingredient.amount} {ingredient.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4"><div className="w-1.5 h-6 bg-primary rounded-full" /><h2 className="text-2xl font-bold text-gray-800">Preparation</h2></div>
            <div className="space-y-6">
              {recipe.steps.map((step) => (
                <div key={step.id} className="space-y-3">
                  {step.image && (
                    <div className="relative rounded-2xl overflow-hidden shadow-md">
                      <img src={step.image} alt={step.title} className="w-full h-80 object-cover" />
                      <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded flex items-center justify-center font-bold text-gray-800 shadow-lg">{step.stepNumber}</div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <button className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg">Start Cooking Timer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
