import React, {useState} from "react";
import {LocationState} from "history";
import MapTable from "./MapTable/MapTable";

function Map(props: LocationState) {
    const [mapName] = useState(props.location.state.name);
    const [map] = useState(props.location.state);

    console.log(props);
    return (
        <div>
            Hello I'm a {mapName}
            {MapTable(map)}
        </div>
    )
}

export const MapComp: any = Map;