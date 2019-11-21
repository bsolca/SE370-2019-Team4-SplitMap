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

interface ICellButton {
    x: number,
    y: number,
    isShelf: boolean
}

function cellsList(map: IMap, shelvesList: IShelf[]): ICellButton[] {
    const list: ICellButton[] = [];
    console.log(`Oui ${shelvesList.length}`);
    for (let i = 0; i < map.size_width; i++) {
        for (let j = 0; j < map.size_height; j++) {
            const isBool = shelvesList.some((elem: IShelf) => {
                console.log(`for i:${i}==${elem.y}j:${j}=${elem.x}`);
                return (elem.y === i && elem.x === j)
            });
            const btn = {x: j, y: j, isShelf: isBool};
            list.push(btn);
        }
    }
    return list;
}

function MapTable(map: IMap) {
    const [shelves, setShelves] = useState<IShelf[]>([]);
    const [shelf, setShelf] = useState({x: 0, y: 0, visible: false});
    const [cellList, setCellList] = useState<ICellButton[]>([]);
    const size = getSize(map);
    const shelfEffect = async () => {
        setShelves(await getShelvesList(map.id).finally(() => setCellList(() => cellsList(map, shelves))))
    };

    useEffect(() => {
        shelfEffect().then();
    }, [cellList]);

    const setP = (x: number, y: number, visible: boolean): void => {
        setShelf({x, y, visible});
        if (!visible) {
            cellsList(map, shelves);
            postShelf(map.id, x, y);
        }
    };

    const putCell = (props: IMap, x: number, y: number):JSX.Element => {
        const isShelf = cellList.some((elem: ICellButton) =>
            (elem.y === y && elem.x === x));
        const onClick = () => {
            setP(x, y, isShelf);
            console.log(`Hello [${shelf.x},${shelf.y}] and ${shelf.visible} (${isShelf}`)
        };

        return <Button
            onClick={onClick}
            type={cellList.some((elem: ICellButton) =>
                (elem.y === y && elem.x === x)) ? "primary" : "default"}
            icon={cellList.some((elem: ICellButton) =>
                (elem.y === y && elem.x === x)) ? "table" : "plus"}
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
                                {putCell(map, column, line)}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
            <ShelfModal title={`I'm Shelf[${shelf.x}][${shelf.y}]`} visible={shelf.visible} toggleOff={setShelf}
                        x={shelf.x}
                        y={shelf.y}/>
        </div>);
}

export default MapTable;