import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Grid, Stack } from '@mui/material';

import Auth from "../utils/auth";

const Home = () => {

  const nav = useNavigate();
  
  const navButton = (location) => {
    nav(location);
  }

  return (
    <main id="home">
      {!Auth.loggedIn() ? (
        <>
          <Grid className='grid' container justifyContent="center" alignItems="center">
            <Stack spacing={2} direction="column" sx={{ margin: 'auto', maxWidth: 150 }}>
              <Button variant="contained" onClick={() => navButton("/login")}>Login</Button>
              <Button variant="contained" onClick={() => navButton("/signup")}>Signup</Button>
            </Stack>
          </Grid>
        </>
      ) : (
        <Navigate to="/me" />
      )}
    </main>
  );
};

export default Home;
