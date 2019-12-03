import React, {useEffect, useState} from "react";
import {IMap} from "../../MapsList/MapsList";
import {Button} from "antd";
import ShelfModal from "../../Shelf/ShelfModal/ShelfModal";
import axios from 'axios';

interface IShelf {
    id: number,
    parent_map: number,
    x: number,
    y: number,
}

function postShelf(mapId: number, x: number, y: number) {
    axios.post('http://localhost:3000/shelves/', {
        parent_map: mapId,
        x,
        y,
    })
}

function getSize(map: IMap): number {
    const sideBarSize = 300;
    const w = (window.innerWidth - sideBarSize) / map.size_width;
    const h = (window.innerHeight - sideBarSize) / map.size_height;

    return w < h ? w : h;
}

function getShelvesList(id: number): Promise<IShelf[]> {
    return axios.get('http://localhost:3000/shelves/' + id)
        .then((res: { data: IShelf[]; }) => {
            const {data} = res;
            return data;
        });
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    const newValue = value + 1;
    return () => setValue(newValue); // update the state to force render
}

function getShelfId(mapId: number, shelfPosX: number, shelfPosY: number):number {
    console.log(`I ask the shelfID for map[${mapId}] in pos [${shelfPosX},${shelfPosY}]`);
    return 0;
}

function MapTable(props: IMap) {
    const [shelves, setShelves] = useState<IShelf[]>([]);
    const [mouseClick, setMouseClick] = useState({x: 0, y: 0, visible: false});
    const size = getSize(props);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const shelfEffect = async () => {
            setShelves(await getShelvesList(props.id));
        };
        shelfEffect()
            .then(() => (result: IShelf[]) => {
                setShelves(result);
            })
            .catch(error => console.log(error));
    }, [props.id, forceUpdate]);

    const putCell = (x: number, y: number): JSX.Element => {
        let isShelf = shelves.some((elem: IShelf) =>
            (elem.y === y && elem.x === x));
        const onClick = () => {
            if (isShelf) {
                setMouseClick({x, y, visible: true});
            } else {
                postShelf(props.id, x, y);
                isShelf = true;
                shelves.push({id: 2,
                    parent_map: 2,
                    x: 2,
                    y: 2});
                forceUpdate();
            }
        };

        return <Button
            onClick={onClick}
            type={isShelf ? "primary" : "default"}
            icon={isShelf ? "table" : "plus"}
            size={"large"} style={{
            height: size,
            width: size
        }}/>
    };

    return (
        <div>
            <span style={{textAlign: "center", display: "block"}}>I click on: {mouseClick.x} and {mouseClick.y}</span>
            <table style={{margin: "auto"}}>
                <tbody>
                {Array.from(Array(props.size_height)).map((tr, line) =>
                    <tr key={line}>
                        {Array.from(Array(props.size_width)).map((a, column, arr) =>
                            <td key={arr.length * line + column + 1}>
                                {putCell(column, line)}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <ShelfModal title={`I'm Shelf[${mouseClick.x}][${mouseClick.y}]`} visible={mouseClick.visible}
                        toggleOff={setMouseClick}
                        x={mouseClick.x}
                        y={mouseClick.y}
                        id={getShelfId(props.id, mouseClick.x, mouseClick.y)}
            />
        </div>);
}

export default MapTable;