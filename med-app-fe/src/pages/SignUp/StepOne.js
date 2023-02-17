import React from 'react'
import {Grid, Typography, TextField, Box} from "@mui/material"
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigate} from 'react-router-dom'
import "./SignUp.css"

function StepOne({formData, handleChange, handleNext}) {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().matches(/[a-zăâîșțĂÂÎȘȚ -]+/i, "Must be only letters"),
        lastName: yup.string().matches(/[a-zăâîșțĂÂÎȘȚ -]+/i, "Must be only letters"),
        email: yup.string().email("Must be an valid email")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = () => {
        handleNext()
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container py={2}>
            <Grid item xs={12} py={3}>
                <Typography className="description">Personal Information</Typography>
            </Grid>
            <Grid item xs={12} py={1}>
                <TextField {...register("firstName")} required value={formData.firstName} name="firstName" type="text" label="First Name" variant="outlined" onChange={handleChange} fullWidth/>
                <Typography className="error">{errors.firstName?.message}</Typography>
            </Grid>
            <Grid item xs={12} py={1}>
                <TextField {...register("lastName")} required value={formData.lastName} name="lastName" type="text" label="Last Name" variant="outlined" onChange={handleChange} fullWidth/>
                <Typography className="error">{errors.lastName?.message}</Typography>
            </Grid>
            <Grid item xs={12} py={1}>
                <TextField {...register("email")} required value={formData.email} name="email" type="text" label="Email" variant="outlined" onChange={handleChange} fullWidth/>
                <Typography className="error">{errors.email?.message}</Typography>
            </Grid>
            <Grid item xs={12} py={2} sx={{display: 'flex', color: '#205E61'}}>
                <Typography fontSize={'14px'}>Already have an account?</Typography>
                <Typography onClick={() => {navigate("/login")}} sx={{cursor: 'pointer', fontSize: '14px', textDecoration: 'underline'}} pl={1}>Sign In</Typography>
            </Grid>
            <Grid item xs={12} py={2}>
                <Box xs={12} className="next">
                    <button type="submit" className="next-button">Next Step</button>
                </Box>
            </Grid>
        </Grid>   
    </form>
    </>
  )
}

export default StepOne