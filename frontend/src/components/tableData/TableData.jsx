import React from "react"
import pic from "/pencilImage.png"
import "./tableData.scss";

export default function tableData(props){
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.rollNo}</td>
            <td>{props.data.address}</td>
            <td>{props.data.status} <img src={pic} className="pencil-image"/></td>
        </tr>
    )
}