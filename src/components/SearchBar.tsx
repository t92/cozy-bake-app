import { Search } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { debounce } from '../utils/helpers';
import { useCallback } from 'react';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = 'Search for your next bake...' }: SearchBarProps) => {
  const { searchQuery, setSearchQuery } = useAppStore();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={searchQuery}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all border border-transparent focus:border-primary/20"
        />
      </div>
      <button type="button" className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center shadow-sm" aria-label="Search">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
