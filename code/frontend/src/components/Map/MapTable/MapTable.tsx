import React from "react";
import {IMap} from "../../MapsList/MapsList";
import {Button} from "antd";

const shelves = [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 6, y: 4}
];

function getSize(map: IMap): number {
    const sideBarSize = 200;
    const w = (window.innerWidth - sideBarSize) / map.size_width;
    const h = (window.innerHeight - sideBarSize) / map.size_height;
    return w < h ? w : h;
}

function putShelves(map: IMap) {
    const size = getSize(map);
    return <Button type="primary" icon="table" size={"large"} style={{
        height: size,
        width: size
    }}/>
}

function MapTable(map: IMap) {
    const size = getSize(map);
    const nothing = <Button type="ghost" size={"large"} disabled={true} style={{
        height: size,
        width: size
    }}/>;
    return (
        <table>
            <tbody>
            {Array.from(Array(map.size_width)).map((tr, line) =>
                <tr key={line}>
                    {Array.from(Array(map.size_height)).map((a, column, arr) =>
                        <td key={arr.length * line + column + 1}>
                            {(shelves.some(shelf => (shelf.y === line && shelf.x === column))) ? putShelves(map) : nothing}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default MapTable;