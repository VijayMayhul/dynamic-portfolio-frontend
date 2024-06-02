//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom"; //importing outlet
import Navbar from "./Navbar"; //importing navbar component
import Footer from "./Footer"; //importing Footer component
import "./Main.css"; //importing style sheet
import { dpContext } from "../Context_Api_Component"; //imporing dpContext

const User = () => {

  //getting necessary things from context API
  const { token, fetchUserData, userData, setPortfolioAction } = useContext(dpContext);

  //fetching user data
  useEffect(() => {
    if (token) {
      localStorage.setItem("portfolioToken", token);
      fetchUserData(token);
    }
  }, [userData.portfolio_id]);

  //setting up the portfolioAction in state as well as in local storage 
  useEffect(() => {
    if (userData.portfolio_id === null || userData.portfolio_id === undefined) {
      setPortfolioAction("create");
      localStorage.setItem("portfolioAction", "create");
    } else {
      setPortfolioAction("update");
      localStorage.setItem("portfolioAction", "update");
    }
  }, [userData.portfolio_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  );
};

export default User;
