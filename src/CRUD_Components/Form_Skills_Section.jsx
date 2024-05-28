//importing useContext to use context api and useEffect to perform side effects
import React, { useContext, useEffect } from "react";  
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation

const Form_Skills_Section = () => {

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
  const skillsInitialValues = {
    skills: "",
  };

  // declaring validation Schema for form fields
  const skillsValidationSchema = Yup.object().shape({
    skills: Yup.string().required("Skills are required"),
  });

  // Handling form submission
  const handleSkillsForm = (values, { resetForm }) => {
    try {
      const skillsArray = values.skills.split(",").map((skill) => skill.trim());
      const updatedData = { ...localPortfolioData, skills: skillsArray };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" && notifySuccess(`Skills Details Saved successfully!`);
      portfolioAction === "update" && notifySuccess(`Skills Details Updated successfully!`);
      resetForm();
      navigate(`/user/port_folio/${portfolioAction}/section-workExperience`);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //creating formik
  const formik = useFormik({
    initialValues: skillsInitialValues,
    validationSchema: skillsValidationSchema,
    onSubmit: handleSkillsForm,
  });

  //if portfolioaction is update, set the value for the fields
  useEffect(() => {
    if (
      portfolioAction === "update" &&
      Array.isArray(userPortfolioData.skills)
    ) {
      formik.setValues({
        skills: userPortfolioData.skills.join(", "),
      });
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-2">
      <div className="row d-flex justify-content-center">
        <h4 className="text-primary text-center fw-bold mt-2 mb-4">Skills</h4>
        <div className="mb-3 col-12">
          <label className="form-label fw-bold">
            Skills <span className="text-danger">*</span> :{" "}
            <span className="fw-normal">
              (Enter skills as comma(,) separatedly)
            </span>
          </label>
          <textarea
            name="skills"
            rows="3"
            value={formik.values.skills}
            onChange={formik.handleChange}
            className="form-control"
            placeholder="e.g : HTML, CSS, Javascript, Angular, React"
          ></textarea>
          <h6 className="ps-2 mb-0 my-1 text-danger">{formik.errors.skills}</h6>
        </div>
        <div className="col-12 text-center mt-3">
          <button
            type="submit"
            className={`btn fw-bold ${
              portfolioAction === "create" ? "btn-primary" : "btn-warning"
            }`}
          >
            {portfolioAction === "create" ? "Save " : "Update "}Skills Info
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form_Skills_Section;
