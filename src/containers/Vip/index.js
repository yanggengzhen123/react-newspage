import React, { Component } from 'react';
// 重定向
import {Redirect} from 'react-router-dom';
import axios from 'axios'; 
import './style.css';
class Vip extends Component {
  constructor(props){
    super(props);
    this.state = {
      login:true,
      // 防止vip的内容在刷新时被看到,双重判断
      fetchFinish:false
    }
  }
  render(){
    if(this.state.login){
      if(this.state.fetchFinish){
        return <div className='vip'>Vip</div>
      }else{
        return <div className='vip'>登陆后即可查看vip内容</div>
      }
    }else{
      return <Redirect to='/' />
    }
  }
  componentDidMount(){
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',{
      withCredentials:true
    }).then(res=>{
      const login = res.data.data.login
      this.setState({ 
        login,
        fetchFinish:true
       })
    })
  }
}
export default Vip;