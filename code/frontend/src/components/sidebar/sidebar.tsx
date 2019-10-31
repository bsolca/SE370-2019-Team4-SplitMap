import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.scss';
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";

const {Sider} = Layout;

export class Sidebar extends React.Component {
    public state = {
        collapsed: false,
    };

    public onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    public render() {
        return (
            <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="bank"/>
                            <span>Maps</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="plus"/>
                        <span>Create Map</span>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Icon type="bulb"/>
                        <span>About</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}