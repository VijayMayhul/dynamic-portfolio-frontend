import React, { useContext } from "react"; //importing useContext to use context api
import { NavLink, useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import './Main.css'; //importing style sheet

const Navbar = () => {

  //getting necessary things from context API
  const { userData, setToken, setUserData, setPortfolioAction, notifyInfo } =
    useContext(dpContext);

  //using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //log out method
  const logout = () => {
    setToken("");
    setUserData({});
    setPortfolioAction("");
    localStorage.removeItem("portfolioAction");
    localStorage.removeItem("portfolioTokenExpiration");
    localStorage.removeItem("portfolioToken");
    notifyInfo('Logged out');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid px-3 px-lg-5 justify-content-between">
        {/* through NavLink tab declaring where to navigate by click */}
        <div className="d-flex justify-content-center flex-row">
          <button
            className="navbar-toggler collapsed me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbarNav"
            aria-controls="mainNavbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink
            to={"/user/home"}
            className="navbar-brand d-lg-flex d-inline-block align-items-center"
          >
            <h2 className="h2 me-2 mb-0 d-md-block web-title">YourPortfolio</h2>
          </NavLink>
        </div>
        <div className="collapse navbar-collapse mt-1" id="mainNavbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={"/user"} className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/user/portfolio"} className="nav-link ">
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/user/contact"} className="nav-link ">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-nav portfolio-img-profile-div">
          <li className="nav-item d-none d-lg-flex align-items-center text-white">
            <p className="mb-0 fw-bold text-info">{userData.firstName || "user"}</p>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle rounded-circle"
              id="profileNavbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              to="#"
            >
              <img
                className="img-profile rounded-circle"
                src="/Images/profile.jfif"
                alt="User-Profile"
              />
            </NavLink>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileNavbarDropdown"
              id="logoutBut"
            >
              <li>
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
