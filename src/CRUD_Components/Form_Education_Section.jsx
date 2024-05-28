//importing useContext to use context api and useEffect to perform side effects & useState for state management
import React, { useContext, useEffect, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation
import { v4 as uuidv4 } from "uuid"; //importing v4 to create dynamic id values
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation

const Form_Education_Section = () => {
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

  //create education state variables
  const [educationList, setEducationList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // declaring initial values for form fields
  const educationInitialValues = {
    from: "",
    to: "",
    courseName: "",
    institutionName: "",
    location: "",
    courseInfo: "",
  };

  // declaring validation Schema for form fields
  const educationValidationSchema = Yup.object().shape({
    from: Yup.date()
      .required("Start date is required")
      .max(new Date(), "Start date cannot be in the future"),
    to: Yup.date()
      .required("End date is required")
      .max(new Date(), "End date cannot be in the future"),
    courseName: Yup.string().required("Course Name is required"),
    institutionName: Yup.string().required("Institution Name is required"),
    location: Yup.string().required("Address is required"),
    courseInfo: Yup.string(),
  });

  // Handling form submission
  const handleEducationForm = (values, { resetForm }) => {
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
        setEducationList(
          educationList.map((edu) =>
            edu.id === editId ? { ...updatedValues, id: editId } : edu
          )
        );
        setIsEditing(false);
        setEditId(null);
        notifyInfo(`Education Updated successfully!`);
      } else {
        const newEducation = { id: uuidv4(), ...updatedValues };
        setEducationList([...educationList, newEducation]);
        notifyInfo(`New Education Added successfully!`);
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
    initialValues: educationInitialValues,
    validationSchema: educationValidationSchema,
    onSubmit: handleEducationForm,
  });

  //editing the eduction info
  const handleEditEducation = (id) => {
    const educationToEdit = educationList.find((exp) => exp.id === id);
    if (educationToEdit) {
      setIsEditing(true);
      setEditId(id);
      // Populate form with existing data for editing
      formik.setValues({
        from: new Date(educationToEdit.from).toISOString().split("T")[0],
        to:
          educationToEdit.to === "Present"
            ? new Date().toISOString().split("T")[0]
            : educationToEdit.to,
        courseName: educationToEdit.courseName,
        institutionName: educationToEdit.institutionName,
        location: educationToEdit.location,
        courseInfo: educationToEdit.courseInfo,
      });
    }
  };

  //deleting the eduction info
  const handleDeleteEducation = (id) => {
    setEducationList(educationList.filter((exp) => exp.id !== id));
    notifyWarn(`Education deleted successfully!`);
  };

  //saving all education info
  const saveEducation = () => {
    try {
      const updatedData = {
        ...localPortfolioData,
        education: [...educationList],
      };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" &&
        notifySuccess(`Education Details Saved successfully!`);
      portfolioAction === "update" &&
        notifySuccess(`Education Details Updated successfully!`);
      navigate(`/user/port_folio/${portfolioAction}/section-projects`);
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
      Array.isArray(userPortfolioData.education)
    ) {
      setEducationList([...userPortfolioData.education]);
    }
  }, []);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-2">
        <div className="row d-flex justify-content-center">
          <h4 className="text-primary text-center fw-bold mt-2">Education</h4>
          <p className="text-center mb-4">
            <mark className="rounded-2 px-2 py-1">
              (Add Education most recent to past)
            </mark>
          </p>
          <div className="mb-3 col-sm-12 col-lg-5">
            <label className="form-label fw-bold">
              Course Name <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="courseName"
              value={formik.values.courseName}
              onChange={formik.handleChange}
              placeholder="e.g : B.Tech"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.courseName}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-7">
            <label className="form-label fw-bold">
              Institute/college Name <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="institutionName"
              value={formik.values.institutionName}
              onChange={formik.handleChange}
              placeholder="e.g : Xavier College of Technology"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.institutionName}
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
              Address of the Institude/college{" "}
              <span className="text-danger">*</span> :{" "}
            </label>
            <textarea
              name="location"
              rows="2"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : Newyork, America"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.location}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Describe about your learnings & experience in the course :{" "}
            </label>
            <textarea
              name="courseInfo"
              rows="3"
              value={formik.values.courseInfo}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : I learned all new web technologies more detailedly"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.courseInfo}
            </h6>
          </div>
          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className={`btn fw-bold ${
                isEditing ? "btn-info" : "btn-success"
              }`}
            >
              {isEditing ? "Update Education" : "Add Education"}
            </button>
          </div>
        </div>
      </form>

      <div className="row d-flex justify-content-center mt-4">
        {educationList.map((studies, index) => {
          return (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <div className="card bg-warning h-100">
                <div className="card-body">
                  <p className="card-text text-capitalize">
                    <b>Course : </b> {studies.courseName}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Institute : </b> {studies.institutionName}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Duration : </b> {formatDate(studies.from)} to{" "}
                    {formatDate(studies.to)}
                  </p>
                  <p className="card-text text-capitalize">
                    <b>Address : </b> {studies.location}
                  </p>
                  {studies.courseInfo !== "" && (
                    <p className="card-text">
                      <b>Course Info : </b> {studies.courseInfo}
                    </p>
                  )}
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditEducation(studies.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteEducation(studies.id)}
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
          onClick={saveEducation}
          disabled={educationList.length > 0 ? false : true}
          className={`btn fw-bold ${
            portfolioAction === "create" ? "btn-primary" : "btn-warning"
          }`}
        >
          {portfolioAction === "create" ? "Save " : "Update "}all Education Info
        </button>
      </div>
      <p className="text-center my-2">
        <mark className="rounded-2 px-2 py-1">
          (Please add atleast one education info)
        </mark>
      </p>
    </>
  );
};

export default Form_Education_Section;
