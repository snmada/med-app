import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, ListItemIcon} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import '../NavBar/NavBar.css'
import {NavMenuLinks as navLink} from '../NavBar/NavMenuLinks.js'
import LogoutIcon from '@mui/icons-material/Logout'
import Axios from 'axios'

function NavBar() {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [anchorNavMenu, setAnchorNavMenu] = useState(false);
    const [anchorUserMenu, setAnchorUserMenu] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [elevationChange, setElevationChange] = useState(false);

    useEffect(() => {
        async function getUser() {
            try
            {
                const response = await Axios.get('http://localhost:3001/signin/user-sign-in');
                if(response)
                {
                    setUserInitials(response.data.lastname[0] + "" + response.data.firstname[0]);
                }
            }
            catch(error)
            {
                console.error("Error: ", error);
            }
        }
        getUser();
    }, []);

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

    const changeNavbarElevation = () =>{
        if(window.scrollY >= 80)
        {
            setElevationChange(true);
        }
        else
        {
            setElevationChange(false);
        }
    }
    window.addEventListener('scroll', changeNavbarElevation);

    const logout = async () => {
        try 
        {
            const {status} = await Axios.post('http://localhost:3001/signout/signout');
            status === 200 && navigate("/");
        }
        catch(error)
        {
            alert('An error occured on server. Please try again later.');
        }
    }

  return (
    <AppBar position="sticky" elevation={elevationChange? 3 : 0} sx={{background: '#ECF4F3', py: 1, px: 5}}>
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
                    <Tooltip title="Account">
                        <IconButton onClick={handleOpenUserMenu}> <Avatar sx={{background: '#68A7AD'}}>{userInitials}</Avatar></IconButton>
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
                        <MenuItem onClick={logout}>
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