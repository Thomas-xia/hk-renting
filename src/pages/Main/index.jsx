import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { TabBar } from 'antd-mobile';

import Index from './Index/index';
import HouseList from './HouseList';
import News from './News';
import Profile from './Profile';
import './main.css';

// 定义的路径数组
const pathArray = [
  {
    exact: true,
    path: '/home',
    component: Index
  }, {
    path: '/home/list',
    component: HouseList
  }, {
    path: '/home/news',
    component: News
  }, {
    path: '/home/profile',
    component: Profile
  }
]

// 定义的tabBar数组
const tabBarArray = [
  {
    name: '首页',
    icon: 'icon-ind'
  }, {
    name: '找房',
    icon: 'icon-findHouse'
  }, {
    name: '资讯',
    icon: 'icon-infom'
  }, {
    name: '我的',
    icon: 'icon-my'
  },
]

export default class Main extends Component {
  state = {

  }

  // 封装渲染路由挂载点
  renderRoute() {
    return pathArray.map(item => {
      return (
        // 返回该格式 <Route path="/home/index" component={Index}></Route>
        <Route {...item} key={item.path}></Route>
      )
    })
  }

  // 封装渲染TabBar组件
  renderTabBar() {
    return (
      <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent="true">
        {tabBarArray.map((item, index) => {
          return (
            <TabBar.Item
              title={item.name}
              key={index}
              icon={<i className={`iconfont ${item.icon}`}></i>}
              selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
              selected={this.props.location.pathname === pathArray[index].path}
              onPress={() => {
                // 用替换页面呈现的方式改变路由路径
                this.props.history.replace(pathArray[index].path)
              }}
            ></TabBar.Item>
          )
        })}
      </TabBar>
    )
  }

  render() {
    return (
      <div className="main">
        {/* 子路由挂载点（多选一） */}
        {this.renderRoute()}

        {/* 导航条 */}
        {this.renderTabBar()}
      </div>
    )
  }
}