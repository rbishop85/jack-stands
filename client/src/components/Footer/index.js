import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="">
      - - - - - start footer - - - - -
      <div className="">
        {location.pathname !== '/' && (
          <button
            className=""
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Made with{' '}
          <span
            className=""
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Tech Thoughts team.
        </h4>
      </div>
      - - - - - end footer - - - - -
    </footer>
  );
};

export default Footer;
