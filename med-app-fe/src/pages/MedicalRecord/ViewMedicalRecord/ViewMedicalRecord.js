import {React, useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Grid, Paper, Box, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import Axios from 'axios'

function ViewMedicalRecord() {
    Axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const param = useParams();
    const [open, setOpen] = useState(false);
    const [patient, setPatient] = useState({});
    const [medicalRecord, setMedicalRecord] = useState({});
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getPatientData() {
            try
            {
                const response = await Axios.get(`http://localhost:3001/patient/get-patient-data/${param.patient_id}`);
                if(response)
                {
                    setPatient(response.data[0]);
                }
            }
            catch(error)
            {
                console.error("Error: ", error);
            }
        }
        getPatientData();
    }, [param.patient_id]);

    useEffect(() => {
        async function getMedicalRecord() {
            try
            {
                const response = await Axios.get(`http://localhost:3001/medical-record/get-medical-record/${param.medical_record_id}`);
                if(response)
                {
                    setMedicalRecord(response.data[0]);
                }
            }
            catch(error)
            {
                console.error("Error: ", error);
            }
        }
        getMedicalRecord();
    }, [param.medical_record_id]);

    const deleteMedicalRecord = async () => {
        try 
        {
            const response = await Axios.delete(`http://localhost:3001/medical-record/delete-medical-record/${param.medical_record_id}`);
            if(response.status === 200)
            {
                navigate(`/patients/profile/${param.patient_id}`);
            }
        }
        catch(error)
        {
            alert('An error occured on server. Please try again later.');
        }
    }


  return (
    <>
        <AppBar sx={{position: 'relative', background: '#ECF4F3'}}>
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <IconButton edge="start" color="inherit" onClick={()=> {navigate(`/patients/profile/${param.patient_id}`)}}><CloseIcon sx={{color: '#056676'}}/></IconButton>
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
                            <Typography sx={{fontSize: '16px'}}>No. {medicalRecord.id}</Typography>
                            <Typography sx={{fontSize: '16px'}}>Date: {medicalRecord.date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography p={1}  sx={{fontSize: '18px'}}>Patient: {patient.lastName} {patient.firstName}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{background: 'white', display: 'flex', pb:2}}>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>CNP</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.cnp}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Date of Birth</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.dateOfBirth}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Age</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.age}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Gender</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.gender}</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Weight</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.weight} kg</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Height</Typography>
                            <Typography sx={{fontSize: '14px'}}>{patient.height} cm</Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={12} sx={{border: '3px solid #CBEDD5', p:1}}>
                        <Typography sx={{fontSize: '18px'}}>Diagnosis: {medicalRecord.diagnosis}</Typography>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Symptoms</Typography>
                        <Divider/>
                    </Grid>
                    <Grid container pt={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}>{medicalRecord.symptoms}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Treatment</Typography>
                        <Divider/>
                    </Grid>
                    <Grid container py={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}>{medicalRecord.treatment}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Remarks</Typography>
                        <Divider/>
                    </Grid>
                    <Grid container py={2}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: '15px'}}>{medicalRecord.remarks}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid> 
        </Grid>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Confirm delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the medical record? <br></br> You can't undo this action.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{background: '#F05454', color: '#FBFBFB', "&:hover": {background: '#FFB84C'}}} onClick={deleteMedicalRecord}>Confirm</Button>
            </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewMedicalRecord