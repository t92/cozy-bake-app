import { Bell } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeListItem from '../components/RecipeListItem';
import CategoryButton from '../components/CategoryButton';
import { useAppStore } from '../stores/useAppStore';

const HomePage = () => {
  const recipes = useAppStore((state) => state.recipes);
  const featuredRecipes = recipes.filter((r) => r.isFeatured);
  const featuredIds = new Set(featuredRecipes.map((r) => r.id));
  const recentRecipes = recipes.filter((r) => !featuredIds.has(r.id)).slice(0, 3);

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="text-2xl font-bold text-gray-800">Cozy Bake</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-600" />
          </button>
        </div>
        <SearchBar />
      </div>

      <div className="mt-6">
        <div className="px-6 mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Featured Recipes</h2>
          <button className="text-sm text-primary font-medium">View all</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} featured />
          ))}
        </div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryButton category="all" label="All Bakes" />
          <CategoryButton category="cakes" label="Cakes" />
          <CategoryButton category="cookies" label="Cookies" />
          <CategoryButton category="breads" label="Breads" />
        </div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Updates</h2>
        <div className="space-y-3">
          {recentRecipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
};

export default HomePage;
