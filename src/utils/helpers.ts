export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getDifficultyStars = (difficulty: string): number => {
  const difficultyMap: Record<string, number> = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };
  return difficultyMap[difficulty] || 2;
};

export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};
