import React, { Component } from 'react';
// withRouter:用于js点击退出登录之后跳转到主页面
import { Link,withRouter } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';
import './style.css'
class Login extends Component{
  constructor(props){
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      login:false,
      modal:false,
      user:'',
      password:''
    }
  }
  showModal(){
    this.setState({
      modal:true
    })
  }
  hideModal(){
    this.setState({
      modal:false
    })
  }
  changeUser(e){
    this.setState({
      user:e.target.value
    })
  }
  changePassword(e){
    this.setState({
      password:e.target.value
    })
  }
  // 退出
  logout(){
    axios.get('http://www.dell-lee.com/react/api/logout.json',{
      withCredentials:true
    }).then(res=>{
      const data = res.data.data;
      if(data.logout){
        this.setState({
          login:false
        })
      }
      // console.log(this.props);withRouter获取到与路由相关的参数
      this.props.history.push('/');
    })
  }
  checkLogin(){
    const {user,password} =this.state;
    // console.log(user,password)
    // const url = `/mock/login.json?user=${user}&password=${password}`;
    const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`
    // withCredentials:true涉及到跨域cookic的问题，这个参数在服务器已经调好
    axios.get(url,{
      withCredentials:true
    }).then(res=>{
         const login = res.data.data.login
         if(login){
          message.success('登陆成功');
          this.setState({
            login:true,
            modal:false
          }) 
         }else{
          message.error('登陆失败')
         }
      })

  }
  render(){
    const {login} = this.state;
    return (

    <div className="login">
      {/* 三元运算判断 */}
      {
        login?
          <Button type="primary" onClick={this.logout}>退出</Button>:
          <Button type="primary" onClick={this.showModal}>登陆</Button>
      }
      <Link to='/vip'>
        <Button type="primary" style={{marginLeft:10}}>Vip</Button>
      </Link>
      <Modal
        title="登 陆"
        visible={this.state.modal}
        onOk={this.checkLogin}
        onCancel={this.hideModal}
      >
        <Input placeholder="请输入用户名" style={{marginBottom:'10px'}} value ={this.state.user} onChange={this.changeUser}/>
        <Input placeholder="请输入密码" type='password' value ={this.state.password} onChange={this.changePassword}/>
      </Modal>
    </div>
    )
  }
  componentDidMount(){
    //请求判断用户是否登陆
    axios.get('http://www.dell-lee.com/react/api/isLogin.json',{
      withCredentials:true
    }).then(res=>{
      const login = res.data.data.login
      this.setState({ login })
    })
  }
}
export default withRouter(Login);