import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import "./layout.scss";

export default function Layout(){
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