import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List } from 'antd';
class PageList extends Component {
  // 只要props发生了变化，componentWillReceiveProps这个生命周期就会被执行
  componentWillReceiveProps(nextProps){
    // console.log(nextProps.match.params.id)
    let id = nextProps.match.params.id;
    if(!id){
      id = 1
    }
    axios.get('/mock/list.json?id='+id)
      .then((res) => {
        // console.log(id)
        // console.log(res.data)
        this.setState({
          data: res.data[id-1].data
        })
      })
  }
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  render() {
    // console.log(this.props.match.params.id)
    return (
      <List
        style={{background: '#fff'}}
        bordered
        dataSource={this.state.data}
        renderItem={item =>( 
          <List.Item>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    )
  }
  // componentDidMount只有组件在挂载到页面的时候才会执行，只执行一次，所以在切换页面的时候axios只请求了一次
  componentDidMount() {
    let url = '/mock/list.json'
    let id = this.props.match.params.id;
    if(id){
      url = url + '?id='+ id
    }else{
      // url = url + '?id=1';
      id = 1
    }
    axios.get(url)
      .then((res) => {
        // console.log(res.data[id-1])
        this.setState({
          data: res.data[id-1].data
        })
      })
  }
}
export default PageList;