import { RecipeCategory } from '../types';
import { useAppStore } from '../stores/useAppStore';

/**
 * CategoryButton 组件
 * 用于切换食谱分类的按钮
 * 
 * 功能：
 * - 显示分类名称
 * - 高亮当前选中的分类
 * - 点击切换分类
 * 
 * @param category - 分类 ID
 * @param label - 分类显示名称
 */
interface CategoryButtonProps {
  category: RecipeCategory;
  label: string;
}

const CategoryButton = ({ category, label }: CategoryButtonProps) => {
  // 从 store 获取当前选中的分类和切换方法
  const { selectedCategory, setSelectedCategory } = useAppStore();
  
  // 判断是否为当前选中的分类
  const isActive = selectedCategory === category;

  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`
        px-5 py-2.5 rounded-full text-sm font-semibold
        transition-all whitespace-nowrap border-2
        ${
          isActive
            ? 'bg-primary text-white shadow-lg border-primary scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
        }
      `}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
