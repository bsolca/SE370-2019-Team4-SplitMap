import React from 'react';
import {Layout, Button} from 'antd';
import {List, Avatar, Typography} from 'antd';
import {AddMapComp} from './AddMap/AddMap';
import axios from 'axios'
import {Link} from "react-router-dom";

const {Content, Footer} = Layout;
const {Title} = Typography;


export interface IMap {
    id: number,
    name: string,
    size_width: number,
    size_height: number,
}

const data: IMap[] = [];

export default class MapsList extends React.Component {
    public state = {
        data
    };

    public componentDidMount() {
        this.reload();
    }

    public render() {
        return (
            <Layout>
                <Content style={{margin: '16px'}}>
                    <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                        <Title>Maps</Title>
                        <AddMapComp reload={this.reload}/>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data}
                            renderItem={this.createList}
                        />
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }

    public createList = (item: IMap) => (
        <div>
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                    title={<Link to={{
                        pathname: '/map',
                        state: item
                    }} >{item.name}</Link>}
                    description={`Height: ${item.size_height}`}

                />
                <div><Button onClick={() => {
                    axios.delete(`http://localhost:3000/maps/${item.id}`)
                        .then(this.reload);
                }} type="danger" shape="round" icon="close"/>
                </div>
            </List.Item>
        </div>
    );

    private reload = () => {
        axios.get('http://localhost:3000/maps')
            .then((res: { data: IMap[]; }) => {
                const { data } = res;
                console.log(res);
                this.setState({data});
            })
    };
}
