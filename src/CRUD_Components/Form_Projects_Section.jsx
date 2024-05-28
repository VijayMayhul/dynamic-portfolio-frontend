//importing useContext to use context api and useEffect to perform side effects & useState for state management
import React, { useContext, useEffect, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation
import { v4 as uuidv4 } from "uuid"; //importing v4 to create dynamic id values
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation

const Form_Projects_Section = () => {
  //getting necessary things from context API
  const {
    userPortfolioData,
    portfolioAction,
    localPortfolioData,
    setLocalPortfolioData,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarn,
  } = useContext(dpContext);

  // using useNavigate hook to navigate between one component to another component
  const navigate = useNavigate();

  //create projects state variables
  const [projectsList, setProjectsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // declaring initial values for form fields
  const projectInitialValues = {
    projectName: "",
    techUsed: "",
    projectDetails: "",
    projectLink: "",
  };

  // declaring validation Schema for form fields
  const projectValidationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is Required"),
    techUsed: Yup.string(),
    projectDetails: Yup.string().required("Project Details is Required"),
    projectLink: Yup.string().url("Invalid URL"),
  });

  // Handling form submission
  const handleProjectForm = (values, { resetForm }) => {
    try {
      const updatedValues = {
        ...values,
        techUsed: values.techUsed.split(",").map((tech) => tech.trim()),
      };

      if (isEditing) {
        setProjectsList(
          projectsList.map((project) =>
            project.id === editId ? { ...updatedValues, id: editId } : project
          )
        );
        setIsEditing(false);
        setEditId(null);
        notifyInfo(`Project Updated Successfully!`);
      } else {
        const newProject = { id: uuidv4(), ...updatedValues };
        setProjectsList([...projectsList, newProject]);
        notifyInfo(`New Project Added Successfully!`);
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
    initialValues: projectInitialValues,
    validationSchema: projectValidationSchema,
    onSubmit: handleProjectForm,
  });

  //editing the project info
  const handleEditProject = (id) => {
    const projectToEdit = projectsList.find((project) => project.id === id);
    if (projectToEdit) {
      setIsEditing(true);
      setEditId(id);
      // Populate form with existing data for editing
      formik.setValues({
        projectName: projectToEdit.projectName,
        techUsed: projectToEdit.techUsed.join(", "),
        projectDetails: projectToEdit.projectDetails,
        projectLink: projectToEdit.projectLink,
      });
    }
  };

  //deleting the project info
  const handleDeleteProject = (id) => {
    setProjectsList(projectsList.filter((project) => project.id !== id));
    notifyWarn(`Project Deleted Successfully!`);
  };

  //saving all education info
  const saveProjects = () => {
    try {
      const updatedData = {
        ...localPortfolioData,
        projects: [...projectsList],
      };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" &&
        notifySuccess(`Projects Details Saved successfully!`);
      portfolioAction === "update" &&
        notifySuccess(`Projects Details Updated successfully!`);
      navigate(`/user/port_folio/${portfolioAction}/section-contact`);
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
      Array.isArray(userPortfolioData.projects)
    ) {
      const updatedProjects = userPortfolioData.projects.map((project) => ({
        ...project,
        techUsed: project.techUsed.join(", "),
      }));
      setProjectsList(updatedProjects);
    }
  }, []);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-2">
        <div className="row d-flex justify-content-center">
          <h4 className="text-primary text-center fw-bold mt-2">Projects</h4>
          <p className="text-center mb-2">
            <mark className="rounded-2 px-2 py-1">
              (If you haven't done any projects, just click Save Projects
              button)
            </mark>
          </p>
          <div className="mb-3 col-sm-12 col-lg-8">
            <label className="form-label fw-bold">
              Project/Work Name <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="projectName"
              value={formik.values.projectName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="e.g : E-Commerce Website"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.projectName}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Technologies/Skills Used :{" "}
              <span className="fw-normal">
                (Enter Technologies/Skills as comma(,) separatedly)
              </span>
            </label>
            <textarea
              name="techUsed"
              rows="2"
              value={formik.values.techUsed}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : HTML, CSS, Javascript, React"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.techUsed}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Describe about the Project/Work{" "}
              <span className="text-danger">*</span> :{" "}
            </label>
            <textarea
              name="projectDetails"
              rows="3"
              value={formik.values.projectDetails}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : Through this E-commerce project, you can view the products and add the products to cart"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.projectDetails}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">Project Link : </label>
            <input
              type="text"
              className="form-control"
              name="projectLink"
              value={formik.values.projectLink}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="e.g : https://example.com/e-commerce"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.projectLink}
            </h6>
          </div>
          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className={`btn fw-bold ${
                isEditing ? "btn-info" : "btn-success"
              }`}
            >
              {isEditing ? "Update Project" : "Add Project"}
            </button>
          </div>
        </div>
      </form>

      <div className="row d-flex justify-content-center mt-4">
        {projectsList.map((project, index) => {
          const techUsedArray = Array.isArray(project.techUsed)
            ? project.techUsed
            : [];
          return (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <div className="card bg-warning h-100">
                <div className="card-body">
                  <p className="card-text text-capitalize">
                    <b>Project Name : </b> {project.projectName}
                  </p>
                  {techUsedArray.length !== 0 && (
                    <div className="card-text text-capitalize">
                      <b>Technologies Used : </b>
                      {techUsedArray.map((tech, index) => {
                        return (
                          <div
                            key={index}
                            className="px-1 bg-secondary d-inline-block m-1 text-white rounded-2"
                          >
                            {tech}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="card-text">
                    <b>Project Info : </b> {project.projectDetails}
                  </p>
                  {project.projectLink !== "" && (
                    <p className="card-text">
                      <b>Project Link : </b>
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.projectLink}
                      </a>
                    </p>
                  )}
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEditProject(project.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProject(project.id)}
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
          onClick={saveProjects}
          className={`btn fw-bold ${
            portfolioAction === "create" ? "btn-primary" : "btn-warning"
          }`}
        >
          {portfolioAction === "create" ? "Save " : "Update "}all Projects Info
        </button>
      </div>
    </>
  );
};

export default Form_Projects_Section;
