import React from 'react';
import StudentLogin from '../../components/Student Login/StudentLogin';
import AdminLogin from '../../components/AdminLogin/AdminLogin';
import './homePage.scss';

function HomePage() {
    const [studentLogin, setStudentLogin] = React.useState(true);

    return (
        <div className="home-container">
            <div className="heading">
            <h1>Certificate Requisition Portal</h1>
            </div>

            <div className="buttons">
                <button className={studentLogin?"studentButton active":"studentButton"} onClick={()=>setStudentLogin(true)}>Student Login</button>
                <button className={studentLogin?"adminButton":"adminButton active"} onClick={()=>setStudentLogin(false)}>Admin Login</button>
            </div>
            
            <div className="inputSection">
                {studentLogin?<StudentLogin/>:<AdminLogin/>}
            </div>
        </div>
    );
}

export default HomePage;
