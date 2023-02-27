import {React} from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar  from "../../../components/NavBar/NavBar.js"
import {Grid, Paper, Typography, TextField, TextareaAutosize, Box, Button} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

function CreateMedicalRecord() {
    const navigate = useNavigate();
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

  return (
    <>
    <NavBar/>
    <form>
        <Grid container py={6}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                <Paper elevation={20} sx={{width: '850px', padding: '45px 50px'}}>
                    <Grid container>
                        <Grid item xs={12} px={1} style={{marginBottom: '25px', background: '#34626C', display: 'flex', justifyContent: 'center'}}>
                            <Typography sx={{fontSize: '22px', color: '#FBFBFB', p: 2}}>New Medical Record</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography py={1} sx={{fontSize: '25px'}}></Typography>
                            <Typography sx={{fontSize: '18px'}}></Typography>
                        </Grid>
                        <Grid item xs={12} py={3} px={0}>
                            <TextField size="small" label="Date" variant="filled" disabled defaultValue={date()} />
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <TextField required label="Diagnosis" name="diagnosis" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Symptoms *</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}}/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Treatment *</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize required maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}}/>
                    </Grid>
                    <Grid item pt={3}>
                        <Typography sx={{fontSize: '18px'}}>Remarks</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize maxRows={4} style={{width: '100%', height: '100px', padding: 10, fontSize: '15px'}}/>
                    </Grid>
                    <Grid container py={2}>
                        <Grid item xs={12} p={1}>
                            <Box display='flex' justifyContent='flex-end' sx={{background: 'transparent'}}>
                                <Button variant="contained" sx={{mr: 2, background: '#00917C'}} type="submit"><SaveIcon sx={{mr: 1}}/>SAVE</Button>
                                <Button variant="contained" sx={{background: '#F05454'}} onClick={() => {navigate("/patients/profile")}}><CloseIcon sx={{mr: 1}}/>CANCEL</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </form>
    </>
  )
}

export default CreateMedicalRecord
