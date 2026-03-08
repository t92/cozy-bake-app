/**
 * 食谱类型定义
 * 包含食谱的所有基本信息
 */
export interface Recipe {
  id: string;              // 食谱唯一标识符
  title: string;           // 食谱标题
  description: string;     // 食谱描述
  image: string;           // 食谱封面图片 URL
  rating: number;          // 评分（1-5）
  reviewCount: number;     // 评论数量
  prepTime: string;        // 准备时间（例如：20m）
  cookTime: string;        // 烘焙时间（例如：40m）
  difficulty: 'Easy' | 'Medium' | 'Hard'; // 难度等级
  servings: string;        // 份数（例如：6 Slices）
  category: RecipeCategory; // 食谱类别
  isFeatured?: boolean;    // 是否为精选食谱
  ingredients: Ingredient[]; // 食材列表
  steps: RecipeStep[];     // 制作步骤
  tags?: string[];         // 标签（例如：#GlutenFree）
}

/**
 * 食材类型定义
 */
export interface Ingredient {
  id: string;              // 食材唯一标识符
  name: string;            // 食材名称
  amount: string;          // 用量（例如：150g）
}

/**
 * 制作步骤类型定义
 */
export interface RecipeStep {
  id: string;              // 步骤唯一标识符
  stepNumber: number;      // 步骤序号
  title: string;           // 步骤标题
  description: string;     // 步骤描述
  image?: string;          // 步骤图片（可选）
  duration?: string;       // 该步骤所需时间（可选）
}

/**
 * 食谱分类枚举
 */
export type RecipeCategory = 
  | 'all'        // 全部
  | 'cakes'      // 蛋糕
  | 'cookies'    // 饼干
  | 'breads'     // 面包
  | 'pastries'   // 糕点
  | 'techniques'; // 技巧

/**
 * 分类信息类型
 */
export interface Category {
  id: RecipeCategory;      // 分类 ID
  name: string;            // 分类名称
  image?: string;          // 分类图片（用于网格展示）
}

/**
 * 用户收藏的食谱 ID 列表类型
 */
export type FavoriteRecipes = string[];
