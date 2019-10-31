import React from "react";

function Cell() {
    return <th className="cell">XO</th>;
}

function Row() {

    return 
}

function MapTable() {
    const table:string[] = [];

    for (let i = 0 ; i < 10 ; i++) {
        table.push("<tr>");
        for (let j = 0 ; j < 10 ; j++) {
            table.push(cell);
        }
        table.push("</tr>")
    }
    console.log(table);
    return (
        <table>
        </table>
    )
}

export default MapTable;