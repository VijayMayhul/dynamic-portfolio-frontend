//importing createContext to create context api and useState to create state variables
import React, { createContext, useState} from "react";
import { format } from "date-fns"; //importing format to formatting the date
import axios from "axios"; //importing axios to do CRUD with API
import _ from "lodash"; //importing _ to create cloned values
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import { ToastContainer, toast, Bounce } from "react-toastify"; //importing react-toastify to show good UI pop-ups
import "react-toastify/dist/ReactToastify.css"; //importing style for the toast


export const dpContext = createContext(); //creating context api

const Context_Api_Component = ({ children }) => {

  //giving style for the toast
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  //defining different toasts
  const notifySuccess = (message) => toast.success(message, toastStyle);
  const notifyError = (message) => toast.error(message, toastStyle);
  const notifyInfo = (message) => toast.info(message, toastStyle);
  const notifyWarn = (message) => toast.warn(message, toastStyle);
  
  // const backendUrl = import.meta.env.VITE_BACKEND_URL; //getting backendUrl from .env file
  const backendUrl = 'https://dynamic-portfolio-backend-k0sw.onrender.com';
  const navigate = useNavigate(); // Initialize navigate

  //declaring some necessary state variables
  const [token, setToken] = useState(() => localStorage.getItem("portfolioToken") || "");
  const [userData, setUserData] = useState({});
  const [temp, setTemp] = useState("");
  const [userPortfolioData, setUserPortfolioData] = useState({});
  const [localPortfolioData, setLocalPortfolioData] = useState({});
  const [portfolioAction, setPortfolioAction] = useState(() => {
    return localStorage.getItem("portfolioAction") || "";
  });

  //setting up the token expiration and token in local storage
  const setTokenWithExpiration = (newToken, expiresIn = 86400) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem("portfolioToken", newToken);
    localStorage.setItem("portfolioTokenExpiration", expirationTime);
    setToken(newToken);
  };

  //formatting date using date-fns
  const formatDate = (dateString) => {
    if (dateString === "Present") {
      return dateString;
    }
    if (!dateString || isNaN(new Date(dateString))) {
      return dateString;
    }
    return format(new Date(dateString), "MMMM yyyy");
  };
  
  //fetching user data
  const fetchUserData = async (token) => {
    try {
      // Send get request using Axios
      const response = await axios.get(`${backendUrl}/user-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.userData);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Failed to fetch user data:", error.response.data.message);
      if (error.response.status === 401) {
        navigate("/login"); //unauthorized user navigate to login page
      }
    }
  };

  //fetching user portfolio data
  const fetchUserPortfolioData = async (token) => {
    try {
      // Send get request using Axios
      const response = await axios.get(`${backendUrl}/portfolio-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserPortfolioData(response.data.portfolioData);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Failed to fetch user portfolio data:", error);
      if (error.response.status === 401) {
        navigate("/login"); //unauthorized user navigate to login page
      }
    }
  };

  //deleting user portfolio data
  const deletePortfolioData = async (userData, token) => {
    try {
      // Send delete request using Axios
      const response = await axios.delete(
        `${backendUrl}/${userData.firstName || "user"}/deletePortfolio`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserPortfolioData({});
      setLocalPortfolioData({});
      setPortfolioAction("create");
      localStorage.setItem("portfolioAction", "create");
      notifyWarn(response.data.message);
      navigate("/user/home");
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Failed to delete portfolio data:", error.response.data.error);
      notifyError(`Network Error : ${error.response.data.error}`);
      if (error.response.status === 401) {
        navigate("/login"); //unauthorized user navigate to login page
      }
    }
  };

  //creating and updating user portfolio data
  const allPortfolioDetails = async (userData, localPortfolioData, token) => {
    const clonedData = _.cloneDeep(localPortfolioData); //deepCloning the localPortfolioData
    if (portfolioAction === "create") {
      try {
        // Send post request using Axios
        const response = await axios.post(
          `${backendUrl}/${userData.firstName || "user"}/createPortfolio`,
          clonedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserPortfolioData(response.data.newPortfolioData);
        setPortfolioAction("update");
        localStorage.setItem("portfolioAction", "update");
        notifySuccess(response.data.message);
        navigate("/user/portfolio");
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Failed to create portfolio data:", error.response.data.error);
        notifyError(`Network Error : ${error.response.data.error}`);
        if (error.response.status === 401) {
          navigate("/login"); //unauthorized user navigate to login pag
        }
      }
    } else if (portfolioAction === "update") {
      try {
        // Send put request using Axios
        const response = await axios.put(
          `${backendUrl}/${userData.firstName || "user"}/updatePortfolio`,
          clonedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserPortfolioData(response.data.portfolioData);
        notifySuccess(response.data.message);
        navigate("/user/portfolio");
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Failed to update portfolio data:", error.response.data.error);
        notifyError(`Network Error : ${error.response.data.error}`);
        if (error.response.status === 401) {
          navigate("/login"); //unauthorized user navigate to login pag
        }
      }
    }
  };

  return (
    <dpContext.Provider
      value={{
        token,
        setToken: setTokenWithExpiration,
        backendUrl,
        userData,
        setUserData,
        portfolioAction,
        setPortfolioAction,
        temp,
        setTemp,
        userPortfolioData,
        setUserPortfolioData,
        localPortfolioData,
        setLocalPortfolioData,
        fetchUserData,
        fetchUserPortfolioData,
        deletePortfolioData,
        allPortfolioDetails,
        formatDate,
        notifySuccess,
        notifyError,
        notifyInfo,
        notifyWarn
      }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </dpContext.Provider>
  );
};

export default Context_Api_Component;
