import React, {useState} from "react";
import {LocationState} from "history";
import MapTable from "./MapTable/MapTable";

function Map(props: LocationState) {
    const [mapName] = useState(props.location.state.name);
    const [map] = useState(props.location.state);
    return (
        <div style={{width:'100%'}}>
            <h1 style={{textAlign:"center", margin:"2%", fontSize:"4em"}}>{mapName}</h1>
            <MapTable id={map.id} name={map.name} size_width={map.size_width} size_height={map.size_height}/>
        </div>
    )
}

export const MapComp: any = Map;