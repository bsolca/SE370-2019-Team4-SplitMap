import React, {useEffect, useState} from "react";
import MapTable from "./MapTable/MapTable";
import {IMap} from "../MapsList/MapsList";
import axios from "axios";

interface Iid {
    id: number
}

function Map(props: Iid) {
    const [map, setMap] = useState<IMap>();

    const getMap = async (id: number) => {
        const url = `http://localhost:3000/maps/${id}`;
        const response = await axios.get(url);
        setMap(response.data);
    };

    useEffect(() => {
        getMap(props.id).catch((e) => console.error(e));
    }, [props.id]);

    if (map) {
        return (
            <div style={{width: '100%'}}>
                <h1 style={{textAlign: "center", margin: "2%", fontSize: "4em"}}>{props.id}</h1>
                <MapTable id={props.id} name={map.name} size_width={map.size_width} size_height={map.size_height}/>
            </div>)
    }
    return (<div/>);
}

export default Map;
