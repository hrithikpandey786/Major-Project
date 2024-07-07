import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./layout.scss";
import { AuthContext } from "../../../context/AuthContext";

function Layout(){
    return (
        <div className="layout">
            <div className="navbar">
                <Header/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )    
}


function RequireAdminAuth(){
    const {currentUser} = React.useContext(AuthContext);
    // const navigate = useNavigate();

    if(!currentUser || currentUser.isAdmin===false){
        return <Navigate to="/"/>
    }

    return(
        currentUser && (<div className="layout">
            <div className="navbar">
                <Header/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>)
    )
}


function RequireStudentAuth(){
    const {currentUser} = React.useContext(AuthContext);
    // const navigate = useNavigate();

    if(!currentUser || currentUser.isAdmin===true){
        return <Navigate to="/"/>
    }

    return(
        currentUser && (<div className="layout">
            <div className="navbar">
                <Header/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>)
    )
}

export {Layout, RequireAdminAuth, RequireStudentAuth};