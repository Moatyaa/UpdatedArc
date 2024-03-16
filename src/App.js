import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/AddRootFolder"
import Cover from "./Components/Cover/Cover"
import Login from "./Components/Login/Login"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import UserContextProvider from "./Context/UserContext"
import Control from "./Components/Control/Control"
import ArcContextProvider from "./Context/ArcTabelContext"
import ChildFolder from "./Components/ChildFolder/ChildFolder"
import ArcTabel from "./Components/ArcContent/ArcTabel"
import ImageToPrint from "./Components/ImageToPrint/ImageToPrint"
import Print from "./Components/Print/Print"
import ScanComponent from "./Components/Scan/Scan"


export default function App() {

  let router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      {
        path: "addRoutFolder",
        element:
          <ProtectedRoute><Home /></ProtectedRoute>

      },
      {
        path: "arcTabel",
        element:
          <ProtectedRoute><ArcTabel /></ProtectedRoute>

      },
      {
        path: "control",
        element:
          <ProtectedRoute><Control /></ProtectedRoute>

      },
      {
        path: "childFolder/:id/",
        element:
          <ProtectedRoute><ChildFolder /></ProtectedRoute>

      },
      {
        path: "imageToPrint",
        element:
          <ProtectedRoute><ImageToPrint /></ProtectedRoute>

      }, {
        path: 'cover',
        element: <Cover />
      }, {
      }, {
        index: true,
        element: localStorage.getItem("token") ? <ArcTabel /> : <Cover />
      }, {
        path: "login",
        element: <Login />
      }
      , {
        path: "scan",
        element: <ScanComponent />
      }
    ]
  }, { path: 'print', element: <Print /> }])
  return <>
    <ArcContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} >
        </RouterProvider>
      </UserContextProvider>
    </ArcContextProvider>

  </>
}