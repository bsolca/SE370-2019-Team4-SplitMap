import React, {useEffect, useState} from "react";
import {IMap} from "../../MapsList/MapsList";
import {Button} from "antd";
import Shelf from "../../Shelf/Shelf";
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
    const sideBarSize = 200;
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

function MapTable(map: IMap) {
    const [shelves, setShelves] = useState({IMap:[]});
    useEffect(() => {
        const result = async () => {
            const res = getShelvesList(map.id);
            setShelves(res);
        };
        result();
    }, [shelves]);


    const [shelf, setShelf] = useState({x: 0, y: 0, visible: false});
    const size = getSize(map);
    const setP = (x: number, y: number, visible: boolean): void => {
        postShelf(map.id, x, y);
        setShelf({x, y, visible});
    };

    const putCell = (props: IMap, x: number, y: number, isShelf: boolean) => {
        const onClick = () => setP(x, y, isShelf);
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
            <span style={{textAlign: "center", display: "block"}}>I click on: {shelf.x} and {shelf.y}</span>
            <table style={{margin: "auto"}}>
                <tbody>
                {Array.from(Array(map.size_width)).map((tr, line) =>
                    <tr key={line}>
                        {Array.from(Array(map.size_height)).map((a, column, arr) =>
                            <td key={arr.length * line + column + 1}>
                                {putCell(map, column, line, shelves.some((elem: IMap) =>
                                    (elem.size_height === line && elem.size_width === column)))}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <Shelf title={`I'm Shelf[${shelf.x}][${shelf.y}]`} visible={shelf.visible} toggleOff={setShelf} x={shelf.x}
                   y={shelf.y}/>
        </div>
    )
}

export default MapTable;