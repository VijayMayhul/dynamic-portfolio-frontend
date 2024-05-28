import React, { lazy, Suspense } from "react"; //importing lazy, suspense for lazy loading
import { BrowserRouter, Route, Routes } from "react-router-dom"; //importing react-router-dom tags for routing
import "./App.css"; //importing style sheet

//importing bootstrap 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

//imporing all child components for routing purpose
import Register from "./Login_Components/Register";
import Context_Api_Component from "./Context_Api_Component";
import ForgotPassword from "./Login_Components/ForgotPassword";
import ResetPassword from "./Login_Components/ResetPassword";
import User from "./Main_Components/User";
import Contact from "./Main_Components/Contact";
import Form_Home_Section from "./CRUD_Components/Form_Home_Section";
import Form_About_Section from "./CRUD_Components/Form_About_Section";
import Form_Skills_Section from "./CRUD_Components/Form_Skills_Section";
import Form_WorkExp_Section from "./CRUD_Components/Form_WorkExp_Section";
import Form_Education_Section from "./CRUD_Components/Form_Education_Section";
import Form_Projects_Section from "./CRUD_Components/Form_Projects_Section";
import Form_Contact_Section from "./CRUD_Components/Form_Contact_Section";
import Loading from "./Main_Components/Loading";
import Page_Not_Found from "./Main_Components/Page_Not_Found";

// Lazy loaded components
const Home = lazy(() =>
  import("./Main_Components/Home").then((module) =>
    delay(2000).then(() => module)
  )
);
const Portfolio = lazy(() =>
  import("./Main_Components/Portfolio").then((module) =>
    delay(2000).then(() => module)
  )
);
const Login = lazy(() =>
  import("./Login_Components/Login").then((module) =>
    delay(1000).then(() => module)
  )
);
const Templates = lazy(() =>
  import("./Main_Components/Templates").then((module) =>
    delay(1000).then(() => module)
  )
);
const Portfolio_Form = lazy(() =>
  import("./CRUD_Components/Portfolio_Form").then((module) =>
    delay(1000).then(() => module)
  )
);

//manual delay time
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  return (
    <BrowserRouter>
      <Context_Api_Component>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/user" element={<User />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="contact" element={<Contact />} />
              <Route path="templates" element={<Templates />} />
              <Route path="port_folio/:action" element={<Portfolio_Form />}>
                <Route index element={<Form_Home_Section />} />
                <Route path="section-home" element={<Form_Home_Section />} />
                <Route path="section-about" element={<Form_About_Section />} />
                <Route
                  path="section-skills"
                  element={<Form_Skills_Section />}
                />
                <Route
                  path="section-workExperience"
                  element={<Form_WorkExp_Section />}
                />
                <Route
                  path="section-education"
                  element={<Form_Education_Section />}
                />
                <Route
                  path="section-projects"
                  element={<Form_Projects_Section />}
                />
                <Route
                  path="section-contact"
                  element={<Form_Contact_Section />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Page_Not_Found />} />
          </Routes>
        </Suspense>
      </Context_Api_Component>
    </BrowserRouter>
  );
}

export default App;
