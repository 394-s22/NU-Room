import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import FullProfile from './FullProfile';

const pages = ["Preferences", "Matches"];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = ({displayPage, setDisplayPage}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (event) => {
    console.log('event.target:',event.target)
    console.log('event.target.textContent:',event.target.textContent)
    if (event.target.textContent == "Preferences" && localStorage.getItem("userID") === null) {
      // if (localStorage.getItem("userID") === null) {
      //   setDisplayPage('FullProfile');
      // } else {
      //   setDisplayPage("Form");
      // }
      setDisplayPage("Form");
    } else if (event.target.textContent == "Matches") {
      setDisplayPage("Matches");
    }
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{mr: 2, ml: 2, display: { xs: 'none', md: 'flex' } }}
          >
            NU Room
          </Typography>
          
          

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} value={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: -5.5, flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            NU Room
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            <Button
            data-cy='navbarPref'
                key={'Preferences'}
                onClick={handleCloseNavMenu}
                value={'Preferences'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Preferences
              </Button>

              <Button
              data-cy='navbarMatch'
                key={'Matches'}
                onClick={handleCloseNavMenu}
                value={'Matches'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Matches
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;