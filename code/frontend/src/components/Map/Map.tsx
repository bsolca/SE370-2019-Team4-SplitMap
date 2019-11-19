import React, {useState} from "react";
import {LocationState} from "history";
import MapTable from "./MapTable/MapTable";

function Map(props: LocationState) {
    const [mapName] = useState(props.location.state.name);
    const [map] = useState(props.location.state);

    console.log(props);
    return (
        <div style={{width:'100%'}}>
            <h1 style={{textAlign:"center", margin:"2%", fontSize:"4em"}}>{mapName}</h1>
            {MapTable(map)}
        </div>
    )
}

export const MapComp: any = Map;