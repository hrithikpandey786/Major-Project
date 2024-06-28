import Layout from "./routes/Layout/Layout";
import HomePage from "./routes/homePage/HomePage";
import RegisterPage from "./routes/Register Page/RegisterPage";
import StudentDasboard from "./routes/StudentDashboard/StudentDashboard";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard.jsx";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

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
          path: "/studentDashboard",
          element: <StudentDasboard/>
        },
        {
          path: "/adminDashboard",
          element: <AdminDashboard/>
        }
      ]
    }
  ])
  
  
  return (

    <RouterProvider router={router}/>
  )
}

export default App