//importing useContext to use context api and useState to create state variables
import React, { useContext, useState } from "react";
import { dpContext } from "../Context_Api_Component"; //imporing dpContext
import { useNavigate } from "react-router-dom"; //importing useNavigate for manual navigation
import './Main.css'; //importing style sheet

const Templates = () => {

    //getting necessary things from context API
    const { setTemp, portfolioAction } = useContext(dpContext);

    //using useNavigate hook to navigate between one component to another component
    const navigate = useNavigate();

    //getting img paths in an array
  const imagePaths = [
    '/Images/Template_img/Temp_1_img.png',
    '/Images/Template_img/Temp_2_img.png',
  ];

  //image index state
  const [clickedImageIndex, setClickedImageIndex] = useState(null);

  //handling the clicked image
  const handleImageClick = (index) => {
    setClickedImageIndex(index);
    setTemp(`Template_${index + 1}`);
    navigate(`/user/port_folio/${portfolioAction}`)
  };


  return <>
  <div className="container">
    <h1 className="text-center my-3">Templates</h1>
      <div className="row d-flex justify-content-center py-5">
        {imagePaths.map((path, index) => (
          <div key={index} className="col-lg-6 mb-4">
            <img
              src={path}
              alt={`Template ${index}`}
              className={`img-thumbnail bg-secondary temp-img ${clickedImageIndex === index ? 'temp-clicked' : ''}`}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>
      <div className="text-center mb-5">
        <span className="bg-light fw-bold px-3 py-2 rounded-2">More Templates Coming Soon!</span>
      </div>
    </div></>;
};

export default Templates;
