import React, {useState} from "react";
import {LocationState} from "history";
import MapTable from "./MapTable/MapTable";

function Map(props: LocationState) {
    const [mapName] = useState(props.location.state.name);
    console.log(props);
    return (
        <div>
            Hello I'm a {mapName}
            {MapTable()}
        </div>
    )
}

export const MapComp: any = Map;