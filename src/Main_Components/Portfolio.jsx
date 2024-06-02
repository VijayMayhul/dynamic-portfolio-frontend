import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react"; //importing all necessary hooks and methods
import { dpContext } from "../Context_Api_Component.jsx"; //imporing dpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import jsPDF from "jspdf"; //importing jsPDF to structurize the pdf
import html2canvas from "html2canvas"; //importing html2canvas to creat the pdf
import "./Main.css"; //importing style sheet
import { delay } from "../App.jsx"; //importing delay method
import Loading from "./Loading.jsx"; //importing loading component

// Lazy loading components with a delay
const Template_1 = lazy(() =>
  import("../Template_Components/Template_1.jsx").then((module) =>
    delay(2000).then(() => module)
  )
);

const Template_2 = lazy(() =>
  import("../Template_Components/Template_2.jsx").then((module) =>
    delay(2000).then(() => module)
  )
);

const Portfolio = () => {
  //getting necessary things from context API
  const {
    userPortfolioData,
    deletePortfolioData,
    userData,
    token,
    portfolioAction,
    fetchUserPortfolioData,
  } = useContext(dpContext);
  const navigate = useNavigate();
  const data = userPortfolioData;

  //refering component useRef
  const componentRef = useRef(null);

  //spinning effect state
  const [pdfLoaded, setPdfLoaded] = useState(false);

  //fetching user portfolio data
  useEffect(() => {
    if (userData.portfolio_id !== null && token) {
      fetchUserPortfolioData(token);
    }
  }, [portfolioAction, userData.portfolio_id]);

  //creating the pdf - method
  const handleExportToPDF = async () => {
    setPdfLoaded(true);
    const input = componentRef.current;

    // Adjust scale to increase resolution
    const scale = 4;

    try {
      const canvas = await html2canvas(input, { scale });
      // Adjust quality parameter (between 0 and 1)
      const imgData = canvas.toDataURL("image/jpeg", 0.8);

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Handle multi-page PDF generation
      let yOffset = 0;
      while (yOffset < pdfHeight) {
        if (yOffset > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "JPEG", 0, -yOffset, pdfWidth, pdfHeight);
        yOffset += pdf.internal.pageSize.getHeight();
      }

      pdf.save("YourPortfolio.pdf");
    } finally {
      setPdfLoaded(false);
    }
  };

  return (
    <>
      <section className="d-flex flex-column">
        <Suspense fallback={<Loading />}>
            <h1 className="h1 text-center py-3">Portfolio</h1>
            {userPortfolioData.template === "Template_1" ? (
              <Template_1 data={data} ref={componentRef} />
            ) : userPortfolioData.template === "Template_2" ? (
              <Template_2 data={data} ref={componentRef} />
            ) : (
              <div className="text-center mt-5 pb-5 flex-grow-1 d-flex flex-column justify-content-center">
                <p className="fw-normal">
                  You have not created your portfolio yet! Please use the below
                  button to create your portfolio
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-success mt-3 mb-5"
                    onClick={() => navigate("/user/templates")}
                  >
                    Create Portfolio
                  </button>
                </div>
              </div>
            )}

            {userPortfolioData && Object.keys(userPortfolioData).length > 0 && (
              <div className="mt-4 d-flex justify-content-around mt-2 flex-column flex-sm-row align-items-center">
                <div>
                  <button
                    className="btn btn-danger fw-normal my-3"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePortfolioModal"
                  >
                    Delete Portfolio
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-primary fw-normal my-3"
                    onClick={() => navigate("/user/templates")}
                  >
                    Update Portfolio
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-warning fw-bold my-3"
                    onClick={handleExportToPDF}
                  >
                    Export to PDF
                    {pdfLoaded && (
                      <span
                        className="spinner-border text-white spinner-border-sm fw-normal ms-2"
                        role="status"
                      ></span>
                    )}
                  </button>
                </div>
              </div>
            )}
         
        </Suspense>
      </section>
      <div
        className="modal fade"
        id="deletePortfolioModal"
        tabIndex="-1"
        aria-labelledby="deletePortfolioModalTitle"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deletePortfolioModalTitle">
                Delete Portfolio
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete your portfolio details? This
                action cannot be undone, and you will lose all your portfolio
                information.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deletePortfolioData(userData, token)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
