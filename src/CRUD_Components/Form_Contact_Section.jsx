//importing useContext to use context api and useEffect to perform side effects & useState for state management
import React, { useContext, useEffect, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import * as Yup from "yup"; //importing Yup to create validation schema
import { useFormik } from "formik"; //importing useFormik hook for form validation

const Form_Contact_Section = () => {

  //getting necessary things from context API
  const {
    userData,
    userPortfolioData,
    portfolioAction,
    localPortfolioData,
    setLocalPortfolioData,
    allPortfolioDetails,
    token,
    notifySuccess,
    notifyError,
  } = useContext(dpContext);

  //button disable state
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  // declaring initial values for form inputs
  const contactInitialValues = {
    contact: {
      phoneNo: "",
      email: "",
      location: "",
      socialLinks: {
        linkedinUrl: "",
        githubUrl: "",
        telegramUrl: "",
        facebookUrl: "",
        instagramUrl: "",
      },
    },
  };

  // declaring validation Schema for form inputs
  const contactValidationSchema = Yup.object().shape({
    contact: Yup.object().shape({
      phoneNo: Yup.string()
        .required("Phone No is required")
        .matches(
          /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          "Phone No is not valid"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      location: Yup.string()
        .required("Location is required")
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location can't be longer than 100 characters"),
      socialLinks: Yup.object().shape({
        linkedinUrl: Yup.string().url("Invalid URL"),
        githubUrl: Yup.string().url("Invalid URL"),
        telegramUrl: Yup.string().url("Invalid URL"),
        facebookUrl: Yup.string().url("Invalid URL"),
        instagramUrl: Yup.string().url("Invalid URL"),
      }),
    }),
  });

  // Handling form submission
  const handleContactForm = (values, { resetForm }) => {
    try {
      const updatedData = { ...localPortfolioData, ...values };
      setLocalPortfolioData(updatedData);
      portfolioAction === "create" &&
        notifySuccess(`Contact Details Saved successfully!`);
      portfolioAction === "update" &&
        notifySuccess(`Contact Details Updated successfully!`);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      notifyError(`Network Error : ${error}`);
    }
  };

  //creating formik
  const formik = useFormik({
    initialValues: contactInitialValues,
    validationSchema: contactValidationSchema,
    onSubmit: handleContactForm,
  });

  //checking all fields are given
  useEffect(() => {
    if (
      localPortfolioData.template &&
      localPortfolioData.home &&
      localPortfolioData.about &&
      localPortfolioData.skills.length > 0 &&
      localPortfolioData.education.length > 0 &&
      localPortfolioData.contact
    ) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [localPortfolioData]);

  //if portfolioaction is update, set the value for the fields
  useEffect(() => {
    if (portfolioAction === "update" && userPortfolioData.contact) {
      const { contact } = userPortfolioData;
      formik.setValues({
        contact: {
          phoneNo: contact.phoneNo || "",
          email: contact.email || "",
          location: contact.location || "",
          socialLinks: {
            linkedinUrl: contact.socialLinks?.linkedinUrl || "",
            githubUrl: contact.socialLinks?.githubUrl || "",
            telegramUrl: contact.socialLinks?.telegramUrl || "",
            facebookUrl: contact.socialLinks?.facebookUrl || "",
            instagramUrl: contact.socialLinks?.instagramUrl || "",
          },
        },
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-2">
        <div className="row d-flex justify-content-center">
          <h4 className="text-primary text-center fw-bold mt-2 mb-4">
            Contact
          </h4>
          <div className="mb-3 col-sm-12 col-lg-6">
            <label className="form-label fw-bold">
              Phone Number <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="contact.phoneNo"
              value={formik.values.contact.phoneNo}
              onChange={formik.handleChange}
              placeholder="e.g : +91 9543372670"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.phoneNo}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-6">
            <label className="form-label fw-bold">
              Email Address <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="contact.email"
              placeholder="e.g : johndoe@example.com"
              value={formik.values.contact.email}
              onChange={formik.handleChange}
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.email}
            </h6>
          </div>
          <div className="mb-3 col-12">
            <label className="form-label fw-bold">
              Address <span className="text-danger">*</span> :{" "}
            </label>
            <textarea
              name="contact.location"
              rows="2"
              value={formik.values.contact.location}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="e.g : Washington, America"
            ></textarea>
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.location}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-4">
            <label className="form-label fw-bold">LinkedIn URL :</label>
            <input
              type="text"
              className="form-control"
              name="contact.socialLinks.linkedinUrl"
              value={formik.values.contact.socialLinks.linkedinUrl}
              onChange={formik.handleChange}
              placeholder="e.g : https://www.linkedin.com/in/johndoe"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.socialLinks?.linkedinUrl}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-4">
            <label className="form-label fw-bold">GitHub URL :</label>
            <input
              type="text"
              className="form-control"
              name="contact.socialLinks.githubUrl"
              value={formik.values.contact.socialLinks.githubUrl}
              onChange={formik.handleChange}
              placeholder="e.g : https://github.com/johndoe"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.socialLinks?.githubUrl}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-4">
            <label className="form-label fw-bold">Telegram URL :</label>
            <input
              type="text"
              className="form-control"
              name="contact.socialLinks.telegramUrl"
              value={formik.values.contact.socialLinks.telegramUrl}
              onChange={formik.handleChange}
              placeholder="e.g : https://t.me/johndoe"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.socialLinks?.telegramUrl}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-4">
            <label className="form-label fw-bold">Facebook URL :</label>
            <input
              type="text"
              className="form-control"
              name="contact.socialLinks.facebookUrl"
              value={formik.values.contact.socialLinks.facebookUrl}
              onChange={formik.handleChange}
              placeholder="e.g : https://www.facebook.com/johndoe"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.socialLinks?.facebookUrl}
            </h6>
          </div>
          <div className="mb-3 col-sm-12 col-lg-4">
            <label className="form-label fw-bold">Instagram URL :</label>
            <input
              type="text"
              className="form-control"
              name="contact.socialLinks.instagramUrl"
              value={formik.values.contact.socialLinks.instagramUrl}
              onChange={formik.handleChange}
              placeholder="e.g : https://www.instagram.com/johndoe"
            />
            <h6 className="ps-2 mb-0 my-1 text-danger">
              {formik.errors.contact?.socialLinks?.instagramUrl}
            </h6>
          </div>
          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className={`btn fw-bold ${
                portfolioAction === "create" ? "btn-primary" : "btn-warning"
              }`}
            >
              {portfolioAction === "create" ? "Save " : "Update "}all Contact
              Info
            </button>
          </div>
        </div>
      </form>
      <div className="col-12 text-center my-4">
        <button
          className={`btn w-50 fw-bold ${
            portfolioAction === "create" ? "btn-success" : "btn-warning"
          }`}
          onClick={() =>
            allPortfolioDetails(userData, localPortfolioData, token)
          }
          disabled={isBtnDisabled}
        >
          {portfolioAction === "create" ? "Create " : "Update "}Your Portfolio
        </button>
        <p className="text-center my-2">
          <mark className="rounded-2 px-2 py-1">
            (Please fill all the necessary fields, then only the button will be
            active)
          </mark>
        </p>
      </div>
    </>
  );
};

export default Form_Contact_Section;
