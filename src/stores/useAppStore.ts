import { create } from 'zustand';
import { Recipe, RecipeCategory, FavoriteRecipes } from '../types';
import { mockRecipes } from '../data/mockData';

/**
 * 应用状态接口定义
 * 定义了整个应用的全局状态结构
 */
interface AppState {
  // ===== 状态数据 =====
  recipes: Recipe[];                    // 所有食谱列表
  favoriteRecipes: FavoriteRecipes;     // 用户收藏的食谱 ID 列表
  selectedCategory: RecipeCategory;      // 当前选中的分类
  searchQuery: string;                   // 搜索关键词

  // ===== 操作方法 =====
  // 设置食谱列表
  setRecipes: (recipes: Recipe[]) => void;
  
  // 切换收藏状态（添加或移除）
  toggleFavorite: (recipeId: string) => void;
  
  // 检查某个食谱是否已收藏
  isFavorite: (recipeId: string) => boolean;
  
  // 设置当前选中的分类
  setSelectedCategory: (category: RecipeCategory) => void;
  
  // 设置搜索关键词
  setSearchQuery: (query: string) => void;
  
  // 获取过滤后的食谱列表（根据分类和搜索关键词）
  getFilteredRecipes: () => Recipe[];
  
  // 根据 ID 获取单个食谱
  getRecipeById: (id: string) => Recipe | undefined;
}

/**
 * 创建 Zustand Store
 * 这是应用的主要状态管理中心
 */
export const useAppStore = create<AppState>((set, get) => ({
  // ===== 初始状态 =====
  recipes: mockRecipes,                 // 初始化食谱列表
  favoriteRecipes: [],                  // 初始收藏列表为空
  selectedCategory: 'all',              // 默认显示所有分类
  searchQuery: '',                      // 默认搜索词为空

  // ===== 设置食谱列表 =====
  setRecipes: (recipes) => {
    set({ recipes });
  },

  // ===== 切换收藏状态 =====
  /**
   * 如果食谱已收藏，则移除收藏
   * 如果食谱未收藏，则添加到收藏
   */
  toggleFavorite: (recipeId) => {
    set((state) => {
      const isFavorited = state.favoriteRecipes.includes(recipeId);
      
      return {
        favoriteRecipes: isFavorited
          ? state.favoriteRecipes.filter((id) => id !== recipeId) // 移除收藏
          : [...state.favoriteRecipes, recipeId],                 // 添加收藏
      };
    });
  },

  // ===== 检查是否已收藏 =====
  isFavorite: (recipeId) => {
    return get().favoriteRecipes.includes(recipeId);
  },

  // ===== 设置选中的分类 =====
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  // ===== 设置搜索关键词 =====
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // ===== 获取过滤后的食谱列表 =====
  /**
   * 根据当前选中的分类和搜索关键词过滤食谱
   * 1. 先根据分类过滤
   * 2. 再根据搜索关键词过滤（匹配标题或描述）
   */
  getFilteredRecipes: () => {
    const { recipes, selectedCategory, searchQuery } = get();
    
    let filtered = recipes;
    
    // 按分类过滤（如果不是 'all'）
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
    }
    
    // 按搜索关键词过滤
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

  // ===== 根据 ID 获取食谱 =====
  getRecipeById: (id) => {
    return get().recipes.find((recipe) => recipe.id === id);
  },
}));
