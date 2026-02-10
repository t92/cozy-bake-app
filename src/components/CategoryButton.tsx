import { RecipeCategory } from '../types';
import { useAppStore } from '../stores/useAppStore';

interface CategoryButtonProps {
  category: RecipeCategory;
  label: string;
}

const CategoryButton = ({ category, label }: CategoryButtonProps) => {
  const { selectedCategory, setSelectedCategory } = useAppStore();
  const isActive = selectedCategory === category;

  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border-2 ${isActive ? 'bg-primary text-white shadow-lg border-primary scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
