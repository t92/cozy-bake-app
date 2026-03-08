/**
 * 应用程序入口文件
 * 
 * 职责：
 * 1. 导入全局样式
 * 2. 渲染根组件到 DOM
 * 3. 启用 React 严格模式（开发环境）
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 获取根 DOM 节点
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// 创建 React 根节点并渲染应用
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
