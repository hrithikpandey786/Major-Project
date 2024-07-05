import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './studentLogin.scss';
import apiRequest from '../../../lib/apiRequest.js';
import { AuthContext } from '../../../context/AuthContext.jsx';

function StudentLogin() {
    const {currentUser, updateUser} = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError(null);
        setIsDisabled(true);
        const formData = new FormData(e.target);
        const password = formData.get("password");
        const enrolmentNo = parseInt(formData.get("enrolmentNo"));

        try{
            
            const student = await apiRequest.post("/auth/login",{
                enrolmentNo,
                password
            });
            
            const data = student.data;

            updateUser({
                id: data.id,
                name: data.name,
                isAdmin: false
            })
            
            navigate(`/optionPage/${data.id}`);
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    };

    return (
        <div className="student-login">
            <div className="container">
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="enrolmentNo">Enrolment No:</label>
                <input
                    type="text"
                    id="enrolmentNo"
                    name="enrolmentNo"
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
            <div className="bottom">
                Don't have an account? <Link to="/register">Register now</Link>
            </div>
            </div>
            
           
        </div>
    );
}

export default StudentLogin;

