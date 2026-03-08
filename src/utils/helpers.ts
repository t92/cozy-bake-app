/**
 * 工具函数集合
 * 包含应用中常用的辅助函数
 */

/**
 * 将评论数格式化为更易读的形式
 * @param count - 评论数量
 * @returns 格式化后的字符串（例如：1.2k, 850）
 */
export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

/**
 * 根据难度返回对应的星级数
 * @param difficulty - 难度等级
 * @returns 星级数（1-3）
 */
export const getDifficultyStars = (difficulty: string): number => {
  const difficultyMap: Record<string, number> = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };
  return difficultyMap[difficulty] || 2;
};

/**
 * 类名合并工具
 * 用于条件性地合并 Tailwind CSS 类名
 * @param classes - 类名数组
 * @returns 合并后的类名字符串
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 防抖函数
 * 延迟执行函数，直到停止调用一定时间后才执行
 * @param func - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * 滚动到页面顶部
 * @param smooth - 是否使用平滑滚动
 */
export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};
