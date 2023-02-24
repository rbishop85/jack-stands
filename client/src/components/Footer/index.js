import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="" id="footer">
      <div className="">
        {location.pathname !== '/' && (
          <button
            className=""
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        jackStands © 2023
      </div>
    </footer>
  );
};

export default Footer;
