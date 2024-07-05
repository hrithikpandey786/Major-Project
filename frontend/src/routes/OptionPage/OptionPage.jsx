import "./optionPage.scss";
import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function OptionPage(){
    const {currentUser} = React.useContext(AuthContext);
    const id = currentUser.id;
    
    return(
        <div className="optionPageContainer">
            <h2>Applying for</h2>
                <Link to={`/degreeRequest/${id}`}>
                    <button>Degree</button>
                </Link>
                <Link to={`/migrationRequest/${id}`}>
                    <button>Migration</button>
                </Link>
        </div>
    )
}