//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";  
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { NavLink, useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation

const Form_Home_Section = () => {

  //getting necessary things from context API
  const {
    temp,
    userPortfolioData,
    portfolioAction,
    localPortfolioData,
    setLocalPortfolioData,
    notifySuccess,
    notifyError,
  } = useContext(dpContext);

  // using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  // declaring initial values for form inputs
  const homeInitialValues = {
    template: temp,
    home: {
      welcomeText: "",
      firstName: "",
      lastName: "",
      designation: "",
      shortIntro: "",
    },
  };

  // declaring validation Schema for form inputs
  const homeValidationSchema = Yup.object().shape({
    template: Yup.string().required("Template is required"),
    home: Yup.object().shape({
      welcomeText: Yup.string().required("Welcome Message is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      designation: Yup.string().required("Designation is required"),
      shortIntro: Yup.string().required(
        "Short Introduction about yourself is required"
      ),
    }),
  });

  // Handling form submission
  const handleHomeForm = (values, { resetForm }) => {
    try {
      const updatedData = { ...localPortfolioData, ...values };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" && notifySuccess(`Home Details Saved successfully!`);
      portfolioAction === "update" && notifySuccess(`Home Details Updated successfully!`);
      resetForm();
      navigate(`/user/port_folio/${portfolioAction}/section-about`);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //creating formik
  const formik = useFormik({
    initialValues: homeInitialValues,
    validationSchema: homeValidationSchema,
    onSubmit: handleHomeForm,
  });

  //if portfolioaction is update, set the value for the fields
  useEffect(() => {
    if (
      portfolioAction === "update" &&
      userPortfolioData &&
      userPortfolioData.home
    ) {
      formik.setValues({
        template: temp || "",
        home: {
          welcomeText: userPortfolioData.home.welcomeText || "",
          firstName: userPortfolioData.home.firstName || "",
          lastName: userPortfolioData.home.lastName || "",
          designation: userPortfolioData.home.designation || "",
          shortIntro: userPortfolioData.home.shortIntro || "",
        },
      });
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-2">
      <div className="row d-flex justify-content-center">
        <h4 className="text-primary text-center fw-bold mt-2 mb-4">Home</h4>
        <div className="mb-3 col-sm-12 col-lg-6">
          <label className="form-label fw-bold">
            Template <span className="text-danger">*</span> :{" "}
          </label>
          <input
            type="text"
            className="form-control bg-light"
            name="template"
            value={formik.values.template}
            onChange={formik.handleChange}
            readOnly
          />
          <p className="mb-0 text-info">
            <NavLink to={"/user/templates"}>Select Template?</NavLink>{" "}
          </p>
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.template}
          </h6>
        </div>
        <div className="mb-3 col-sm-12 col-lg-6">
          <label className="form-label fw-bold">
            Welcome Message <span className="text-danger">*</span> :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="home.welcomeText"
            placeholder="Hello, there!"
            value={formik.values.home.welcomeText}
            onChange={formik.handleChange}
          />
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.home?.welcomeText}
          </h6>
        </div>
        <div className="mb-3 col-sm-12 col-lg-4">
          <label className="form-label fw-bold">
            First Name <span className="text-danger">*</span> :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="home.firstName"
            placeholder="e.g : John"
            value={formik.values.home.firstName}
            onChange={formik.handleChange}
          />
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.home?.firstName}
          </h6>
        </div>
        <div className="mb-3 col-sm-12 col-lg-4">
          <label className="form-label fw-bold">
            Last Name <span className="text-danger">*</span> :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="home.lastName"
            placeholder="e.g : Doe"
            value={formik.values.home.lastName}
            onChange={formik.handleChange}
          />
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.home?.lastName}
          </h6>
        </div>
        <div className="mb-3 col-sm-12 col-lg-4">
          <label className="form-label fw-bold">
            Designation <span className="text-danger">*</span> :{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="home.designation"
            placeholder="e.g : Full Stack Developer"
            value={formik.values.home.designation}
            onChange={formik.handleChange}
          />
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.home?.designation}
          </h6>
        </div>
        <div className="mb-3 col-12">
          <label className="form-label fw-bold">
            Short Introduction <span className="text-danger">*</span> :{" "}
          </label>
          <textarea
            name="home.shortIntro"
            rows="2"
            value={formik.values.home.shortIntro}
            onChange={formik.handleChange}
            className="form-control"
            placeholder="e.g : Passionate about creating beautiful and functional websites."
          ></textarea>
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.home?.shortIntro}
          </h6>
        </div>
        <div className="col-12 text-center mt-3">
          <button
            type="submit"
            className={`btn fw-bold ${
              portfolioAction === "create" ? "btn-primary" : "btn-warning"
            }`}
          >
            {portfolioAction === "create" ? "Save " : "Update "}Home Info
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form_Home_Section;
