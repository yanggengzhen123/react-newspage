import React, { Component ,Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import axios from 'axios';
import logo from './logo.png';
import './style.css';
class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  getMenuItems() {
    // console.log(this.state.list);
    // 循环数组
    return this.state.list.map(item => {
      return (
        <Menu.Item key={item.id}>
          <Link to={`/${item.id}`}>
            <Icon type={item.icon} />{item.title}
          </Link>
        </Menu.Item>
      )
    })
  }
  componentDidMount() {
    // 发送ajax请求http://localhost:3000/mock/header.json、../../../mock/header.json
    axios.get('/mock/header.json')
      .then((res) => {
        // console.log(res.data.data)
        this.setState({
          list: res.data.data
        })
      })
  }
  render() {
    return (
      <Fragment>
        <Link to='/'>
          <img src={logo} alt="logo" className="app-header-logo"/>
        </Link>
        <Menu mode="horizontal" className="app-header-menu">
        { this.getMenuItems() }
        </Menu>
      </Fragment>
    )
  }
}
export default AppHeader;