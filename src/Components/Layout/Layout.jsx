import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useContext, useEffect } from "react";
import { userContext } from "../../Context/UserContext";
import Footer from "../Footer/Footer";

export default function Layout() {
  let { setToken, setRole, setFirstName, token } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
      setFirstName(localStorage.getItem("firstName"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      {token ? <Footer /> : ''}
    </>
  );
}
