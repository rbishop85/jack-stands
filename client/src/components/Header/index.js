import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import Auth from '../../utils/auth';

const Header = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const nav = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Navigation Button Press
  const navButton = (location) => {
    nav(location);
    handleCloseNavMenu();
  }

  const titleNav = () => {
    Auth.loggedIn() ? (
      nav("/me")
    ) : (
      nav("/")
    )
  }

  // User links
  // #### Page not setup yet ####
  const userEdit = () => {
    nav(" ");
    handleCloseUserMenu();
  }
  const userLogout = () => {
    Auth.logout();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" id="header" sx={{ height: 68.5 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Icon and Title in Desktop */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            onClick={titleNav}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            jackStands
          </Typography>

          {/* Nav Menu in Mobile */}
          {Auth.loggedIn() ? (
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                {/* {Auth.loggedIn() ? (
                  <div> */}
                    <MenuItem onClick={() => navButton("/me")}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navButton("/garage")}>
                      <Typography textAlign="center">Garage</Typography>
                    </MenuItem>
                  {/* </div>
                ) : (
                  <></>
                )} */}
            </Menu>
          </Box>
          ) : (
            <Box sx={{ flexGrow: 1, width: 8, display: { xs: 'flex', md: 'none' } }} />
          )}

          {/* Icon and Title in Mobile */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            onClick={titleNav}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            jackStands
          </Typography>

          {/* Nav Menu in Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {Auth.loggedIn() ? (
                <>
                  <Button
                    onClick={() => navButton("/me")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={() => navButton("/garage")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Garage
                  </Button>
                </>
              ) : (
                <>
                  {/* <Button
                    onClick={() => navButton("/")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Home
                  </Button>
                  <Button
                    onClick={() => navButton("/login")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navButton("/signup")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Signup
                  </Button> */}
                </>
              )}
          </Box>

          {/* User Menu when logged in*/}
          {Auth.loggedIn() ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={userEdit}>
                    <Typography textAlign="center">Edit Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={userLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>

            </>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;


