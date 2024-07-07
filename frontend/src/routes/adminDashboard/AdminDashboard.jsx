import React from "react"
import { useNavigate } from "react-router-dom";
// import './App.css';
// import headerpic from "./image6.png"
import TableData from "../../components/tableData/TableData.jsx"
import "./adminDashboard.scss";
import apiRequest from "../../../lib/apiRequest.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useLoaderData } from "react-router-dom";


export default function AdminDashboard(){
  const degreeRequests = useLoaderData();
  // console.log();
  const [error, setError] = React.useState("");
  const [degreeReq, setDegreeReq] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [data, setData] = React.useState(degreeRequests);
  const {currentUser, updateUser} = React.useContext(AuthContext);
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

      
      
      async function fetchDegeeRequests(){

        let statusFilter = "";
        let approved = "";
        let departmentFilter = "";
        let rejected = "";

        
        if(currentUser.name==="Dean UG Office"){
          statusFilter = "Pending at Dean UG Office"
        } else if(currentUser.name==="Registrar Office"){
          statusFilter = "Pending at Registrar Office";
          approved = "Approved";
          rejected = "Rejected";
        } else if(currentUser.name==="Dean PG Office"){
          statusFilter = "Pending at Dean PG Office"
        } 
        else {
          statusFilter = "Pending at Department";
          departmentFilter = "Department of "
        }

        try{
          const requests = await apiRequest.get("/degree/");
          
          // const filtered = requests.data.filter((request)=> 
          //   {request.status===statusFilter||approved && 
          //     (departmentFilter&&departmentFilter+request.department===currentUser.name)
          //   });
          
          let filtered = requests.data.filter(request=>request.status===statusFilter||request.status===approved||request.status===rejected)
          
          if(departmentFilter){
            filtered = filtered.filter((request)=>departmentFilter+request.department===currentUser.name)
          }

          
          setData(filtered);
        } catch(err){
          console.log(err);
          setError(err.response.data.message);
        }
      }



      async function fetchMigrationRequests(){

        let statusFilter = "";
        let approved = "";
        let departmentFilter = "";
        let rejected = "";


        if(currentUser.name==="Dean UG Office"){
          statusFilter = "Pending at Dean UG Office"
        } else if(currentUser.name==="Registrar Office"){
          statusFilter = "Pending at Registrar Office";
          approved = "Approved";
          rejected = "Rejected"
        } else if(currentUser.name==="Dean PG Office"){
          statusFilter = "Pending at Dean PG Office"
        } 
        else {
          statusFilter = "Pending at Department";
          departmentFilter = "Department of "
        }

        try{
          const requests = await apiRequest.get("/migration/");
          
          
          let filtered = requests.data.filter(request=>request.status===statusFilter||request.status===approved || request.status===rejected);
          
          if(departmentFilter){
            filtered = filtered.filter((request)=>departmentFilter+request.department===currentUser.name)
          }

          setData(filtered);
        } catch(err){
          console.log(err);
          setError(err.response.data.message);
        }
      }
    
      function addStudentData(){
        setStudentData();
      }

    return (
      <div className="adminDashboard">
        <div className="heading">
        <h3>{currentUser.name}</h3>
        </div>
        <div className="buttons">
                <button className={degreeReq?"degreeButton active":"degreeButton"} onClick={()=>{setDegreeReq(true); fetchDegeeRequests()}}>Degree Requests</button>
                <button className={degreeReq?"migrationButton":"migrationButton active"} onClick={()=>{setDegreeReq(false); fetchMigrationRequests()}}>Migration Requests</button>
            </div>
        <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ENROLMENT NO</th>
              <th>COURSE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {
              
              data.map((data, index)=>{
                return <TableData data={data} key={index} type={degreeReq?"degree":"migration"}/>
              })
            }
          </tbody>
        </table>
        </div>

        <button className="logout" disabled={isDisabled} onClick={handleLogout}>Logout</button>
        {error && <span>{error}</span>}
      </div>
    )
}