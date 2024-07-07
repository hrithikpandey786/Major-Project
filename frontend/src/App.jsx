import {Layout, RequireAdminAuth, RequireStudentAuth} from "./routes/Layout/Layout";
import HomePage from "./routes/homePage/HomePage";
import RegisterPage from "./routes/Register Page/RegisterPage";
import DegreeRequestPage from "./routes/DegreeRequestPage/DegreeRequestPage.jsx";
import MigrationRequestPage from "./routes/MigrationRequestPage/MigrationRequestPage.jsx";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard.jsx";
import OptionPage from "./routes/OptionPage/OptionPage.jsx";
import StudentDetailPage from "./routes/StudentDetailPage/StudentDetailPage.jsx";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { degreeLoader, migrationLoader, fetchDegreeRequests, fetchStudentDetails } from "../lib/loader.js";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element: <HomePage/>
        },
        {
          path: "/register",
          element: <RegisterPage/>
        },
      ]
    },
    {
      path: "/",
      element: <RequireAdminAuth/>,
      children:[
        {
          path: "/studentDetail/:enrolmentNo",
          element: <StudentDetailPage/>,
          loader: fetchStudentDetails
        },
        {
          path: "/adminDashboard",
          element: <AdminDashboard/>,
          loader: fetchDegreeRequests
        }
    ]
    },
    {
      path:"/",
      element: <RequireStudentAuth/>,
      children: [
        {
          path: "/optionPage/:id",
          element: <OptionPage/>
        },
        {
          path: "/degreeRequest/:id",
          element: <DegreeRequestPage/>,
          loader: degreeLoader
        },
        {
          path: "/migrationRequest/:id",
          element: <MigrationRequestPage/>,
          loader: migrationLoader
        }
        
      ]
    }
  ])
  
  
  return (

    <RouterProvider router={router}/>
  )
}

export default App