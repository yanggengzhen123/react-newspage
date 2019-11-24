import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from './components/Header/'
import Login from './components/Login/'
import PageList from './containers/PageList'
import Detail from './containers/Detail/'
import Vip from './containers/Vip/'
import 'antd/dist/antd.css';
import './style.css'

const { Header, Footer, Content } = Layout;
class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Layout style={{minWidth:1260,height:'100%'}}>
          <Header className="header"><AppHeader /></Header>
          <Content className="content">
            <Login />
            {/* switch匹配到一个之后就再也不匹配了，fragment会匹配到多个 */}
              <Switch> 
                <Route path='/vip' component={Vip} />
                <Route path='/detail/:id' component={Detail}/>
                {/* path='/:id'表示的是动态id，接收的是header的link的id，传给pagelist这个组件。:id?的？意思是id可传可不传，就不会出现/页面空白的情况*/}
                <Route path='/:id?' component={PageList}/>
              </Switch>
          </Content>
          <Footer className="footer">@copyright Zhen 2019</Footer>
        </Layout>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
