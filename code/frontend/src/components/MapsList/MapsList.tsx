import React, {useEffect, useState} from 'react';
import {Layout, Button} from 'antd';
import {List, Avatar, Typography} from 'antd';
import {AddMapComp} from './AddMap/AddMap';
import axios from 'axios'
import {A} from "hookrouter";

const {Content, Footer} = Layout;
const {Title} = Typography;


export interface IMap {
    id: number,
    name: string,
    size_width: number,
    size_height: number,
}

const MapList = () => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [reload, setReload] = useState(0);
    const [maps, setMaps] = useState<IMap[]>([]);

    const getMaps = async () => {
        const response = await axios.get('http://localhost:3000/maps');
        setMaps(response.data.toString);
    };

    const deleteMap = async (id: number) => {
        await axios.delete(`http://localhost:3000/maps/${id}`);
    };

    useEffect(() => {
            getMaps().then(r => console.log("useEffect for getMaps"));
    }, []);


    const createList = (item: IMap) => {
        return (
            <div>
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                        title={<A href={`/map/${item.id}`}>{item.name}</A>}
                        description={`Height: ${item.size_height} Width: ${item.size_width}`}
                    />
                    <div><Button
                        onClick={() => deleteMap(item.id)}
                        type="danger" shape="round" icon="close"/>
                    </div>
                </List.Item>
            </div>
        );
    };

    return (
        <Layout>
            <Content style={{margin: '16px'}}>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Title>Maps</Title>
                    <AddMapComp />
                    <List
                        itemLayout="horizontal"
                        dataSource={maps}
                        renderItem={createList}
                    />
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default MapList;
