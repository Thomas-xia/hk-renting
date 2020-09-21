// 导入核心包
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

// 导入第三方样式
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
import 'react-virtualized/styles.css';

// 导入其他组件
import Main from './pages/Main';
import Map from './pages/Sub/Map';
import CityList from './pages/Sub/CityList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" render={() => <Redirect to="/home" />}></Route>
        <Route path="/home" component={Main}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/citylist" component={CityList}></Route>
      </div>
    </Router>
  )
}

export default App;
