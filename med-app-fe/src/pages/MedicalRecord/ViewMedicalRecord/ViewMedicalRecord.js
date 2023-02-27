import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Grid, Paper, Box, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'

function ViewMedicalRecord() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
        <AppBar sx={{position: 'relative', background: '#ECF4F3'}}>
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <IconButton edge="start" color="inherit" onClick={()=> {navigate("/patients/profile")}}><CloseIcon sx={{color: '#056676'}}/></IconButton>
                </Box>
                <Box>
                    <Button variant="contained" sx={{background: '#F05454'}} onClick={handleClickOpen}><DeleteIcon sx={{mr: 1}}/>DELETE</Button>
                </Box>
            </Toolbar>
        </AppBar>
        <Grid container sx={{background: 'white'}}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                <Paper elevation={20} sx={{width: '800px', padding: '45px 50px'}}>
                     <Grid container sx={{background: 'white'}}>
                        <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                            <Typography sx={{fontSize: '20px'}}>Medical Record</Typography>
                            <Typography sx={{fontSize: '16px'}}>No.</Typography>
                            <Typography sx={{fontSize: '16px'}}>Date:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography p={1}  sx={{fontSize: '18px'}}>Patient:</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{background: 'white', display: 'flex', pb:2}}>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>CNP</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Date of Birth</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Age</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Gender</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Weight</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Height</Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={12} sx={{border: '3px solid #CBEDD5', p:1}}>
                        <Typography sx={{fontSize: '18px'}}>Diagnosis: </Typography>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Symptoms</Typography>
                        <Divider/>
                    </Grid>
                    {/* <Grid container pt={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}></Typography>
                        </Grid>
                    </Grid> */}
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Treatment</Typography>
                        <Divider/>
                    </Grid>
                    {/* <Grid container py={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}></Typography>
                        </Grid>
                    </Grid> */}
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Remarks</Typography>
                        <Divider/>
                    </Grid>
                    {/* <Grid container py={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}></Typography>
                        </Grid>
                    </Grid> */}
                </Paper>
            </Grid> 
        </Grid>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Confirm delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete medical record? <br></br> You can't undo this action.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{background: '#F05454', color: '#FBFBFB', "&:hover": {background: '#FFB84C'}}}>Delete</Button>
            </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewMedicalRecord