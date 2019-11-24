import React, { Component } from 'react';
import axios from 'axios'
import { Card } from 'antd';
import './style.css'
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }
  render() {
    // return <div>{this.props.match.params.id}</div>
    return (
      <Card title={this.state.title}>
        {/* <p>{this.state.content}</p>,不能这么写，这么写转义不了标签，下面是转义标签后的写法 */}
        <div className='detail' dangerouslySetInnerHTML={{__html:this.state.content}}></div>
      </Card>
    )
  }
  componentDidMount(){
    //从my-app中获取的id，this.props.match.params.id
    const id = this.props.match.params.id;
    axios.get('/mock/detail.json?id='+id)
      .then(res=>{
        // console.log(res.data[id-1].data)
        let data = res.data[id-1].data
        this.setState(data)
      })
  }
}
export default Detail;