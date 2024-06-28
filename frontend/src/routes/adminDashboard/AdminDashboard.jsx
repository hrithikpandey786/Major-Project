import React from "react"
// import './App.css';
// import headerpic from "./image6.png"
import TableData from "../../components/tableData/TableData.jsx"
import "./adminDashboard.scss";


export default function AdminDashboard(){
    
    const [studentData, setStudentData] = React.useState([{
        name: "Hrithik",
        rollNo: 2022073031,
        address: "Varanasi",
        status: "Requested"
      },
      {
        name: "Anup",
        rollNo: 2022104018,
        address: "Gorakhpur",
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
              <th>ROLL NO</th>
              <th>ADDRESS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {
              studentData.map(data=>{
                return <TableData data={data}/>
              })
            }
          </tbody>
        </table>
        </div>
      </div>
    )
}