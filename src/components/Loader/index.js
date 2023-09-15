import React from "react";
import spinner from '../../assets/Spinner-0.9s-223px.gif'
import "./style.css";

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} alt='Loading gif'></img>
    </div>
  );
};

export default Loader;
