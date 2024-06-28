import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './studentLogin.scss';

function StudentLogin() {
    const [enrolmentNo, setEnrolmentNo] = useState('');
    const [password, setPassword] = useState('');

    const handleEnrolmentNoChange = (e) => {
        setEnrolmentNo(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Enrolment No:', enrolmentNo);
        console.log('Password:', password);
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
                    value={enrolmentNo}
                    onChange={handleEnrolmentNoChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <input type="submit" value="Login" />
            </form>
            <div className="bottom">
                Don't have an account? <Link to="/register">Register now</Link>
            </div>
            </div>
            
           
        </div>
    );
}

export default StudentLogin;

