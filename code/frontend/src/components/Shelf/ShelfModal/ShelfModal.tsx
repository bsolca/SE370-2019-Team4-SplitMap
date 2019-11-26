import React, {Dispatch, SetStateAction} from "react";
import {Modal} from "antd";
import {ModalProps} from "antd/es/modal";

enum itemState {
    inStock,
    movingIn,
    movingOut
}

interface IShelfLocation {
    id:number,
    level:number
}

interface IItems {
    title: string,
    description: string,
    quantity:number
    state:itemState,
    level: number,
    desiredShelf?:IShelfLocation,
}

const myItems: IItems[] = [
    {title: "title", description: "desc1", quantity: 11, state:itemState.inStock, level: 2},
    {title: "qwerty", description: "desc2", quantity: 22, state:itemState.inStock, level: 1},
    {title: "asdfg", description: "desc3", quantity: 33, state:itemState.inStock, level: 3},
    {title: "asdfg", description: "desc3", quantity: 12, state:itemState.movingOut, desiredShelf:{id:12, level:2}, level: 3},
];

interface IShelfProps extends ModalProps {
    toggleOff: Dispatch<SetStateAction<{ x: number, y: number, visible: boolean }>>;
    x: number;
    y: number;
}

function ShelfModal(props: IShelfProps) {
    const onOk = () => {
        props.toggleOff({x: props.x, y: props.y, visible: false})
    };
    return <Modal
        title={props.title}
        visible={props.visible}
        onOk={onOk}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
}

export default ShelfModal;
