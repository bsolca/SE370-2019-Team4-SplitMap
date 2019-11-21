import React, {Dispatch, SetStateAction} from "react";
import {Modal} from "antd";
import {ModalProps} from "antd/es/modal";

interface IShelfProps extends ModalProps {
    toggleOff: Dispatch<SetStateAction<{x:number, y:number, visible:boolean}>>;
    x:number;
    y:number;
}

function ShelfModal(props:IShelfProps) {
    const onOk = () => {props.toggleOff({x:props.x, y:props.y, visible:false})};
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
