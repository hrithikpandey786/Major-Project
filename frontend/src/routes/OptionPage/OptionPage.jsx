import "./optionPage.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import apiRequest from "../../../lib/apiRequest";


export default function OptionPage(){
    const {currentUser, updateUser} = React.useContext(AuthContext);
    const [error, setError] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const id = currentUser.id;
    const navigate = useNavigate();

    async function handleLogout(){
        setError("");
        setIsDisabled(true);

        try{
            await apiRequest.post("/auth/logout");

            updateUser(null);
            navigate("/");
        } catch(err){
            console.log(err);
            setError(err.response.data.message)
        } finally{
            setIsDisabled(false);
        }
    }

    return(
        <div className="optionPageContainer">
            <h2>Applying/Applied for</h2>
                <Link to={`/degreeRequest/${id}`}>
                    <button>Degree</button>
                </Link>
                <Link to={`/migrationRequest/${id}`}>
                    <button>Migration</button>
                </Link>
                <div className="logoutSection">
                    <button className="logout" onClick={handleLogout}>Logout</button>
                    {error && <span>{error}</span>}
                </div>
        </div>
    )
}