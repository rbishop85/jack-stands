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
      
      <Stack spacing={2} direction="column" sx={{ margin: 'auto', maxWidth: 150 }}>
        <Button variant="contained" onClick={() => navButton("/login")}>Login</Button>
        <Button variant="contained" onClick={() => navButton("/signup")}>Signup</Button>
      </Stack>

    </main>
  );
};

export default Home;
