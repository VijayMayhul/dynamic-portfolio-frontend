//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";  
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation

const Form_About_Section = () => {

  //getting necessary things from context API
  const {
    userPortfolioData,
    portfolioAction,
    localPortfolioData,
    setLocalPortfolioData,
    notifySuccess,
    notifyError,
  } = useContext(dpContext);

  // using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  // declaring initial values for form fields
  const aboutInitialValues = {
    about: {
      briefIntro: "",
      resumeUrl: "",
    },
  };

  // declaring validation Schema for form fields
  const aboutValidationSchema = Yup.object().shape({
    about: Yup.object().shape({
      briefIntro: Yup.string().required("Brief Introduction is required"),
      resumeUrl: Yup.string().url("Invalid URL"),
    }),
  });

  // Handling form submission
  const handleAboutForm = (values, { resetForm }) => {
    try {
      const updatedData = { ...localPortfolioData, ...values };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" && notifySuccess(`About Details Saved successfully!`);
      portfolioAction === "update" && notifySuccess(`About Details Updated successfully!`);
      resetForm();
      navigate(`/user/port_folio/${portfolioAction}/section-skills`);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //creating formik
  const formik = useFormik({
    initialValues: aboutInitialValues,
    validationSchema: aboutValidationSchema,
    onSubmit: handleAboutForm,
  });

  //if portfolioaction is update, set the value for the fields
  useEffect(() => {
    if (
      portfolioAction === "update" &&
      userPortfolioData &&
      userPortfolioData.about
    ) {
      formik.setValues({
        about: {
          briefIntro: userPortfolioData.about.briefIntro || "",
          resumeUrl: userPortfolioData.about.resumeUrl || "",
        },
      });
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-2">
      <div className="row d-flex justify-content-center">
        <h4 className="text-primary text-center fw-bold mt-2 mb-4">About</h4>
        <div className="mb-3 col-12">
          <label className="form-label fw-bold">
            Brief Introduction <span className="text-danger">*</span> :{" "}
          </label>
          <textarea
            name="about.briefIntro"
            rows="3"
            value={formik.values.about.briefIntro}
            onChange={formik.handleChange}
            className="form-control"
            placeholder="e.g : I am a passionate web developer with expertise in front-end technologies."
          ></textarea>
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.about?.briefIntro}
          </h6>
        </div>
        <div className="mb-3 col-12">
          <label className="form-label fw-bold">Resume URL Link :</label>
          <input
            type="text"
            className="form-control"
            name="about.resumeUrl"
            placeholder="e.g : https://drive.google.com/johndoe/resume.pdf"
            value={formik.values.about.resumeUrl}
            onChange={formik.handleChange}
          />
          <h6 className="ps-2 mb-0 my-1 text-danger">
            {formik.errors.about?.resumeUrl}
          </h6>
        </div>
        <div className="col-12 text-center mt-3">
          <button
            type="submit"
            className={`btn fw-bold ${
              portfolioAction === "create" ? "btn-primary" : "btn-warning"
            }`}
          >
            {portfolioAction === "create" ? "Save " : "Update "}About Info
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form_About_Section;
