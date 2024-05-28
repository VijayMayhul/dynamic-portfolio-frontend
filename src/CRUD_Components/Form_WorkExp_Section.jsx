//importing useContext to use context api and useEffect to perform side effects & useState for state management
import React, { useContext, useEffect, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation
import { v4 as uuidv4 } from "uuid"; //importing v4 to create dynamic id values
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation

const Form_WorkExp_Section = () => {
  //getting necessary things from context API
  const {
    userPortfolioData,
    portfolioAction,
    localPortfolioData,
    setLocalPortfolioData,
    formatDate,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarn,
  } = useContext(dpContext);

  // using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //create work experience state variables
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // declaring initial values for form fields
  const workExpInitialValues = {
    from: "",
    to: "",
    designation: "",
    companyName: "",
    location: "",
    workDetails: "",
  };

  // declaring validation Schema for form fields
  const workExpValidationSchema = Yup.object().shape({
    from: Yup.date()
      .required("Start date is required")
      .max(new Date(), "Start date cannot be in the future"),
    to: Yup.date()
      .required("End date is required")
      .max(new Date(), "End date cannot be in the future"),
    designation: Yup.string().required("Designation is required"),
    companyName: Yup.string().required("Company name is required"),
    location: Yup.string().required("Address is required"),
    workDetails: Yup.string().required("Work details are required"),
  });

  // Handling form submission
  const handleWorkExpForm = (values, { resetForm }) => {
    try {
      const updatedValues = {
        ...values,
        from: new Date(values.from).toISOString().split("T")[0],
        to:
          values.to === new Date().toISOString().split("T")[0]
            ? "Present"
            : new Date(values.to).toISOString().split("T")[0],
      };

      if (isEditing) {
        setWorkExperienceList(
          workExperienceList.map((exp) =>
            exp.id === editId ? { ...updatedValues, id: editId } : exp
          )
        );
        setIsEditing(false);
        setEditId(null);
        notifyInfo(`Experience Updated Successfully!`);
      } else {
        const newWorkExperience = { id: uuidv4(), ...updatedValues };
        setWorkExperienceList([...workExperienceList, newWorkExperience]);
        notifyInfo(`New Experience Added Successfully!`);
      }

      resetForm();
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //creating formik
  const formik = useFormik({
    initialValues: workExpInitialValues,
    validationSchema: workExpValidationSchema,
    onSubmit: handleWorkExpForm,
  });

  //editing the work experience info
  const handleEditWorkExperience = (id) => {
    const experienceToEdit = workExperienceList.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setIsEditing(true);
      setEditId(id);
      // Populate form with existing data for editing
      formik.setValues({
        from: new Date(experienceToEdit.from).toISOString().split("T")[0],
        to:
          experienceToEdit.to === "Present"
            ? new Date().toISOString().split("T")[0]
            : experienceToEdit.to,
        designation: experienceToEdit.designation,
        companyName: experienceToEdit.companyName,
        location: experienceToEdit.location,
        workDetails: experienceToEdit.workDetails,
      });
    }
  };

  //deleting the work experience info
  const handleDeleteWorkExperience = (id) => {
    setWorkExperienceList(workExperienceList.filter((exp) => exp.id !== id));
    notifyWarn(`Experience Deleted Successfully!`);
  };

  //saving all work experience info
  const saveWorkExperience = () => {
    try {
      const updatedData = {
        ...localPortfolioData,
        workExperience: [...workExperienceList],
      };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" &&
        notifySuccess(`Work Experience Details Saved successfully!`);
      portfolioAction === "update" &&
        notifySuccess(`Work Experience Details Updated successfully!`);
      navigate(`/user/port_folio/${portfolioAction}/section-education`);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //if portfolioaction is update, set the value for the fields
  useEffect(() => {
    if (
      portfolioAction === "update" &&
      Array.isArray(userPortfolioData.workExperience)
    ) {
      setWorkExperienceList([...userPortfolioData.workExperience]);
    }
  }, []);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-2">
        <div className="row d-flex justify-content-center">
          <h4 className="text-primary text-center fw-bold mt-2">
            Work Experience
          </h4>
          <p className="text-center mb-2">
            <mark className="rounded-2 px-2 py-1">
              (If you're fresher, please don't add experience, just click Save
              Work Experience button)
            </mark>
          </p>
          <p className="text-center mb-4">
            <mark className="rounded-2 px-2 py-1">
              (Add Experience most recent to past)
            </mark>
          </p>
          <div className="mb-3 col-sm-12 col-lg-5">
            <label className="form-label fw-bold">
              Designation <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              placeholder="e.g : Web Developer"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.designation}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-7">
            <label className="form-label fw-bold">
              Company Name <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              placeholder="e.g : TCS Private Limited"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.companyName}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-5">
            <label className="form-label fw-bold">
              Start Date <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="date"
              className="form-control"
              name="from"
              value={formik.values.from}
              onChange={formik.handleChange}
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">{formik.errors.from}</h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-5">
            <label className="form-label fw-bold">
              End Date <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="date"
              className="form-control"
              name="to"
              value={formik.values.to}
              onChange={formik.handleChange}
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">{formik.errors.to}</h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Address of the Company <span className="text-danger">*</span> :{" "}
            </label>
            <textarea
              name="location"
              rows="2"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : Washington, America"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.location}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Describe your role/work in the Company{" "}
              <span className="text-danger">*</span> :{" "}
            </label>
            <textarea
              name="workDetails"
              rows="3"
              value={formik.values.workDetails}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : I was worked on various frontend projects, etc..."
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.workDetails}
            </h6>
          </div>
          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className={`btn fw-bold ${
                isEditing ? "btn-info" : "btn-success"
              }`}
            >
              {isEditing ? "Update Work Experience" : "Add Work Experience"}
            </button>
          </div>
        </div>
      </form>

      <div className="row d-flex justify-content-center mt-4">
        {workExperienceList.map((experience, index) => {
          return (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <div className="card bg-warning h-100">
                <div className="card-body">
                  <p className="card-text text-capitalize">
                    <b>Designation : </b> {experience.designation}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Company : </b> {experience.companyName}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Duration : </b> {formatDate(experience.from)} to{" "}
                    {formatDate(experience.to)}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Address : </b> {experience.location}
                  </p>
                  <p className="card-text">
                    <b>Work Info : </b> {experience.workDetails}
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditWorkExperience(experience.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteWorkExperience(experience.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-12 text-center mt-3">
        <button
          onClick={saveWorkExperience}
          className={`btn fw-bold ${
            portfolioAction === "create" ? "btn-primary" : "btn-warning"
          }`}
        >
          {portfolioAction === "create" ? "Save " : "Update "}all Work
          Experience Info
        </button>
      </div>
    </>
  );
};

export default Form_WorkExp_Section;
