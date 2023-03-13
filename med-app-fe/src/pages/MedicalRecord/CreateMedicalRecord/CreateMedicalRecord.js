import {React, useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import NavBar  from "../../../components/NavBar/NavBar.js"
import {Grid, Paper, Typography, TextField, TextareaAutosize, Box, Button, Alert} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import Axios from 'axios'

const initialState = {diagnosis: "", symptoms: "", treatment: "", remarks: ""}

function CreateMedicalRecord() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const param = useParams();

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [patient, setPatient] = useState({});

    const date = () => {
        if(new Date().getDate() < 10 && new Date().getMonth()+1 < 10){
            return new "0" + Date().getDate()+"/0"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        }
        else if(new Date().getDate() < 10){
            return new "0" + Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        }
        else if(new Date().getMonth()+1 < 10){
             return new Date().getDate()+"/0"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        }
        else{
            return new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

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
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()
        try 
        {
            const response = await Axios.post('http://localhost:3001/medical-record/add-medical-record', {
                id: param.patient_id,
                date: date(),
                formData: formData,
            });
            if(response.status === 200)
            {
                setSuccessMessage(response.data);
                setErrorMessage("");
            }
        }
        catch(error)
        {
            if(error.response.status === 409)
            {
                setErrorMessage(error.response.data);
                setSuccessMessage("");
            }
            else
            {
                alert('An error occured on server. Please try again later.');
            }
        }
    }

  return (
    <>
    <NavBar/>
    <form onSubmit={onSubmit}>
        <Grid container py={6}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                <Paper elevation={20} sx={{width: '850px', padding: '45px 50px'}}>
                    <Grid container>
                        <Grid item xs={12} px={1} style={{marginBottom: '25px', background: '#34626C', display: 'flex', justifyContent: 'center'}}>
                            <Typography sx={{fontSize: '22px', color: '#FBFBFB', p: 2}}>New Medical Record</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography py={1} sx={{fontSize: '25px'}}>{patient.lastName} {patient.firstName}</Typography>
                            <Typography sx={{fontSize: '18px'}}>{patient.cnp}</Typography>
                        </Grid>
                        <Grid item xs={12} py={3} px={0}>
                            <TextField size="small" label="Date" variant="filled" disabled defaultValue={date()} />
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <TextField required label="Diagnosis" name="diagnosis" variant="outlined" fullWidth onChange={handleChange}/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Symptoms *</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required name="symptoms" maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}} onChange={handleChange}/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Treatment *</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required name="treatment" maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}} onChange={handleChange}/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Remarks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize name="remarks" maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}} onChange={handleChange}/>
                    </Grid>
                    <Grid container py={2}>
                        <Grid item xs={12} p={1}>
                            <Box display='flex' justifyContent='flex-end' sx={{background: 'transparent'}}>
                                <Button variant="contained" sx={{mr: 2, background: '#00917C'}} type="submit"><SaveIcon sx={{mr: 1}}/>SAVE</Button>
                                <Button variant="contained" sx={{background: '#F05454'}} onClick={() => {navigate(`/patients/profile/${param.patient_id}`)}}><CloseIcon sx={{mr: 1}}/>CANCEL</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    {successMessage && <Alert severity="success" sx={{width: '100%'}}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error" sx={{width: '100%'}}>{errorMessage}</Alert>}
                </Paper>
            </Grid>
        </Grid>
    </form>
    </>
  )
}

export default CreateMedicalRecord
