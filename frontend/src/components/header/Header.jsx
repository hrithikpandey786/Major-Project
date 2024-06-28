import React from "react";
import {Link} from "react-router-dom";

import "./header.scss";

export default function Header(){
    return(
        <nav>
            <Link to="/">
                <img src="/image6.png"></img>
            </Link>
        </nav>
    )
}