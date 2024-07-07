import React from "react";
import { useNavigate } from "react-router-dom";
import "./registerPage.scss";
import axios from "axios";


export default function RegisterPage(){
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [department, setDepartment] = React.useState("");
    const [error, setError] = React.useState("");

    function handleChange(e){
        setDepartment(e.target.value);

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
            
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        setError(null);
        // console.log(inputs);

        try{
            const res = await axios.post("http://localhost:8800/api/auth/register", {
                name: inputs.name,
                enrolmentNo: parseInt(inputs.enrolmentNo),
                dob: inputs.dob,
                email: inputs.email,
                phoneNumber: parseInt(inputs.phoneNumber),
                department: inputs.department,
                course: inputs.course,
                password: inputs.password,
                gender: inputs.gender
            });
            
            navigate("/");
        } catch(err){
            console.log(err);
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    };

        const courses = {
            'Information Technology and Computer Application': ['MCA', 'M.TECH', 'B.TECH'],
            'Computer Science and Engineering': ['B.TECH', 'M.TECH'],
            'Electrical Engineering': ['B.TECH', 'M.TECH'],
            'Mechanical Engineering': ['B.TECH', 'M.TECH', 'PhD'],
            'Civil Engineering': ['B.TECH', 'M.TECH'],
            'Physics and Material Science': ['B.TECH', 'M.TECH', 'MSc', 'PhD'],
            'Chemical Engineering': ['B.TECH'],
            'Managemnet Studies': ['BBA', 'MBA'],
            'Chemistry and Environmental Science': ['MSc', 'PhD'],
            'Mathematics and Scientific Computing': ['MSc', 'PhD'],
            'Pharmacy': ['B.Pharma']
        };
    
        return (
            <div className="registerPage">
                <div className="formContainer">
                    <h2>Student Registration</h2>
                    <div className="wrapper">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                // value={formData.name}
                                // onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="item">
                            <label htmlFor="enrolmentNo">Enrolment No.:</label>
                            <input
                                type="number"
                                id="enrolmentNo"
                                name="enrolmentNo"
                                // value={formData.enrolmentNo}
                                // onChange={handleChange}
                                required
                            />
                        </div>
                    
                        <div className="item">
                        <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                // value={formData.dob}
                                // onChange={handleChange}
                                required
                            />
                        </div>
                    
                        <div className="item">
                        <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        required
                    />
                        </div>
            
                    <div className="item">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        // value={formData.phoneNumber}
                        // onChange={handleChange}
                        required
                    />
                    </div>
                    
                    <div className="item">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        required
                    />
                    </div>
    
                    <div className="item">
                    <label htmlFor="department">Department:</label>
                    <select
                        id="department"
                        name="department"
                        value={department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a department</option>
                        <option value="Information Technology and Computer Application">Information Technology and Computer Application</option>
                        <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Physics and Material Science">Physics and Material Science</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Managemnet Studies">Managemnet Studies</option>
                        <option value="Chemistry and Environmental Science">Chemistry and Environmental Science</option>
                        <option value="Mathematics and Scientific Computing">Mathematics and Scientific Computing</option>
                        <option value="Pharmacy">Pharmacy</option>
                    </select>
                    </div>
                    
                    <div className="item">
                    <label htmlFor="course">Course:</label>
                    <select
                        id="course"
                        name="course"
                        // value={formData.branch}
                        // onChange={handleChange}
                        required
                    >
                        <option value="">Select a Course</option>
                        {courses[department]?.map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                    </div>
                    
                    <div className="gender-container">
                    <p>Gender:</p>
                    <div>
                    <input type="radio" id="male" name="gender" value="Male"></input>
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                    <input type="radio" id="female" name="gender" value="Female"/>
                      <label htmlFor="female">Female</label><br></br>
                    </div>
                    </div>
                    
    
                    <button disabled={isDisabled}>Register</button>
                </form>
                {error && <span>{error}</span>}
                    </div>
                </div>
                
            </div>
        );
}