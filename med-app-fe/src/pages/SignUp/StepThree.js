import {React, useEffect, useState} from 'react'
import {Grid, Typography, TextField, Box, IconButton, InputAdornment} from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import YupPassword from 'yup-password'
YupPassword(yup)

function StepOne({formData, handleChange, handleNext, handleBack}) {

    const [changed, setChanged] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const schema = yup.object().shape({
        password: yup.string().password(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match. Try again.")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        handleNext();
    }

    const setCorrect = (id) => {
        let text = document.querySelector(`#${id}`);
        text.style.color = "green";
    }

    const setIncorrect = (id) => {
        let text = document.querySelector(`#${id}`);
        text.style.color = "#f52a2a";
    }

    const validatePassword = () => {
        if(changed)
        {
            if(formData.password.trim().length < 8){
                setIncorrect("number-char");
            }else{
                setCorrect("number-char");
            }
    
            if(/[1-9]/g.test(formData.password.trim())){
                setCorrect("digit");
            }else{
                setIncorrect("digit");
            }
    
            if(/[a-z]/g.test(formData.password.trim())){
                setCorrect("lower-letter");
            }else{
                setIncorrect("lower-letter");
            }
    
            if(/[A-Z]/g.test(formData.password.trim())){
                setCorrect("capital-letter");
            }else{
                setIncorrect("capital-letter");
            }
    
            if(/[.!?\\-]/g.test(formData.password.trim())){
                setCorrect("special-char");
            }else{
                setIncorrect("special-char");
            }
        }
    }

    useEffect(()=>{
        setChanged(true);
        validatePassword();
    },[formData.password])

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{background: 'transparent'}}>
            <Grid item xs={12} py={2}>
                <Typography className="description">Sign-In Information</Typography>
            </Grid>
            <Grid item xs={12} py={1}>
                <TextField {...register("password")} required value={formData.password} name="password" label="Password" variant="outlined" onChange={handleChange} fullWidth
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
            <Grid item xs={12} pt={1} pb={3}>
                <TextField {...register("confirmPassword")} required value={formData.confirmPassword} name="confirmPassword" label="Confirm password" variant="outlined" onChange={handleChange} fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <Typography className="error">{errors.confirmPassword?.message}</Typography>
            </Grid>
            <div className="pass-requirements">
                <p>Password must have at least: </p>
                <ul>
                    <li id="number-char">8 characters</li>
                    <li id="lower-letter">one lowercase character</li>
                    <li id="capital-letter">one uppercase character</li>
                    <li id="digit">one digit</li>
                    <li id="special-char">one special character /.-?!</li>
                </ul>
            </div>
            <Grid item xs={6} py={2}>
                <Box xs={6} className="back">
                    <button onClick={handleBack} className="back-button">Back</button>
                </Box>
            </Grid>
            <Grid item xs={6} py={2}>
                <Box xs={6} className="next">
                    <button type="submit" className="next-button">SUBMIT</button>
                </Box>
            </Grid>
        </Grid>
    </form>
    </>
  )
}

export default StepOne