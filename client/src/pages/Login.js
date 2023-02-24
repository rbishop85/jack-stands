import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <div id="login">
      {!Auth.loggedIn() ? (
        <>
          <div>
            <main className="">
              <div className="">
                <div className="">
                  <h4 className="">Login</h4>
                  <div className="">
                    {data ? (
                      <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                      </p>
                    ) : (
                      <form onSubmit={handleFormSubmit}>
                        <input
                          className=""
                          placeholder="Your username"
                          name="username"
                          type="username"
                          value={formState.username}
                          onChange={handleChange}
                        />
                        <input
                          className=""
                          placeholder="******"
                          name="password"
                          type="password"
                          value={formState.password}
                          onChange={handleChange}
                        />
                        <button
                          className=""
                          style={{ cursor: 'pointer' }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    )}

                    {error && (
                      <div className="">
                        {error.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );

};

export default Login;
