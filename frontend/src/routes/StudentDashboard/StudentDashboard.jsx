import "./studentDashboard.scss";
import React, { useState, useEffect } from 'react';


function StudentDashboard() {
    const [studentInfo, setStudentInfo] = useState(null);
    const [formData, setFormData] = React.useState([]);
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
                email: "hrithik@gmail.com",
                phoneNumber: "100019893",
                course: 'MCA',
                branch: 'Information Technology'
            };
            setStudentInfo(mockData);
        };

        fetchData();
    }, []);

    
    function handleChange(){

    }
    
    if (!studentInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-dashboard-container">
            <div className="student-info">
                <h2>Apply for Degree</h2>
                <p><strong>Name:</strong> {studentInfo.name}</p>
                <p><strong>Roll No:</strong> {studentInfo.rollNo}</p>
                <p><strong>Enrollment No:</strong> {studentInfo.enrollmentNo}</p>
                <p><strong>Date of Birth:</strong> {studentInfo.dob}</p>
                <p><strong>Gender:</strong> {studentInfo.gender}</p>
                <p><strong>Email:</strong> {studentInfo.email}</p>
                <p><strong>Phone Number:</strong> {studentInfo.phoneNumber}</p>
                <p><strong>Department:</strong> {studentInfo.course}</p>
                <p><strong>Course:</strong> {studentInfo.branch}</p>
                <form>
                <div className="item">
                        <label htmlFor="resultDate">Result Date:</label>
                            <input
                                type="date"
                                id="resultDate"
                                name="resultDate"
                                // value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>


                <div className="item">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>
                    </div>

                    <div className="item">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        // value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="item">
                    <label htmlFor="admissionYear">Admission Year:</label>
                    <input
                        type="number"
                        id="admissionYear"
                        name="admissionYear"
                        // value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="reappearance">
                    <label>Results of any re-appearance exam (supplementary/betterment) pending?</label>
                    <div>
                        <input
                                id="yes"
                                type="radio"
                                name="reappearance"
                                value="yes"
                                // checked={formData.reappearance === 'yes'}
                                onChange={handleChange}
                                required
                            />
                        <label htmlFor="yes">Yes</label>
                    </div>
                    <div>
                            <input
                                id="no"
                                type="radio"
                                name="reappearance"
                                value="no"
                                // checked={formData.reappearance === 'no'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="no">No</label>
                            
                    </div> 
                    </div>
                </form>
                
                    
                    
                    
                    
            </div>
            <div className="student-options">
                <h2>Options</h2>
                <button onClick={() => alert('Apply for Degree clicked!')}>Apply for Degree</button>
                <button onClick={() => alert('Check Status clicked!')}>Check Status</button>
                <button onClick={() => alert('Check Status clicked!')}>Logout</button>
            </div>
        </div>
    );
}

export default StudentDashboard;

