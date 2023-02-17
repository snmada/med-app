import {React, useState} from 'react'
import {Grid, Paper, Box, Typography, Stepper, Step, StepLabel} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import LockIcon from '@mui/icons-material/Lock'
import StepOne from './StepOne.js'
import StepTwo from './StepTwo.js'
import StepThree from './StepThree.js'
import './SignUp.css'

const initialState = {firstName: "", lastName: "", email: "", uid: "", password: "", confirmPassword: ""};

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [step, setStep] = useState(0);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const steps = [
        <PersonIcon className="icon-step"/>,
        <AssignmentIndIcon className="icon-step"/>,
        <LockIcon className="icon-step"/>
    ]

    const handleNext = () => {
        setStep(step + 1);
    }

    const handleBack = () => {
        setStep(step - 1);
    }

    const handleForm = () => {
        switch(step){
            case 0:
                return <StepOne formData={formData} handleChange={handleChange} handleNext={handleNext}/>;
            case 1:
                return <StepTwo formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack}/>;
            case 2:
                return <StepThree formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack}/>;
        }
    }

  return (
    <Grid container className="background">
        <Grid item>
            <Paper elevation={0} sx={{background: 'transparent', width: '500px', padding: '0px 60px'}}>
                <Box py={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{fontFamily: 'Montserrat, sans-serif', fontSize: '25px', fontWeight: '500', cursor: 'pointer'}} onClick={() => {navigate("/")}}>MED</Typography>
                </Box>
                <Box py={1}>
                    <Stepper activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}
                                sx={{
                                    '& .MuiStepLabel-root .Mui-completed': {
                                        color: '#8EC3B2', 
                                    },
                                    '& .MuiStepLabel-root .Mui-active': {
                                        color: '#F9D97D', 
                                    },
                                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                        fill: 'black', 
                                    },
                                }}
                            >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {handleForm()}
            </Paper>
        </Grid>
    </Grid>
  )
}

export default SignUp