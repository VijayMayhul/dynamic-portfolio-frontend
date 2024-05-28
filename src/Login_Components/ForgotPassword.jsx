import { ErrorMessage, Field, Form, Formik } from "formik"; //importing formik tags to perform form operations
//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema
import axios from "axios"; //importing axios to do CRUD with API

const ForgotPassword = () => {
  //getting necessary things from context API
  const { backendUrl, notifySuccess, notifyError } = useContext(dpContext);

  //spinning effect state
  const [loadSpinner, setLoadSpinner] = useState(false);

  //declating initial values for form fields
  const initialValues = {
    email: "",
  };

  //declating validation Schema for form fields
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  //Handling forgot password form submission
  const handleForgotPassword = async (values) => {
    try {
      setLoadSpinner(true);

      // Send POST request using Axios
      const response = await axios.post(
        `${backendUrl}/forgot-password`,
        values
      );

      // Log the response from the server
      console.log(response.data.message);
      notifySuccess(response.data.message);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error.response.data.message);
      notifyError(`Network Error : ${error.response.data.message}`);
    } finally {
      setLoadSpinner(false);
    }
  };
  return (
    <>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-6">
              <div className="card bg-body-tertiary shadow-2-strong">
                <div className="card-title">
                  <h1 className="h1 pt-3 mb-0 web-title text-center">
                    YourPortfolio
                  </h1>
                </div>
                <div className="card-body pb-4 px-md-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleForgotPassword}
                  >
                    <Form className="mb-2">
                      {/* <h3 className="text-center"><i class="fa fa-lock fa-4x"></i></h3> */}
                      <h3 className="text-center text-info fw-bold">
                        Forgot Password?
                      </h3>
                      <div className="row">
                        <div className="my-3 col-sm-12 col-lg-12">
                          <label className="form-label">
                            <b>Email Address : </b>
                          </label>
                          <Field
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter your Registered Email"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="ps-2 mb-0 my-1 text-danger"
                          />
                        </div>
                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 fw-bold"
                          >
                            {loadSpinner ? (
                              <span
                                className="spinner-border spinner-border-md"
                                role="status"
                              ></span>
                            ) : (
                              <span>Submit</span>
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
      </section>
    </>
  );
};

export default ForgotPassword;
