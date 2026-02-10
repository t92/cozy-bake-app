import { create } from 'zustand';
import { Recipe, RecipeCategory, FavoriteRecipes } from '../types';
import { mockRecipes } from '../data/mockData';

interface AppState {
  recipes: Recipe[];
  favoriteRecipes: FavoriteRecipes;
  selectedCategory: RecipeCategory;
  searchQuery: string;
  setRecipes: (recipes: Recipe[]) => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  setSelectedCategory: (category: RecipeCategory) => void;
  setSearchQuery: (query: string) => void;
  getFilteredRecipes: () => Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  recipes: mockRecipes,
  favoriteRecipes: [],
  selectedCategory: 'all',
  searchQuery: '',

  setRecipes: (recipes) => {
    set({ recipes });
  },

  toggleFavorite: (recipeId) => {
    set((state) => {
      const isFavorited = state.favoriteRecipes.includes(recipeId);
      return {
        favoriteRecipes: isFavorited
          ? state.favoriteRecipes.filter((id) => id !== recipeId)
          : [...state.favoriteRecipes, recipeId],
      };
    });
  },

  isFavorite: (recipeId) => {
    return get().favoriteRecipes.includes(recipeId);
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  getFilteredRecipes: () => {
    const { recipes, selectedCategory, searchQuery } = get();
    let filtered = recipes;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return filtered;
  },

  getRecipeById: (id) => {
    return get().recipes.find((recipe) => recipe.id === id);
  },
}));
