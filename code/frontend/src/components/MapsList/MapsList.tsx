import React from 'react';
import { Layout, Button } from 'antd';
import { List, Avatar, Typography } from 'antd';
import { LoginForm } from './AddMap/AddMap';

const axios = require('axios').default;
const { Content, Footer } = Layout;
const { Title } = Typography;


export interface map_i {
  id: number,
  name: string,
  size_width: number,
  size_height: number,
}

const data: map_i[] = [];

export class MapsList extends React.Component {
  state = {
    data
  };

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    axios.get('http://localhost:3000/maps')
      .then((res: { data: map_i[]; }) => {
        const { data } = res;
        this.setState({ data });
      })
  }

  render() {
    return (
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Title>Maps</Title>
            <LoginForm />
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <div>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={`Height: ${item.size_height}`}
                    />
                    <div><Button onClick={() => {
                      axios.delete(`http://localhost:3000/maps/${item.id}`)
                        .then(this.reload);
                    }} type="danger" shape="round" icon="close" /></div>
                  </List.Item>
                </div>
              )}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
