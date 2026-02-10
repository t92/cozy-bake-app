import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { categories, trendingTags } from '../data/mockData';
import { Bell } from 'lucide-react';

const ExplorePage = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId: string) => { navigate('/'); };

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Explore</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-600" />
          </button>
        </div>
        <SearchBar placeholder="Find your next bake..." />
      </div>

      <div className="mt-6 px-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">TRENDING</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-primary transition-colors cursor-pointer">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.filter((cat) => cat.id !== 'all').map((category) => (
            <div key={category.id} onClick={() => handleCategoryClick(category.id)} className="relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg text-center">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-6">
        <div onClick={() => handleCategoryClick('techniques')} className="relative h-32 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800" alt="Techniques" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white font-bold text-2xl">Techniques</h3>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Weekend Inspiration</h3>
        <p className="text-sm text-gray-600 mb-4">Master the art of the perfect macaron with our new masterclass series.</p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">Start Learning</button>
      </div>
      <div className="h-8" />
    </div>
  );
};

export default ExplorePage;
