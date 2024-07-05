import React from "react"
import { useNavigate } from "react-router-dom";
// import './App.css';
// import headerpic from "./image6.png"
import TableData from "../../components/tableData/TableData.jsx"
import "./adminDashboard.scss";
import apiRequest from "../../../lib/apiRequest.js";
import { AuthContext } from "../../../context/AuthContext.jsx";


export default function AdminDashboard(){
  const [error, setError] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const {updateUser} = React.useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout(){
    setError(false);
    setIsDisabled(true);

    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch(err){
      console.log(err);
      setError(err.response.data.message);
    }
  }
    
    const [studentData, setStudentData] = React.useState([{
        name: "Hrithik Pandey",
        enrolmentNo: 2022071,
        branch: "B.Tech",
        status: "Requested"
      },
      {
        name: "Anup",
        enrolmentNo: 2022108,
        branch: "MCA",
        status: "Fulfilled"
      }]);
    
      function addStudentData(){
        setStudentData();
      }

    return (
      <div className="adminDashboard">
        <h3>ADMIN DASHBOARD</h3>
        <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ENROLMENT NO</th>
              <th>BRANCH</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {
              studentData.map((data, index)=>{
                return <TableData data={data} key={index}/>
              })
            }
          </tbody>
        </table>
        </div>

        <button disabled={isDisabled} onClick={handleLogout}>Logout</button>
        {error && <span>{error}</span>}
      </div>
    )
}