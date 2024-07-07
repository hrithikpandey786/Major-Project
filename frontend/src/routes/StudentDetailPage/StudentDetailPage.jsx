import "./studentDetailPage.scss";
import React, { useState, useEffect } from 'react';
import {useNavigate, useLoaderData, useLocation } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";
import { AuthContext } from "../../../context/AuthContext";
import Razorpay from "razorpay";

function StudentDetailPage() {
    const {currentUser, updateUser} = React.useContext(AuthContext);
    const studentData = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    // console.log(type);
    const [error, setError] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [studentInfo, setStudentInfo] = useState(studentData.data || null);
    const [isSubmitted, setIsSubmitted] = React.useState(studentInfo.status==="Approved"||studentInfo.status==="Rejected"?true:false);
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
    

    async function handleApprovedStatus(){
        setIsDisabled(true);
        setError("");
        let updatedStatus;
        
        if(currentUser.name==="Dean UG Office" || currentUser.name==="Dean PG Office"){
            updatedStatus = "Pending at Registrar Office"
        } else if(currentUser.name==="Registrar Office"){
            updatedStatus = "Approved";
        } 
        else {
            if(studentInfo.course==="B.TECH" || studentInfo.course==="BBA" || studentInfo.course==="B.Pharma")
            updatedStatus = "Pending at Dean UG Office";
            else {
                updatedStatus = "Pending at Dean PG Office";
            } 
        }

        studentInfo.status = updatedStatus;
        // console.log(studentInfo);
        try{    
            const updatedRequest = await apiRequest.put(`/${type}/update`, {studentInfo});
            
            setStudentInfo(updatedRequest.data);
            alert("Application Approved");
            setIsSubmitted(true);
            navigate(`/adminDashboard?name=${currentUser.name}`);
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }


    const handleRejection = async () => {
        setIsDisabled(true);
        setError("");
        
        try{
            studentInfo.status = "Rejected";

            const updatedRequest = await apiRequest.put(`/${type}/update`, {studentInfo});

            setStudentInfo(updatedRequest.data);

            alert("Application Rejected");
            setIsSubmitted(true);
            navigate(`/adminDashboard?name=${currentUser.name}`);  
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }


    if (!studentInfo) {
        return <div>Loading...</div>;
    }


    return (
        <div className="studentDetailPageContainer">
            <h2>Applicant for {type==="degree"?"Degree":"Migration"} Certificate</h2>
            <div className="student-info">
                <div className="detailSection">
                    <div className="item">
                    <p className="field">Name: </p><p> {studentInfo.name}</p>
                    </div>
                    <div className="item">
                    <p className="field">Father's Name: </p><p> {studentInfo.fatherName}</p>
                    </div>
                    <div className="item">
                    <p className="field">Mother's Name:</p><p> {studentInfo.motherName}</p>
                    </div>
                    <div className="item">
                    <p className="field">Enrolment No:</p><p> {studentInfo.enrolmentNo}</p>
                    </div>
                    <div className="item">
                    <p className="field">Date of Birth:</p><p> {studentInfo.dob.split("T")[0]}</p>
                    </div>
                    <div className="item">
                    <p className="field">Gender:</p><p> {studentInfo.gender}</p>
                    </div>
                    <div className="item">
                    <p className="field">Email: </p><p> {studentInfo.email}</p>
                    </div>
                    <div className="item">
                    <p className="field">Phone Number: </p><p> {studentInfo.phoneNumber}</p>
                    </div>
                    <div className="item">
                    <p className="field">Department: </p><p> {studentInfo.department}</p>
                    </div>
                    <div className="item">
                    <p className="field">Course: </p><p>{studentInfo.course}</p>
                    </div>
                    <div className="item">
                    <p className="field">Address: </p><p>{studentInfo.address}</p>
                    </div>
                    <div className="item">
                    <p className="field">Pincode: </p><p>{studentInfo.pincode}</p>
                    </div>
                    <div className="item">
                    <p className="field">Amission Year: </p><p>{studentInfo.admissionYear}</p>
                    </div>
                    <div className="item">
                    <p className="field">Result Date: </p><p>{studentInfo.resultDate.split("T")[0]}</p>
                    </div>
                    <div className="item">
                        <p className="field">Results of any re-appearance exam (supplementary/betterment) pending?</p>
                        <p>{studentInfo.reappearance}</p>
                    </div>

                        </div>
                    
                    
            </div>
            <div className="buttons">
                <div className="degreeOptions">
                    <button hidden={isSubmitted?"hidden":""} className="approveBtn" onClick={handleApprovedStatus} disabled={isDisabled}>Forward</button>
                    <button hidden={isSubmitted?"hidden":""} className="rejectBtn" disabled={isDisabled} onClick={handleRejection}>Reject</button>
                    
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {error && <span>{error}</span>}
        </div>
    );
}

export default StudentDetailPage;

