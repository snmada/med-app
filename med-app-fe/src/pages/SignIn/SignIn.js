import {React, useState} from 'react'
import {Grid, Paper, Box, Typography, TextField, IconButton, InputAdornment} from "@mui/material"
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import "../SignIn/SignIn.css"

const initialState = {email: "", password: ""};

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const schema = yup.object().shape({
        email: yup.string().email("Must be an valid email")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        console.log("Ok")
    }

  return (
    <Grid container className="background">
        <Grid item>
            <Paper elevation={0} style={{background: 'transparent', width: '500px', padding: '0px 60px'}} >
                <Box pb={3} className="box">
                    <Typography sx={{fontFamily: 'Montserrat, sans-serif', color: "#191919", fontSize: '25px', fontWeight: '500', cursor: 'pointer'}} onClick={() => {navigate("/")}}>MED</Typography>
                </Box>
                <Box pb={4} className="box">
                    <Typography sx={{fontFamily: 'Montserrat, sans-serif', color: "#61847a", fontSize: '25px', fontWeight: '400'}}>Welcome Back!</Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={12} py={1}>
                            <TextField {...register("email")} required name="email" type="text" label="Email" variant="outlined" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.email?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <TextField required name="password" label="Password" variant="outlined" fullWidth onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} py={3}>
                            <button type="submit" className="submit-button">Log In</button>
                        </Grid>
                        <Grid item xs={12} py={1} sx={{display: 'flex', color: '#205E61'}}>
                            <Typography style={{fontSize: '14px'}}>Don't have an account?</Typography>
                            <Typography onClick={() => {navigate("/register")}} sx={{cursor: 'pointer', fontSize: '14px', textDecoration: 'underline'}} pl={1}>Create an account</Typography>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    </Grid>
  )
}

export default SignUpPage