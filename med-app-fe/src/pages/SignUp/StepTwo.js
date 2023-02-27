import React from 'react'
import {Grid, Typography, TextField, Box} from "@mui/material"
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import "./SignUp.css"

function StepOne({formData, handleChange, handleNext, handleBack}) {

    const schema = yup.object().shape({
        uid: yup.string().required("UID is required").min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits'),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        handleNext();
    }

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
            <Grid item xs={12} pt={2} pb={7}>
                <Typography sx={{fontSize: '14px', color: '#9d9d9d'}}>Note: Enter your doctor UID (Unique Identifier) to prove that you are part of healthcare system. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
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

export default StepOne