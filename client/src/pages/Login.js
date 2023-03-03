import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
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

    // Clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <div id="login">
      {!Auth.loggedIn() ? (
        <>
          <Container 
            component="main" 
            maxWidth="xs" 
            className="fullPage"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ m: 1 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box 
                component="form" 
                onSubmit={handleFormSubmit}
                noValidate
                sx={{ 
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 300
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formState.username}
                  onChange={handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formState.password}
                  onChange={handleChange}
                />
                {error && (
                <div className="error">
                  {error.message}
                </div>
                )}
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <Navigate to="/me" />
      )}
    </div>
  );

};

export default Login;