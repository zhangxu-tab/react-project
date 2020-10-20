import React from 'react';

// 自己封装的路由组件
import {Switch,Route,Redirect} from 'react-router-dom';

export default function RouterView(props) {
    return (
        <Switch>
            {
                props.routes.map((item,index) => {
                    if(item.component) {
                        return (
                            // 普通的路由规则
                            <Route key={index} exact={item.exact} path={item.path} component={item.component}></Route>
                        )
                    }else {
                        return (
                            // 路由重定向
                            <Route key={index} path={item.path} exact={item.exact} >
                                <Redirect to={item.to} />
                            </Route>
                        )
                    }
                })
            }
        </Switch>
    )
}