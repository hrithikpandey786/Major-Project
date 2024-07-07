import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminLogin.scss';
import { AuthContext } from '../../../context/AuthContext';
import apiRequest from '../../../lib/apiRequest';

function AdminLogin() {
    const [error, setError] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const {updateUser, currentUser} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsDisabled(true);
        
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");
        
        try{
            const faculty = await apiRequest.post("/auth/adminLogin", {
                username, password
            })

            updateUser({
                id: "001",
                name: faculty.data.facultyName,
                isAdmin: true
            })
            
            navigate(`adminDashboard?name=${faculty.data.facultyName}`);  
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                />
                <button disabled={isDisabled}>Submit</button>
                {error && <span>{error}</span>}
            </form>
            </div>
        </div>
    );
}

export default AdminLogin;
