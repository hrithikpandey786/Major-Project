import "./studentDashboard.scss";
// import React from "react";

import React, { useState, useEffect } from 'react';
// import './StudentDashboard.css';

function StudentDashboard() {
    const [studentInfo, setStudentInfo] = useState(null);

    // Simulate fetching student data
    useEffect(() => {
        // Replace with actual data fetching logic
        const fetchData = async () => {
            const mockData = {
                name: 'JITENDRA SINGH',
                rollNo: '123456',
                enrollmentNo: '654321',
                dob: '1999-01-01',
                gender: 'Male',
                course: 'MCA',
                branch: 'Information Technology'
            };
            setStudentInfo(mockData);
        };

        fetchData();
    }, []);

    if (!studentInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-dashboard-container">
            <div className="student-info">
                <h2>Student Information</h2>
                <p><strong>Name:</strong> {studentInfo.name}</p>
                <p><strong>Roll No:</strong> {studentInfo.rollNo}</p>
                <p><strong>Enrollment No:</strong> {studentInfo.enrollmentNo}</p>
                <p><strong>Date of Birth:</strong> {studentInfo.dob}</p>
                <p><strong>Gender:</strong> {studentInfo.gender}</p>
                <p><strong>Course:</strong> {studentInfo.course}</p>
                <p><strong>Branch:</strong> {studentInfo.branch}</p>
            </div>
            <div className="student-options">
                <h2>Options</h2>
                <button onClick={() => alert('Apply for Degree clicked!')}>Apply for Degree</button>
                <button onClick={() => alert('Check Status clicked!')}>Check Status</button>
            </div>
        </div>
    );
}

export default StudentDashboard;

