/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 自定义颜色主题 - 基于设计稿的暖色调
      colors: {
        primary: {
          DEFAULT: '#D4A574', // 主色调 - 温暖的金棕色
          light: '#E5C4A0',
          dark: '#B88A5E',
        },
        secondary: {
          DEFAULT: '#F5F1ED', // 次要背景色 - 米白色
          light: '#FDFCFB',
          dark: '#E8E3DD',
        },
        accent: {
          DEFAULT: '#C89968', // 强调色 - 深金色
        },
      },
      // 自定义字体大小
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
      },
      // 自定义间距
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // 自定义圆角
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
