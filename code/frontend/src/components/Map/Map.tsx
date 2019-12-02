import React from "react";
import MapTable from "./MapTable/MapTable";
import {IMap} from "../MapsList/MapsList";

function Map(props: IMap) {
    console.log("I'm in a map");
    return (
        <div style={{width:'100%'}}>
            <h1 style={{textAlign:"center", margin:"2%", fontSize:"4em"}}>{props.name}</h1>
            <MapTable id={props.id} name={props.name} size_width={props.size_width} size_height={props.size_height}/>
        </div>
    )
}

export default Map;
