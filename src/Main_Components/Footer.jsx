import React from 'react'
import { NavLink } from 'react-router-dom' //importing NavLink for navigation
import './Main.css'; //importing style sheet

const Footer = () => {
  return (
    <>
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright{" "}
            <NavLink to={"mailTo:vijaymayhul@gmail.com"}>
              ©vijaymayhul@gmail.com
            </NavLink>{" "}
            2024. All rights Reserved
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer