import {React, useState} from 'react'
import {Grid, Typography, TextField, Box, Alert} from '@mui/material'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import './SignUp.css'
import Axios from 'axios'

function StepTwo({formData, handleChange, handleNext, handleBack}) {

    const schema = yup.object().shape({
        uid: yup.string().required("UID is required").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {
        try 
        {
            const {status} = await Axios.post('http://localhost:3001/signup/uid',{
                uid: formData.uid
            });
            status === 200 && handleNext();
        }
        catch(error)
        {
            (error.response.status === 404 || error.response.status === 409)? setErrorMessage(error.response.data) : alert('An error occured on server. Please try again later.');
        }
    };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container py={2}>
            <Grid item xs={12} py={3}>
                <Typography className="description">Doctor Information</Typography>
            </Grid>
            <Grid item xs={12} py={1}>
                <TextField {...register("uid")} required value={formData.uid} name="uid" type="text" label="UID" variant="outlined" onChange={handleChange} fullWidth/>
                <Typography className="error">{errors.uid?.message}</Typography>
            </Grid>
            {errorMessage &&  <Alert severity="error" sx={{width: '100%'}}>{errorMessage}</Alert>}
            <Grid item xs={12} pt={2} pb={7}>
                <Typography sx={{fontSize: '14px', color: '#9d9d9d'}}>Note: Enter your doctor UID (Unique Identifier) to prove that you are part of healthcare system.</Typography>
            </Grid>
            <Grid item xs={6} py={2}>
                <Box xs={6} className="back">
                    <button onClick={handleBack} className="back-button">Back</button>
                </Box>
            </Grid>
            <Grid item xs={6} py={2}>
                <Box xs={6} className="next">
                    <button type="submit" className="next-button">Next Step</button>
                </Box>
            </Grid>
        </Grid>
    </form>
    </>
  )
}

export default StepTwo