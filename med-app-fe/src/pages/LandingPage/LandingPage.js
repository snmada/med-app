import React from 'react'
import {useNavigate} from 'react-router-dom'
import {AppBar, Toolbar, Grid, Box, Typography} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import '../LandingPage/LandingPage.css'
import medicalrecord from "../../images/patient-medical-record.png"

function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="container">
        <AppBar position="static" elevation={0} sx={{background: 'transparent', px:{xs: 2, sm: 10}, py:2, color: '#191919'}}>
            <Toolbar>
                <Typography sx={{flexGrow: 1, fontFamily: 'Montserrat, sans-serif', fontSize: '25px', fontWeight: '500'}}>MED</Typography>
                <Box className="login-button" onClick={() => {navigate("/login")}}>
                    <PersonIcon className="icon" sx={{fontSize: '1.5rem'}}/>
                    Log In
                </Box>
            </Toolbar>
        </AppBar>
        <Grid container sx={{px:{xs: 4, sm: 20}}}>
            <Grid item lg={6} sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Grid container py={12}>
                    <Grid item xs={12} md={12} pb={3}>
                        <div className="headline"><u style={{textDecorationThickness: '1px'}}>The Simple Way</u> To</div>
                        <div className="headline"><span style={{fontWeight: '400'}}>Organize</span> And <span style={{fontWeight: '400'}}>Maintain</span></div>
                        <div className="headline"><span style={{fontWeight: '300', backgroundColor: '#DAE2B6', width:'max-content'}}>Patient Records</span></div>
                        <div className="headline"><span style={{fontWeight: '400'}}>Effectively</span></div>
                    </Grid>
                    <Grid item xs={3} md={6} sx={{display: 'flex', justifyContent:{xs: 'flex-start', md: 'flex-end'}, alignItems: 'center', pr: 1}}>
                        <KeyboardDoubleArrowRightIcon sx={{fontSize: '40px'}}/>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{zIndex: '1'}}>
                        <button className="register-button" onClick={() => {navigate("/register")}}>Register now</button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6} sx={{height: '80vh', display:{xs: 'none', lg: 'flex'}, justifyContent:'center', alignItems: 'center'}}>
                <img className="medical-record" src={medicalrecord} alt=""/>
            </Grid>
        </Grid>
    </div>
  )
}

export default LandingPage