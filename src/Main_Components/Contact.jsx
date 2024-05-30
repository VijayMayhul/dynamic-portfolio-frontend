import axios from "axios"; //importing axios to do CRUD with API
import { ErrorMessage, Field, Form, Formik } from "formik"; //importing formik tags to perform form operations
//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema

const Contact = () => {

  //getting necessary things from context API
  const { backendUrl, userData, token, notifySuccess, notifyError } =
    useContext(dpContext);

    //spinning effect state
  const [loadSpinner, setLoadSpinner] = useState(false);

  //declating initial values for form fields
  const initialValues = {
    personName: "",
    email: "",
    phoneNo: "",
    subject: "",
    description: "",
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    personName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNo: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(12, "Phone number can't exceed 12 digits")
      .required("Phone No is required"),
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  //Handling register form submission
  const handleMailSent = async (values, { resetForm }) => {
    try {
      setLoadSpinner(true);

       // Send POST request using Axios
      const response = await axios.post(
        `${backendUrl}/${userData.firstName || "user"}/contact`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response from the server
      console.log(response.data.message);

      notifySuccess(response.data.message);
      resetForm();
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error.response.data.error);
      notifyError(`${error.response.data.error}`);
    } finally {
      setLoadSpinner(false);
    }
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-md-10">
            <div className="card bg-dark text-info shadow-2-strong">
              <div className="card-title px-md-5">
                <h1 className="h1 pt-3 mb-0 text-center text-warning">
                  Contact Us
                </h1>
              </div>
              <div className="card-body pb-4 px-md-5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleMailSent}
                >
                  <Form className="mb-2">
                    <div className="row">
                      <div className="mb-3 col-sm-12 col-lg-6">
                        <label className="form-label">
                          <b>Name : </b>
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="personName"
                          placeholder="Enter Your Name"
                        />
                        <ErrorMessage
                          name="personName"
                          component="p"
                          className="ps-2 mb-0 my-1 text-danger"
                        />
                      </div>
                      <div className="mb-3 col-sm-12 col-lg-6">
                        <label className="form-label">
                          <b>Email : </b>
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="e.g : example123@gmail.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="ps-2 mb-0 my-1 text-danger"
                        />
                      </div>
                      <div className="mb-3 col-sm-12 col-lg-6">
                        <label className="form-label">
                          <b>Phone No : </b>
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="phoneNo"
                          placeholder="e.g :+91 1234567890"
                        />
                        <ErrorMessage
                          name="phoneNo"
                          component="p"
                          className="ps-2 mb-0 my-1 text-danger"
                        />
                      </div>
                      <div className="mb-3 col-sm-12 col-lg-6">
                        <label className="form-label">
                          <b>Subject : </b>
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Clarification"
                        />
                        <ErrorMessage
                          name="subject"
                          component="p"
                          className="ps-2 mb-0 my-1 text-danger"
                        />
                      </div>
                      <div className="mb-3 col-12">
                        <label className="form-label">
                          <b>Description : </b>
                        </label>
                        <Field
                          as="textarea"
                          className="form-control"
                          name="description"
                          rows="3"
                          placeholder="Detailed info of your issue or problem"
                        />
                        <ErrorMessage
                          name="description"
                          component="h6"
                          className="ps-2 mb-0 my-1 text-danger"
                        />
                      </div>
                      <div className="col-12 text-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-50 fw-bold"
                        >
                          {loadSpinner ? (
                            <span className="spinner-border spinner-border-md" role="status"></span>
                          ) : (
                            <span>Send Message</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
