import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentCity } from '../../../utils/location'

import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import '../../../assets/fonts/iconfont.css'

import './index.less'
import nav1 from '../../../assets/images/nav-1.png';
import nav2 from '../../../assets/images/nav-2.png';
import nav3 from '../../../assets/images/nav-3.png';
import nav4 from '../../../assets/images/nav-4.png';

// 导航菜单列表
const NavList = [
  { name: '整租', src: nav1, path: '/home/list' },
  { name: '合租', src: nav2, path: '/home/list' },
  { name: '地图找房', src: nav3, path: '/map' },
  { name: '去出租', src: nav4, path: '/home/list' },
]

export default class Index extends Component {
  state = {
    // 轮播图数据列表
    swiperList: [],
    // 租房小组数据列表
    groupList: [],
    // 最新资讯数据列表
    newsList: [],
    // 城市名称
    cityName: '定位中'
  }

  // 获取轮播图数据
  async getSwiperList() {
    // fetch('http://127.0.0.1:8080/home/swiper')
    //   .then(res/* 二进制数据流 */ => res.json())
    //     .then(res => console.log(res))
    const res = await (await fetch('http://127.0.0.1:8080/home/swiper')).json()
    console.log(res);
    if (res.status === 200) {
      this.setState({
        swiperList: res.body
      })
    }
  }

  // 获取租房小组数据
  async getGroupsList() {
    const res = await (await fetch('http://127.0.0.1:8080/home/groups')).json()
    console.log(res);
    if (res.status === 200) {
      this.setState({
        groupList: res.body
      })
    }
  }

  // 获取最新资讯数据
  async getNewsList() {
    const res = await (await fetch('http://127.0.0.1:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0')).json()
    console.log(res);
    if (res.status === 200) {
      this.setState({
        newsList: res.body
      })
    }
  }

  // 获取当前城市名称
  async getCityName() {
    const { label } = await getCurrentCity()
    this.setState({
      cityName: label
    })
  }

  componentDidMount() {
    this.getSwiperList()
    this.getGroupsList()
    this.getNewsList()
    this.getCityName()
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图区域 */}
        {/* 
          轮播图问题：由于我们动态加载数据，导致了轮播图不能自动去进行轮播以及高度的塌陷 
          解决方案：给Carousel添加key属性
        */}
        <Carousel key={this.state.swiperList.length} autoplay infinite>
          {this.state.swiperList.map(i => (
            <a
              key={i.id}
              href="##"
              style={{ display: 'inline-block', width: '100%'}}
            >
              <img
                src={`http://127.0.0.1:8080${i.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>

        {/* 顶部导航栏区域 */}
        <Flex className='search-box'>
          {/* 左侧白色区域 */}
          <Flex className="search">
            {/* 位置 */}
            <div className="location" onClick={() => this.props.history.push('/citylist')} >
              <span className="name">{this.state.cityName}</span>
              <i className="iconfont icon-arrow" />
            </div>
            {/* 搜索表单 */}
            <div className="form">
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')} />
        </Flex>

        {/* 导航菜单区域 */}
        <Flex className="nav">
          {NavList.map(i => (
            <Flex.Item key={i.name} onClick={() => this.props.history[i.path.startsWith('/home') ? 'replace' : 'push'](i.path)}>
              <img src={i.src} alt="" />
              <p>{i.name}</p>
            </Flex.Item>
          ))}
        </Flex>

        {/* 租房小组区域 */}
        <div className="group">
          <div className="group-title">
            <h3 className="title">租房小组</h3>
            <Link className="more" to="/home/list">更多</Link>
          </div>
          <Grid
            data={this.state.groupList}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={item => (
              <div className="group-content">
                {/* 左侧：标题、简介 */}
                <div className="left">
                  <p className="title">{item.title}</p>
                  <p className="desc">{item.desc}</p>
                </div>
                {/* 右侧：图片 */}
                <div className="right">
                  <img src={'http://127.0.0.1:8080' + item.imgSrc} alt="" />
                </div>
              </div>
            )}
          />
        </div>

        {/* 最新资讯区域 */}
        <div className="news">
          <div className="news-title">
            <h3 className="title">最新资讯</h3>
          </div>
          <WingBlank size="md">
            {this.state.newsList.map(item => {
              return (
                <div className="news-content" key={item.id}>
                  <div className="left">
                    <img
                      className="img"
                      src={'http://127.0.0.1:8080' + item.imgSrc}
                      alt=""
                    />
                  </div>
                  <div className="right">
                    <h3 className="title">{item.title}</h3>
                    <div className="info">
                      <span>{item.from}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </WingBlank>
        </div>
      </div>
    )
  }
}