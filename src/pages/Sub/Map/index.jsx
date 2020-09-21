import React, { Component } from 'react';

import './index.less'

export default class Map extends Component {
  componentDidMount() {
    // 创建地图实例
    const map = new window.BMap.Map(document.querySelector('.container'))
    // 设置中心点坐标
    const point = new window.BMap.Point(116.404, 39.915)
    // 初始化地图，同时设置展示级别
    map.centerAndZoom(point, 15)
  }

  render() {
    return (
      <div className="map">
        {/* 挂载地图的容器 */}
        <div className="container">

        </div>
      </div>
    )
  }
}