import React from 'react';
import ReactDOM from 'react-dom';
// 全局样式文件
import './index.css';
// 导入antd样式表
import 'antd/dist/antd.min.css';
// 根组件
import App from './App.jsx';


// 渲染视图
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

