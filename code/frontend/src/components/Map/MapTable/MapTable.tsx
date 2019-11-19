import React, {useState} from "react";
import {IMap} from "../../MapsList/MapsList";
import {Button} from "antd";
import Shelf from "../../Shelf/Shelf";
import axios from 'axios';

const shelves = [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 6, y: 4}
];

function getShelvesList() {

}

function getSize(map: IMap): number {
    const sideBarSize = 200;
    const w = (window.innerWidth - sideBarSize) / map.size_width;
    const h = (window.innerHeight - sideBarSize) / map.size_height;
    return w < h ? w : h;
}


function MapTable(map: IMap) {
    const [shelf, setShelf] = useState({x:0, y:0, visible:false});

    const size = getSize(map);

    const setP = (x:number, y:number, visible:boolean):void => {
        shelves.push({x,y});
        setShelf({x, y, visible});
    };

    const putCell = (props:IMap, x:number, y:number, isShelf:boolean) => {
        const onClick = () => setP(x,y, isShelf);
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
            <span style={{textAlign:"center", display:"block"}}>I click on: {shelf.x} and {shelf.y}</span>
            <table style={{margin: "auto"}}>
                <tbody>
                {Array.from(Array(map.size_width)).map((tr, line) =>
                    <tr key={line}>
                        {Array.from(Array(map.size_height)).map((a, column, arr) =>
                            <td key={arr.length * line + column + 1}>
                                {putCell(map, column, line, shelves.some(elem =>
                                    (elem.y === line && elem.x === column)))}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <Shelf title={`I'm Shelf[${shelf.x}][${shelf.y}]`} visible={shelf.visible} toggleOff={setShelf} x={shelf.x} y={shelf.y}/>
        </div>
    )
}

export default MapTable;