import React from "react";
import "./registerPage.scss";

export default function RegisterPage(){
        
    const [department, setDepartment] = React.useState("");

    function handleChange(e){
        setDepartment(e.target.value);

    }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const inputs = Object.fromEntries(formData);
            console.log(inputs);
        };
    
        // const branches = {
        //     'Information Technology': ['MCA', 'M.TECh'],
        //     'B.TECH': ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
        //     'M.SC': ['Physics', 'Chemistry', 'Mathematics'],
        //     'B.PHARMA': ['Pharmaceutical Chemistry', 'Pharmacology'],
        //     'M.TECH': ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
        //     'P.HD': ['Computer Science', 'Physics', 'Mathematics']
        // };

        const courses = {
            'Information Technology and Computer Science': ['MCA', 'M.TECH', 'B.TECH'],
            'Computer Science Engineering': ['B.TECH', 'M.TECH'],
            'Electrical Engineering': ['B.TECH', 'M.TECH'],
            'Mechanical Engineering': ['B.TECH', 'M.TECH', 'PhD'],
            'Civil Engineering': ['B.TECH', 'M.TECH'],
            'Physics and Material Science': ['B.TECH', 'M.TECH', 'MSc', 'PhD'],
            'Chemical Engineering': ['B.TECH'],
            'Managemnet Studies': ['BBA', 'MBA'],
            'Chemistry and Environment Science': ['MSc', 'PhD'],
            'Mathematics and Scientific Computing': ['MSc', 'PhD'],
            'Department of Pharmacy': ['B.Pharma']
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
                            <label htmlFor="enrollmentNo">Enrollment No.:</label>
                            <input
                                type="text"
                                id="enrollmentNo"
                                name="enrollmentNo"
                                // value={formData.enrollmentNo}
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
                        <option value="Information Technology and Computer Science">Information Technology and Computer Science</option>
                        <option value="Computer Science Engineering">Computer Science Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Physics and Material Science">Physics and Material Science</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Managemnet Studies">Managemnet Studies</option>
                        <option value="Chemistry and Environment Science">Chemistry and Environment Science</option>
                        <option value="Mathematics and Scientific Computing">Mathematics and Scientific Computing</option>
                        <option value="Department of Pharmacy">Department of Pharmacy</option>
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
                    <input type="radio" id="male" name="gender" value="male"></input>
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                    <input type="radio" id="female" name="gender" value="female"/>
                      <label htmlFor="female">Female</label><br></br>
                    </div>
                    </div>
                    
    
                    <button>Register</button>
                </form>
                    </div>
                </div>
                
            </div>
        );
}