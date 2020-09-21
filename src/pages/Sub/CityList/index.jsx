import React, { Component } from 'react';
import { getCurrentCity } from '../../../utils/location'

import { List, AutoSizer } from 'react-virtualized';

import { NavBar, Icon } from 'antd-mobile';
import './index.less'

// 格式化城市列表数据
const formatCityList = async (list) => {
  // 准备城市信息（键是首字母，值是一个数组：对应首字母的城市信息）
  const cityList = {}
  // 对获取的数据进行遍历
  for (const item of list) {
    // 获取每一个城市的首字母
    const first = item.short[0]
    // 定义城市信息中的数组
    const current = cityList[first]
    // 判断对象中是否有这个key,如果有就直接push数据进来，如果没有则添加这个分类
    current ? current.push(item) : (cityList[first] = [item])
    // cityList[first] = [...current || [], item]
  }

  // 把cityList里面所有的key取出来，放在数组中并排序
  const cityIndex = Object.keys(cityList).sort()

  // 获取热门城市
  const res = await (await fetch('http://127.0.0.1:8080/area/hot')).json()
  if (res.status === 200) {
    cityList.hot = res.body
    cityIndex.unshift('hot')
  }

  // 获取当前城市定位信息
  cityList['#'] = [await getCurrentCity()]
  cityIndex.unshift('#')

  return { cityList, cityIndex }
}

// 定义好当前城市和热门城市
const indexMapper = {
  '#': '当前城市',
  hot: '热门城市'
}

export default class CityList extends Component {
  state = {
    // 城市数据列表
    cityList: {},
    // 城市首字母索引
    cityIndex: []
  }

  // 获取城市数据
  async getCityList() {
    const res = await (await fetch('http://127.0.0.1:8080/area/city?level=1')).json()
    console.log(res);
    if (res.status === 200) {
      // 格式化返回的数据
      const { cityList, cityIndex } = await formatCityList(res.body)
      this.setState({
        cityList,
        cityIndex
      })
      console.log(this.state);
    }
  }

  // 渲染每一行的内容
  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it),重点属性：一定要给每一个行数添加该样式
  }) {
    let indexName = this.state.cityIndex[index]
    let citys = this.state.cityList[indexName]
    return (
      <div className="city" key={key} style={style}>
        <div className="title">{indexMapper[indexName] || indexName.toUpperCase()}</div>
        {/* 渲染每个标签所对应的城市 */}
        {citys.map(item => {
          return (
            <div className="name" key={item.value}>{item.label}</div>
          )
        })}
        
      </div>
    )
  }

  // 动态创建每一行的高度
  getRowHeight () {

  }

  componentDidMount() {
    this.getCityList()
  }

  render() {
    return (
      <div className="citylist">
        {/* 城市列表导航 */}
        <NavBar
          className="navbar"
          mode="light"
          icon={<Icon type="left" size="lg" color="#ccc" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市列表</NavBar>

        {/* 城市长列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height - 45}
              rowCount={this.state.cityIndex.length}
              rowHeight={86}
              rowRenderer={this.rowRenderer.bind(this)}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}