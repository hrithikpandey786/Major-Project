import "./degreeRequestPage.scss";
import React, { useState, useEffect } from 'react';
import {useNavigate, useLoaderData } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";
import { AuthContext } from "../../../context/AuthContext";
import Razorpay from "razorpay";

function DegreeRequestPage() {
    const {updateUser} = React.useContext(AuthContext);
    const studentData = useLoaderData();
    const [reappearance, setReappearance]= useState("no");
    const [error, setError] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [isDateFilled, setIsDateFilled] = React.useState(false);
    const [isPaymentDone, setIsPaymentDone] = React.useState(false);
    const [studentInfo, setStudentInfo] = useState(studentData.data || null);
    
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        fatherName: "",
        motherName: "",
        resultDate: "",
        address: "",
        pincode: "",
        admissionYear: ""
    });

    
    function handleChange(event){
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setFormData(prev=>{
            return {...prev, [name]: value}
        })

        if(name==="resultDate"){
            setIsDateFilled(true);
        }
    }
    
    async function handleSubmit(){
        setError("");
        setIsDisabled(true);

        try{
            const newApplication = await apiRequest.post("/degree/add", {
                name: studentInfo.registeredStudent.name,
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                enrolmentNo: studentInfo.registeredStudent.enrolmentNo,
                dob: studentInfo.registeredStudent.dob.split("T")[0],
                email: studentInfo.registeredStudent.email,
                phoneNumber: studentInfo.registeredStudent.phoneNumber,
                address: formData.address,
                resultDate: formData.resultDate,
                pincode: parseInt(formData.pincode),
                reappearance: reappearance,
                gender: studentInfo.registeredStudent.gender,
                department: studentInfo.registeredStudent.department,
                course: studentInfo.registeredStudent.course,
                admissionYear: parseInt(formData.admissionYear),
            })

            alert("Application Submitted");
            
            window.location.reload();
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }


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

    async function handleStatus(){
        setError("");
        setIsDisabled(true);

        try{
            const status = await apiRequest.get("/degree/application/status");
            
            setError(status.data);
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }


    async function initPayment(data) {
        const key_id = import.meta.env.KEY_ID;
        const options = {
            key: key_id,
            name: "MMMUT Degree Fee",
            amount: 1000,
            currency: data.currency,
            description: "Test transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const { data } = await apiRequest.post('/payment/verify', response);
                    setIsPaymentDone(true);
                } catch (err) {
                    console.error('Error in handler:', err);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
    
    
        if (typeof window.Razorpay === 'function') {
            try {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch (error) {
                console.error('Error initializing Razorpay:', error);
            }
        } else {
            console.error('Razorpay SDK not loaded');
        }
    }

    
    async function handlePayment() {
        setError("");

        try {
            const { data } = await apiRequest.post('/payment/orders', { amount: 1000 }); 
            
            initPayment(data.data);
        } catch (error) {
            console.error('Error in handlePayment:', error);
        }
    }
    
    if (!studentInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="degreeRequestContainer">
            <h2>Application for Degree</h2>
            <div className="student-info">
                <div className="detailSection">
                    <div className="item">
                    <p className="field">Name:</p><p> {studentInfo.registeredStudent.name}</p>
                    </div>
                    <div className="item">
                        <label htmlFor="fatherName">Father's Name:</label>
                        <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            // value={formData.pincode}
                            placeholder={studentInfo.request&&studentInfo.request.fatherName||"Enter Father's Name"}
                            disabled={studentInfo.request?true:false}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="motherName">Mother's Name:</label>
                        <input
                            type="text"
                            id="motherName"
                            name="motherName"
                            // value={formData.pincode}
                            placeholder={studentInfo.request&&studentInfo.request.motherName||"Enter Mother's Name"}
                            disabled={studentInfo.request?true:false}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="item">
                    <p className="field">Enrolment No:</p><p> {studentInfo.registeredStudent.enrolmentNo}</p>
                    </div>
                    <div className="item">
                    <p className="field">Date of Birth:</p><p> {studentInfo.registeredStudent.dob.split("T")[0]}</p>
                    </div>
                    <div className="item">
                    <p className="field">Gender:</p><p> {studentInfo.registeredStudent.gender}</p>
                    </div>
                    <div className="item">
                    <p className="field">Email:</p><p> {studentInfo.registeredStudent.email}</p>
                    </div>
                    <div className="item">
                    <p className="field">Phone Number:</p><p> {studentInfo.registeredStudent.phoneNumber}</p>
                    </div>
                    <div className="item">
                    <p className="field">Department:</p><p> {studentInfo.registeredStudent.department}</p>
                    </div>
                    <div className="item">
                    <p className="field">Course: </p><p>{studentInfo.registeredStudent.course}</p>
                    </div>
                    
                    
                        <div className="item">
                        <label htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            // value={formData.address}
                            placeholder={studentInfo.request&&studentInfo.request.address||"Enter Address"}
                            disabled={studentInfo.request?true:false}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="item">
                        <label htmlFor="pincode">Pincode:</label>
                        <input
                            type="number"
                            id="pincode"
                            name="pincode"
                            // value={formData.pincode}
                            placeholder={studentInfo.request&&studentInfo.request.pincode||"Enter Pincode"}
                            disabled={studentInfo.request?true:false}
                            onChange={handleChange}
                            className="admissionYear"
                            required
                        />
                    </div>

                    <div className="item">
                        <label htmlFor="admissionYear">Admission Year:</label>
                        <input
                            type="number"
                            id="admissionYear"
                            name="admissionYear"
                            // value={formData.admissionYear}
                            onChange={handleChange}
                            placeholder={studentInfo.request&&studentInfo.request.admissionYear||"Enter Admission Year"}
                            disabled={studentInfo.request?true:false}
                            className="admissionYear"
                            required
                        />
                    </div>                    
            
                <div className="item">
                        <label htmlFor="resultDate">Result Date:</label>
                            <input
                                type="date"
                                id="resultDate"
                                name="resultDate"
                                // value={formData.resultDate}
                                placeholder={studentInfo.request&&studentInfo.request.resultDate.split("T")[0]||""}
                                disabled={studentInfo.request?true:false}
                                onChange={handleChange}
                                className="resultDate"
                                max="2024-06-30"
                                required
                            />
                        </div>

                        </div>

                    <div className="reappearance">
                        <label>Results of any re-appearance exam (supplementary/betterment) pending?</label>
                    <div>
                        <input
                            id="yes"
                            type="radio"
                            name="reappearance"
                            disabled={studentInfo.request?true:false}
                            // value="yes"
                            onClick={()=>setReappearance("yes")}
                            // onChange={handleChange}
                            required
                        />
                        <label htmlFor="yes">Yes</label>
                    </div>
                    <div>
                            <input
                                id="no"
                                type="radio"
                                name="reappearance"
                                // value="no"
                                disabled={studentInfo.request?true:false}
                                onClick={()=>setReappearance("no")}
                                // onChange={handleChange}
                                required
                            />
                            <label htmlFor="no">No</label>
                            
                    </div>
                    </div>
                
                    
                    
                    
                    
            </div>
            <div className="buttons">
                <div className="degreeOptions">
                    <button onClick={handlePayment} disabled={!isDateFilled || isDisabled}>Pay</button>
                    {!studentInfo.request
                        ?<button onClick={handleSubmit} disabled={isDisabled || !isPaymentDone}>Submit</button>
                        :<button onClick={handleStatus} disabled={isDisabled}>Check Status</button>}                
                </div>
                    <button onClick={handleLogout} disabled={isDisabled}>Logout</button>
            </div>

            {error && <span>{error}</span>}
        </div>
    );
}

export default DegreeRequestPage;

