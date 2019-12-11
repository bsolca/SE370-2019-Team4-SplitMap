import React, {Dispatch, SetStateAction, useState} from "react";
import {Alert, Descriptions, Modal} from "antd";
import {ModalProps} from "antd/es/modal";
import axios from "axios";

interface IItems {
    title: string,
    description: string,
    quantity: number
    level: number,
}

const myItems: IItems[] = [
    {title: "title", description: "desc1", quantity: 11, level: 0},
    {title: "qwerty", description: "desc2", quantity: 22, level: 1},
    {title: "asdfg", description: "desc3", quantity: 33, level: 3},
];

interface IShelfProps extends ModalProps {
    toggleOff: Dispatch<SetStateAction<{ x: number, y: number, visible: boolean }>>;
    id: number;
    x: number;
    y: number;
}

function LevelDescription(item: IItems): JSX.Element {
    return (
            <Descriptions bordered={true} column={1}>
                <Descriptions.Item label="Title" span={1}>{item.title}</Descriptions.Item>
                <Descriptions.Item label="Quantity" span={1}>{item.quantity}</Descriptions.Item>
                <Descriptions.Item label="Description" span={1}>{item.description}</Descriptions.Item>
                <Descriptions.Item  label="Movement" span={1}>PUT MOVEMENT FUNCTION</Descriptions.Item>
            </Descriptions>
    );
}

function getItemsList(shelfId: number): IItems[] {
    return myItems;
}

function deleteShelfById(id: number) {
    if (id < 0 ) {
        return ;
    }
    const url = `http://localhost:3000/shelves/${id}`;
    axios.delete(url).then(() => console.log("Map is deleted" + id));
}

function ShelfModal(props: IShelfProps) {
    const [shelfId] = useState(props.id);
    const onOk = () => {
        props.toggleOff({x: props.x, y: props.y, visible: false})
    };
    const onCancel = () => {
        deleteShelfById(shelfId);
    };
    const items = getItemsList(props.id);

    const levels = () => {
        const buffer = [];

        for (let i = 0; i < 4; i++) {
            buffer.push(<h1>{`Level ${i}`}</h1>);
            if (items.some(item => item.level === i)) {
                items.find(e => buffer.push(LevelDescription(e)));
            } else {
                buffer.push(
                    <Descriptions.Item>
                        <Alert message={`No items on level ${i}`} type="info" banner={true}/>
                    </Descriptions.Item>
                );
            }
        }
        return buffer;
    };
    return <Modal
        title={props.title + `ID: ${shelfId}`}
        visible={props.visible}
        onOk={onOk}
        onCancel={onCancel}
        okText={`Close`}
        cancelText={`Delete Shelf`}
        width="95%"
        style={{top: 5}}
    >
        <div>
            {levels()}
        </div>
    </Modal>
}

export default ShelfModal;
