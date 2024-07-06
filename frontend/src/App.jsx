import Layout from "./routes/Layout/Layout";
import HomePage from "./routes/homePage/HomePage";
import RegisterPage from "./routes/Register Page/RegisterPage";
import DegreeRequestPage from "./routes/DegreeRequestPage/DegreeRequestPage.jsx";
import MigrationRequestPage from "./routes/MigrationRequestPage/MigrationRequestPage.jsx";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard.jsx";
import OptionPage from "./routes/OptionPage/OptionPage.jsx";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { degreeLoader, migrationLoader } from "../lib/loader.js";


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
        {
          path: "/degreeRequest/:id",
          element: <DegreeRequestPage/>,
          loader: degreeLoader
        },
        {
          path: "/migrationRequest/:id",
          element: <MigrationRequestPage/>,
          loader: migrationLoader
        },
        {
          path: "/adminDashboard",
          element: <AdminDashboard/>
        },
        {
          path: "/optionPage/:id",
          element: <OptionPage/>
        }
      ]
    }
  ])
  
  
  return (

    <RouterProvider router={router}/>
  )
}

export default App