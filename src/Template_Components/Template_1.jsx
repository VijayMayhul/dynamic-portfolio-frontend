//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import "./Template_1.css"; //importing style sheet

import {
  faGithub,
  faLinkedin,
  faTelegram,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; //importing svg-icons
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //importing fontawesome-icons
//importing solid-icons
import {
  faEnvelope,
  faLocationDot,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons"; //importing solid-icons
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const Template_1 = React.forwardRef((props, ref) => {
  //getting props 
  const { data } = props;

  //getting necessary things from context API
  const { formatDate } = useContext(dpContext);

  //navlink active states
  const [activeLink, setActiveLink] = useState("#T1_Home");

  //handling navlink state active
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  // console.log(data);
  return (
    <div ref={ref}>
      <header>
        <nav className="navbar navbar-expand-lg navbar-white bg-white py-3">
          <div className="container-fluid px-3 px-lg-5 justify-content-between">
            <div className="d-flex justify-content-center flex-row">
              <button
                className="navbar-toggler collapsed me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#T1_navbarNav"
                aria-controls="T1_navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <a
                href="#T1_Home"
                className="navbar-brand d-lg-flex d-inline-block align-items-center"
                onClick={() => handleSetActiveLink("#T1_Home")}
              >
                <h2 className="h2 me-2 mb-0 d-md-block text-info">
                  {data.home.firstName}
                </h2>
              </a>
            </div>
            <div className="collapse navbar-collapse mt-1" id="T1_navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    href="#T1_Home"
                    className={`nav-link ${
                      activeLink === "#T1_Home" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("#T1_Home")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#T1_About"
                    className={`nav-link ${
                      activeLink === "#T1_About" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("#T1_About")}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#T1_Skills"
                    className={`nav-link ${
                      activeLink === "#T1_Skills" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("#T1_Skills")}
                  >
                    Skills
                  </a>
                </li>
                {data.workExperience.length !== 0 && (
                  <li className="nav-item">
                    <a
                      href="#T1_WorkExperience"
                      className={`nav-link ${
                        activeLink === "#T1_WorkExperience" ? "active" : ""
                      }`}
                      onClick={() => handleSetActiveLink("#T1_WorkExperience")}
                    >
                      Experience
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    href="#T1_Education"
                    className={`nav-link ${
                      activeLink === "#T1_Education" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("#T1_Education")}
                  >
                    Education
                  </a>
                </li>
                {data.projects.length !== 0 && (
                  <li className="nav-item">
                    <a
                      href="#T1_Projects"
                      className={`nav-link ${
                        activeLink === "#T1_Projects" ? "active" : ""
                      }`}
                      onClick={() => handleSetActiveLink("#T1_Projects")}
                    >
                      Projects
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    href="#T1_Contact"
                    className={`nav-link ${
                      activeLink === "#T1_Contact" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("#T1_Contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="py-3 bg-white T1-main">
        <section id="T1_Home" className="py-5 bg-body-tertiary">
          <h2 className="h2 text-center">Home</h2>
          <div className="container mt-5 ps-lg-5">
            <div className="row">
              <div className="col-lg-8">
                <h1 className="h1">
                  {data.home.welcomeText}
                  <br /> I'm{" "}
                  <span className="text-info text-capitalize">
                    {data.home.firstName} {data.home.lastName}
                  </span>
                </h1>
                <h3 className="h3 text-warning text-capitalize">
                  {data.home.designation}
                </h3>
                <p className="mt-4 fw-norma">{data.home.shortIntro}</p>
                <a href="#T1_About" className="btn btn-info">
                  About me
                </a>
                <div className="mt-2">
                  <a
                    href={data.contact.socialLinks?.linkedinUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="my-icon" />
                  </a>
                  <a
                    href={data.contact.socialLinks?.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} className="my-icon" />
                  </a>
                  <a
                    href={data.contact.socialLinks?.telegramUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTelegram} className="my-icon" />
                  </a>
                  <a
                    href={data.contact.socialLinks?.facebookUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="my-icon" />
                  </a>
                  <a
                    href={data.contact.socialLinks?.instagramUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="my-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="T1_About" className="py-5">
          <h2 className="h2 text-center">About</h2>
          <div className="container mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10 text-center">
                <p className="fw-normal">{data.about.briefIntro}</p>
                {data.about.resumeUrl !== "" &&
                  data.about.resumeUrl !== undefined && (
                    <a
                      href={data.about.resumeUrl}
                      target="_blank"
                      type="button"
                      className="btn btn-warning mt-3"
                    >
                      Download CV
                    </a>
                  )}
              </div>
            </div>
          </div>
        </section>
        <a href="#T1_Home" className="up-arrow-div rounded-2 px-2 py-1">
          <FontAwesomeIcon
            icon={faArrowUp}
            className="up-arrow-icon text-white"
          />
        </a>
        <section id="T1_Skills" className="py-5 bg-body-tertiary">
          <h2 className="h2 text-center">Skills</h2>
          <div className="container mt-5 text-center">
            <div className="row d-flex justify-content-center align-items-center">
              {data.skills.map((skill, index) => {
                return (
                  <div className="col-12 col-md-4 col-lg-3 mb-3" key={index}>
                    <div className="card skill-card d-flex justify-content-center align-items-center rounded-0">
                      <p className="mb-0 py-2 fw-bold text-capitalize">
                        {skill}
                      </p>
                      <div className="skill-card-bottom-div"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {data.workExperience.length !== 0 && (
          <section id="T1_WorkExperience" className="py-5">
            <h2 className="h2 text-center">Work Experience</h2>
            <div className="container mt-5">
              <div className="row d-flex justify-content-center align-items-center ps-lg-5">
                {data.workExperience.map((works, index) => {
                  return (
                    <div className="col-12 col-md-8 d-flex ms-lg-5 ps-lg-5" key={index}>
                      <div className="work-item">
                        <h5 className="text-warning text-capitalize">
                          {works.designation}
                        </h5>
                        <h6 className="text-secondary text-capitalize">
                          {works.companyName},{" "}
                          <em className="fw-light">{works.location}</em>
                        </h6>
                        <h6 className="duration">
                          {formatDate(works.from)} - {formatDate(works.to)}
                        </h6>

                        <ul>
                          <li className="fw-normal">{works.workDetails}</li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        <section id="T1_Education" className="py-5 bg-body-tertiary">
          <h2 className="h2 text-center">Education</h2>
          <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center ps-lg-5">
              {data.education.map((study, index) => {
                return (
                  <div className="col-12 col-md-8 d-flex ms-lg-5 ps-lg-5" key={index}>
                    <div className="study-item">
                      <h5 className="text-primary text-capitalize">
                        {study.courseName}
                      </h5>
                      <h6 className="text-secondary text-capitalize">
                        {study.institutionName},{" "}
                        <em className="fw-light">{study.location}</em>
                      </h6>
                      <h6 className="duration">
                        {formatDate(study.from)} - {formatDate(study.to)}
                      </h6>
                      {study.courseInfo && (
                        <ul>
                          <li className="fw-normal">{study.courseInfo}</li>
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <a href="#T1_Contact" className="down-arrow-div rounded-2 px-2 py-1">
          <FontAwesomeIcon
            icon={faArrowDown}
            className="up-arrow-icon text-white"
          />
        </a>
        {data.projects.length !== 0 && (
          <section id="T1_Projects" className="py-5">
            <h2 className="h2 text-center">Projects</h2>
            <div className="container mt-5">
              <div className="row d-flex justify-content-center">
                {data.projects.map((project, index) => {
                  return (
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="card p-3 project-card bg-body-tertiary text-center h-100">
                        <div className="card-head">
                          <h4 className="title text-capitalize">
                            {project.projectName}
                          </h4>
                        </div>
                        <div className="card-body">
                          <p className="description fw-normal">
                            {project.projectDetails}
                          </p>
                          {project.techUsed.length > 1 && (
                            <div className="tech m-2 d-flex justify-content-evenly flex-wrap">
                              {project.techUsed.map((techs, index) => {
                                return (
                                  <span
                                    key={index}
                                    className="text-white bg-dark py-1 px-2 mx-1 my-1 rounded-2 text-capitalize"
                                  >
                                    {techs}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {project.projectLink && (
                          <div className="card-footer bg-transparent border-top-0 mt-2">
                            <a
                              href={project.projectLink}
                              target="_blank"
                              className="btn btn-dark text-warning"
                            >
                              Project Link
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="T1_Contact" className="py-5 bg-body-tertiary">
          <h2 className="h2 text-center">Contact</h2>
          <div className="container mt-5">
            <div className="row mt-2">
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="info-box">
                  <FontAwesomeIcon icon={faLocationDot} className="icon" />
                  <h3>My Address</h3>
                  <p className="text-secondary">{data.contact.location}</p>
                </div>
              </div>

              <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
                <div className="info-box">
                  <FontAwesomeIcon icon={faShareAlt} className="icon" />
                  <h3>Social Profiles</h3>
                  <div className="social-links">
                    <a
                      href={data.contact.socialLinks?.linkedinUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="my-icon" />
                    </a>
                    <a
                      href={data.contact.socialLinks?.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} className="my-icon" />
                    </a>
                    <a
                      href={data.contact.socialLinks?.telegramUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faTelegram} className="my-icon" />
                    </a>
                    <a
                      href={data.contact.socialLinks?.facebookUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="my-icon" />
                    </a>
                    <a
                      href={data.contact.socialLinks?.instagramUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faInstagram} className="my-icon" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-4 d-flex align-items-stretch">
                <div className="info-box">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />

                  <h3>Email Me</h3>
                  <p>
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="text-decoration-none"
                    >
                      {data.contact.email}
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-6 mt-4 d-flex align-items-stretch">
                <div className="info-box">
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <i className="bx bx-phone-call"></i>
                  <h3>Call Me</h3>
                  <p>{data.contact.phoneNo}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-3 bg-dark">
        <p className="m-0 py-2 text-center text-white">
          Design and Developed by{" "}
          <span className="text-primary">Vijay Sundaram</span>
        </p>
      </footer>
    </div>
  );
});

export default Template_1;
