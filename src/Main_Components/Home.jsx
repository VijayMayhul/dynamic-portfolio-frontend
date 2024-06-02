//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import "./Main.css"; //importing style sheet
import Page_Not_Found from "./Page_Not_Found"; //importing Page not found component

const Home = () => {

  //getting necessary things from context API
  const { userData, portfolioAction, setToken } =
    useContext(dpContext);
  const navigate = useNavigate();

  // Retrieve token from localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem("portfolioToken");
    const storedTokenExpiration = localStorage.getItem(
      "portfolioTokenExpiration"
    );

    if (storedToken && new Date().getTime() < storedTokenExpiration) {
      setToken(storedToken);
    } else {
      navigate("/page-not-found");
    }
  }, [setToken, navigate]);

  return (
    <>
      {userData ? (
        <section className="container d-flex flex-column flex-grow-1 py-5">
          <div className="row d-flex justify-content-center align-items-center flex-grow-1">
            <h1 className="home-title">
              YourPortfolio
              <hr className="text-dark" />
            </h1>
            <p className="home-desc mt-2">
              YourPortfolio is a dynamic platform designed to empower individuals in creating their own personalized portfolios effortlessly. With an intuitive interface, users can select from a variety of portfolio templates and seamlessly input their information to generate a unique portfolio tailored to their preferences. Once created, users have the flexibility to modify or delete content as needed, ensuring their portfolio accurately reflects their professional identity.
            </p>
            <p className="home-desc">
              Beyond customization, YourPortfolio offers enhanced functionality, allowing users to export their portfolios to PDF format for easy sharing and printing. Whether showcasing professional achievements, academic credentials, or creative projects, YourPortfolio simplifies the portfolio creation process, providing users with a seamless and enjoyable experience from start to finish.
            </p>
            <div className="text-center mt-2">
              {portfolioAction !== "create" ? (
                <button className="btn btn-info fw-bold my-2" onClick={() => navigate("/user/portfolio")}>
                  View Portfolio
                </button>
              ) : (
                <button className="btn btn-success my-2 fw-bold" onClick={() => navigate("/user/templates")}>
                  Create Portfolio
                </button>
              )}
            </div>
          </div>
        </section>
      ) : (
        <Page_Not_Found />
      )}
    </>
  );
};

export default Home;
