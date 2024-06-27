import React from "react";
import "./registerPage.scss";

export default function RegisterPage(){
        const [formData, setFormData] = React.useState({
            name: '',
            enrollmentNo: '',
            rollNo: '',
            dob: '',
            email: '',
            phoneNumber: '',
            password: '',
            course: '',
            branch: '',
            gender: '',
            address: '',
            pincode: '',
            reappearance: ''
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log('Form Data:', formData);
        };
    
        const branches = {
            MCA: ['Information Technology'],
            'B.TECH': ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
            'M.SC': ['Physics', 'Chemistry', 'Mathematics'],
            'B.PHARMA': ['Pharmaceutical Chemistry', 'Pharmacology'],
            'M.TECH': ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
            'P.HD': ['Computer Science', 'Physics', 'Mathematics']
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
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="item">
                            <label htmlFor="enrollmentNo">Enrollment No.:</label>
                            <input
                                type="text"
                                id="enrollmentNo"
                                name="enrollmentNo"
                                value={formData.enrollmentNo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="item">
                        <label htmlFor="rollNo">Roll No.:</label>
                    <input
                        type="text"
                        id="rollNo"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                    />
                        </div>
                    
                        <div className="item">
                        <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                        </div>
                    
                        <div className="item">
                        <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                        </div>
            
                    <div className="item">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    
                    <div className="item">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </div>
    
                    <div className="item">
                    <label htmlFor="course">Course:</label>
                    <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a course</option>
                        <option value="MCA">MCA</option>
                        <option value="B.TECH">B.TECH</option>
                        <option value="M.SC">M.SC</option>
                        <option value="B.PHARMA">B.PHARMA</option>
                        <option value="M.TECH">M.TECH</option>
                        <option value="P.HD">P.HD</option>
                    </select>
                    </div>
                    
                    <div className="item">
                    <label htmlFor="branch">Branch:</label>
                    <select
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a branch</option>
                        {branches[formData.course]?.map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                    </div>
                    
                    <div className="gender-container">
                    <p>Gender:</p>
                    <div>
                    <input type="radio" id="male" name="gender" value="male"></input>
                      <label htmlFor="male">MALE</label>
                    </div>
                    <div>
                    <input type="radio" id="female" name="gender" value="female"/>
                      <label htmlFor="female">FEMALE</label><br></br>
                    </div>
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
                        value={formData.pincode}
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
                                checked={formData.reappearance === 'yes'}
                                onChange={handleChange}
                                required
                            />
                        <label htmlFor="">Yes</label>
                    </div>
                    <div>
                            <input
                                id="no"
                                type="radio"
                                name="reappearance"
                                value="no"
                                checked={formData.reappearance === 'no'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="no">No</label>
                            
                    </div>
                    </div>
                    
    
                    <button>Submit</button>
                </form>
                    </div>
                </div>
                
            </div>
        );
}