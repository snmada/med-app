import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, ListItemIcon} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import "../NavBar/NavBar.css"
import {NavMenuLinks as navLink} from "../NavBar/NavMenuLinks.js"
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar() {
    const navigate = useNavigate();
    const [anchorNavMenu, setAnchorNavMenu] = useState(false);
    const [anchorUserMenu, setAnchorUserMenu] = useState(false);

    const handleOpenNavMenu = (e) => {
        setAnchorNavMenu(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorNavMenu(false);
    }

    const handleOpenUserMenu = (e) => {
        setAnchorUserMenu(e.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorUserMenu(false);
    }

  return (
    <AppBar position="sticky" sx={{background: '#FFFFFF'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography sx={{display: {xs: 'none', md: 'flex'}, fontFamily: 'Montserrat, sans-serif', fontSize: '25px', fontWeight: '500', color: '#191919'}}>MED</Typography>
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton aria-controls="menu" onClick={handleOpenNavMenu}><MenuIcon/></IconButton>
                    <Menu
                        id="menu"
                        sx={{display: {xs: 'block', md: 'none'}}}
                        anchorEl={anchorNavMenu}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        transformOrigin={{horizontal: 'left', vertical: 'top'}}
                        keepMounted
                        open={Boolean(anchorNavMenu)}
                        onClose={handleCloseNavMenu}
                        disableScrollLock={true}
                    >
                        {navLink.map((val, key) => (
                            <MenuItem key={key} onClick={() => {navigate(val.link)}}>
                                <Typography textAlign="center">{val.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, ml: '35px', borderRadius: 0}}>
                    {navLink.map((val, key) => (
                        <Button key={key} onClick={() => {navigate(val.link)}}
                        sx={{my: 1, color: '#191919', display: 'block', fontSize: '18px', textTransform: 'none'}}
                        id={window.location.pathname.match(val.link)? "active" : ""}>
                            {val.title}
                        </Button>
                    ))}
                </Box>
                <Typography sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}, fontFamily: 'Montserrat, sans-serif', fontSize: '25px', fontWeight: '500', color: '#191919'}}>MED</Typography>
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Settings">
                        <IconButton onClick={handleOpenUserMenu}><Avatar></Avatar></IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-user"
                        sx={{mt: '45px'}}
                        anchorEl={anchorUserMenu}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        transformOrigin={{horizontal: 'right',  vertical: 'top'}}
                        keepMounted
                        open={Boolean(anchorUserMenu)}
                        onClose={handleCloseUserMenu}
                        disableScrollLock={true}
                    >
                        <MenuItem  onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavBar