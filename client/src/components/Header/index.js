import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="" id="header">
      <div className="">
        <div>
          <Link className="" to="/">
            <h1 className="">jackStands</h1>
          </Link>
          <p className="">Document your build</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
