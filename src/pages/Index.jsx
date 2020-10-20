import React, { Component } from 'react';

import '../assets/css/index.scss';

import { HashRouter as Router, NavLink } from 'react-router-dom';
import {LoadingOutlined} from '@ant-design/icons';

// 路由懒加载
import { Suspense } from 'react';

// 导入自定义路由组件
import RouterView from '../router/RouterView';
// 导入路由规则
import routes from '../router/routes';

// 导入页头
import { PageHeader, Spin, Affix } from 'antd';

export default class Index extends Component {
    render() {
        const spinStyle = {
            textAlign: 'center',
            position: 'fixed',
            height: 40,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: 'auto'
        }
        // 自定义loading图标
        const antIcon = <LoadingOutlined style={{fontSize: 24}} spin />
        return (
            // fallback  当组件还没有加载出来的时候,给用户呈现的页面结构
            <Suspense fallback={
                <div style={spinStyle}><Spin indicator={antIcon} /></div>
            }>
                <Router>
                    <React.Fragment>
                        {/* Affix内部必须提供一个唯一的根标签 */}
                        <Affix>
                            <div>
                                <div className="header">
                                    <PageHeader
                                        className="site-page-header"
                                        title="优音乐"
                                    />
                                    <a href="#" className="btn-download">下载APP</a>
                                </div>
                                {/* 路由导航链接 */}
                                <div className="navbar">
                                    <NavLink to="/recommend">推荐</NavLink>
                                    <NavLink to="/hot">热歌</NavLink>
                                    <NavLink to="/search">搜索</NavLink>
                                </div>
                            </div>
                        </Affix>

                        {/* 路由规则&路由出口 */}
                        <RouterView routes={routes} />
                    </React.Fragment>
                </Router>
            </Suspense>
        )
    }
}
