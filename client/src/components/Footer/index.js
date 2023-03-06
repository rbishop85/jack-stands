import { Grid, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {

  return (
    <footer className="" id="footer">
      <Grid
        container
        justifyContent="center"
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            letterSpacing: '.3rem',
          }}
        >
          jackStands © 2023
        </Typography>
      </Grid>
    </footer>
  );
};

export default Footer;