//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { NavLink, Outlet } from "react-router-dom"; //importing NavLink for manual navigation
import "./Form.css"; //importing style sheet

const Portfolio_Form = () => {

  //getting necessary things from context API
  const { portfolioAction } = useContext(dpContext);

  //navlink dropdown select state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownBtnTxt, setDropdownBtnTxt] = useState("Home");

  //navlink dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //navlink dropdown close
  const clickDropdownClose = (txt)=>{
    setDropdownBtnTxt(txt);
    setIsDropdownOpen(!isDropdownOpen);
  }
  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card bg-body-tertiary shadow-2-strong">
              <div className="card-title">
                <h1
                  className={`h1 pt-3 mb-0 text-center text-capitalize ${
                    portfolioAction === "create"
                      ? "text-primary"
                      : "text-warning"
                  }`}
                >
                  {portfolioAction} Portfolio
                </h1>
              </div>
              <div>
                {/* Dropdown for smaller screens */}
                <div className="ps-3 d-lg-none text-center mt-3">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    onClick={toggleDropdown}
                  >
                    {dropdownBtnTxt}
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-menu show w-75">
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Home")}
                        to={`/user/port_folio/${portfolioAction}/section-home`}
                      >
                        Home
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("About")}
                        to={`/user/port_folio/${portfolioAction}/section-about`}
                      >
                        About
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Skills")}
                        to={`/user/port_folio/${portfolioAction}/section-skills`}
                      >
                        Skills
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Work Experience")}
                        to={`/user/port_folio/${portfolioAction}/section-workExperience`}
                      >
                        Work Experience
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Education")}
                        to={`/user/port_folio/${portfolioAction}/section-education`}
                      >
                        Education
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Projects")}
                        to={`/user/port_folio/${portfolioAction}/section-projects`}
                      >
                        Projects
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => clickDropdownClose("Contact")}
                        to={`/user/port_folio/${portfolioAction}/section-contact`}
                      >
                        Contact
                      </NavLink>
                    </div>
                  )}
                </div>

                {/* Row for larger screens */}
                <div className="d-none d-lg-flex justify-content-center form-nav-links">
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-home`}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-about`}
                  >
                    About
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-skills`}
                  >
                    Skills
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-workExperience`}
                  >
                    Work Experience
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-education`}
                  >
                    Education
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-projects`}
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to={`/user/port_folio/${portfolioAction}/section-contact`}
                  >
                    Contact
                  </NavLink>
                </div>
              </div>
              <hr />
              <div className="card-body pb-4 px-md-5 pt-0">
                <p className="text-lg-end text-start fw-bold mb-0">
                  Please fill all (<span className="text-danger">*</span>)
                  required fields
                </p>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio_Form;
