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
          <Grid className='fullPage' container justifyContent="center" alignItems="center">
            <Stack spacing={2} direction="column" sx={{ margin: 'auto' }}>
              <Button variant="contained" sx={{width: 200}} onClick={() => navButton("/login")}>Login</Button>
              <Button variant="contained" sx={{width: 200}} onClick={() => navButton("/signup")}>Signup</Button>
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
