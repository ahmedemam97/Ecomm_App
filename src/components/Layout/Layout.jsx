import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Offline } from "react-detect-offline";

function Layout() {


  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Offline>
        <div className="offline">
          <i className="fas fa-wifi me-2"></i>
          you are offline now (surprise!)
        </div>
      </Offline>
      <Footer />
    </>
  );
}

export default Layout;
