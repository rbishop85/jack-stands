import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Stack } from '@mui/material';

const Home = () => {

  const nav = useNavigate();
  
  const navButton = (location) => {
    nav(location);
  }

  return (
    <main id="home">
      <Grid className='fullPage' container justifyContent="center" alignItems="center">
        <Stack spacing={2} direction="column" sx={{ margin: 'auto' }}>
          <Button variant="contained" sx={{width: 200}} onClick={() => navButton("/login")}>Login</Button>
          <Button variant="contained" sx={{width: 200}} onClick={() => navButton("/signup")}>Signup</Button>
        </Stack>
      </Grid>
    </main>
  );
};

export default Home;
