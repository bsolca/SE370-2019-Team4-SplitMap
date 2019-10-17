import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.scss';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

export class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="bank" />
              <span>Maps</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="plus" />
              <span>Create Map</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="bulb" />
              <span>About</span>
            </Menu.Item>
          </Menu>
        </Sider>
    );
  }
}