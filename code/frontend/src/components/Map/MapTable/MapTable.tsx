import React, {useState} from "react";
import {IMap} from "../../MapsList/MapsList";
import {Button} from "antd";

const shelves = [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 6, y: 4}
];

interface IPos {
    x: number,
    y: number,
}

function getSize(map: IMap): number {
    const sideBarSize = 200;
    const w = (window.innerWidth - sideBarSize) / map.size_width;
    const h = (window.innerHeight - sideBarSize) / map.size_height;
    return w < h ? w : h;
}


function MapTable(map: IMap) {
    const [pos, setPos] = useState({x:0, y:0});
    const size = getSize(map);

    const setP = (x:number, y:number) => {
        setPos({x, y})
    };

    const putCell = (props:IMap, x:number, y:number, isShelf:boolean) => {
        // tslint:disable-next-line:jsx-no-lambda
        return <Button
            onClick={() => setP(x,y)}
            type={isShelf ? "primary" : "default"}
            icon={isShelf ? "table" : "plus"}
            size={"large"} style={{
                    height: size,
                    width: size
                }}/>
    };

    return (
        <div>
            <span style={{textAlign:"center", display:"block"}}>I click on: {pos.x} and {pos.y}</span>
            <table style={{margin: "auto"}}>
                <tbody>
                {Array.from(Array(map.size_width)).map((tr, line) =>
                    <tr key={line}>
                        {Array.from(Array(map.size_height)).map((a, column, arr) =>
                            <td key={arr.length * line + column + 1}>
                                {putCell(map, column, line, shelves.some(shelf => (shelf.y === line && shelf.x === column)))}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default MapTable;