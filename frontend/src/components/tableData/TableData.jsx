import React from "react"
import pic from "/pencilImage.png"
import "./tableData.scss";
import { Link } from "react-router-dom";

export default function tableData(props){
    
    return (
        <tr>
            
                <td>{props.data.name}</td>
                <td>{props.data.enrolmentNo}</td>
                <td>{props.data.course}</td>
                <td><Link to={`/studentDetail/${props.data.enrolmentNo}?type=${props.type}`}>
                {props.data.status.split(" ")[0]} <img src={pic} className="pencil-image"/>
                </Link>
                </td>
        </tr>
    )
}