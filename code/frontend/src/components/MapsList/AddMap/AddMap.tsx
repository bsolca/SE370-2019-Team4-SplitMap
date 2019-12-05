import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";
import axios from 'axios';

function AddMap(props: any): JSX.Element {
    const [mapName, setMapName] = useState('');
    const [mapWidth, setMapWidth] = useState('');
    const [mapHeight, setMapHeight] = useState('');
    const {form} = props;
    const {getFieldDecorator} = form;
    const submit = async () => {
        if (!mapName.match(/^([0-9]|[a-z])+([0-9a-z]+)$/i) ||
            !mapHeight.match(/\b(0?[1-9]|1[0-9]|2[0-5])\b/g) ||
            !mapWidth.match(/\b(0?[1-9]|1[0-9]|2[0-5])\b/g)) {
            alert("Please use only alphanumeric name and size between 1 to 25");
            return;
        }
        axios.post("http://localhost:3000/maps", {
            name: mapName,
            size_width: mapWidth,
            size_height: mapHeight,
        }).then((response) => {
            console.log(response);
            setMapName("");
            props.setReload(props.reload + 1);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Form layout='inline'>
            <Form.Item>
                {getFieldDecorator("name", {
                    rules: [{required: true, message: "Please input map name!"}],
                    initialValue: mapName})
                (<Input
                    placeholder="Map name"
                    value={mapName}
                    onPressEnter={submit}
                    onChange={e => setMapName(e.target.value)}
                />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("size_height", {
                    rules: [{required: true, message: "Please input map height!"}],
                    initialValue: mapHeight
                })(<Input
                    placeholder="Height"
                    onPressEnter={submit}
                    onChange={e => setMapHeight(e.target.value)}
                />)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("size_width", {
                    rules: [{required: true, message: "Please input map width!"}]
                })(<Input
                    placeholder="Width"
                    onPressEnter={submit}
                    onChange={e => setMapWidth(e.target.value)}
                />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={submit}>
                    Add map
                </Button>
            </Form.Item>
        </Form>
    );
}

export const AddMapComp: any = Form.create()(AddMap);
