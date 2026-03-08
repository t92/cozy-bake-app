import { Search } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { debounce } from '../utils/helpers';
import { useCallback } from 'react';

/**
 * SearchBar 组件
 * 搜索输入框，用于过滤食谱
 * 
 * 功能：
 * - 输入搜索关键词
 * - 使用防抖优化性能
 * - 实时更新搜索结果
 * 
 * @param placeholder - 输入框占位文字
 */
interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = 'Search for your next bake...' }: SearchBarProps) => {
  // 从 store 获取搜索状态和方法
  const { searchQuery, setSearchQuery } = useAppStore();

  /**
   * 防抖的搜索函数
   * 用户停止输入 300ms 后才执行搜索，避免频繁更新
   */
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  /**
   * 处理输入变化
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* 搜索输入框容器 */}
      <div className="relative flex-1">
        {/* 搜索图标 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>

        {/* 输入框 */}
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={searchQuery}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl
                     text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white
                     transition-all border border-transparent focus:border-primary/20"
        />
      </div>

      {/* 搜索按钮 */}
      <button
        type="button"
        className="px-4 py-3 bg-primary text-white rounded-xl
                   hover:bg-primary-dark transition-colors
                   flex items-center justify-center shadow-sm"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
