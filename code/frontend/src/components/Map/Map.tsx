import React, {useState} from "react";
import {IMap} from "../MapsList/MapsList";
import {LocationState} from "history";

function Map(props: LocationState) {
    const [mapName] = useState(props.location.state.name);
    console.log(props);
    return (
        <div>Hello I'm a {mapName}</div>
    )
}

export const MapComp: any = Map;