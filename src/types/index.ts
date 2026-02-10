export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: string;
  category: RecipeCategory;
  isFeatured?: boolean;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tags?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  duration?: string;
}

export type RecipeCategory =
  | 'all'
  | 'cakes'
  | 'cookies'
  | 'breads'
  | 'pastries'
  | 'techniques';

export interface Category {
  id: RecipeCategory;
  name: string;
  image?: string;
}

export type FavoriteRecipes = string[];
