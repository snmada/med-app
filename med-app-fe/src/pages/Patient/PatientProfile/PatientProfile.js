import {React, useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import NavBar  from '../../../components/NavBar/NavBar.js'
import {Grid, Paper, TextField, Typography, Box, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, Autocomplete, createFilterOptions, Tooltip, IconButton, Alert} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import Axios from 'axios'

function PatientProfile() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const param = useParams();
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);

    const filter = createFilterOptions();
    const allergens = ['dairy', 'gluten', 'egg', 'fish', 'sesame', 'coconut', 'mustard', 'peanuts'];

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [initialCNP, setInitialCNP] = useState("");

    const schema = yup.object().shape({
        firstName: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        lastName: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        cnp: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(13, 'Must be a valid CNP').max(13, 'Must be a valid CNP'),
        phoneNumber: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
        email: yup.string().email("Please use a valid email address"),
        weight: yup.number().positive().integer().min(30).max(300),
        height: yup.number().positive().integer().min(30).max(250)
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        async function getPatient() {
            try
            {
                const response = await Axios.get(`http://localhost:3001/patient/get-patient-data/${param.patient_id}`);
                if(response)
                {
                    const allergies = response.data[0].allergies;
                    if(allergies.split(', ').length - 1 > 0)
                    {
                        response.data[0].allergies = allergies.split(', ');
                    }
                    else
                    {
                        response.data[0].allergies = allergies.split(',');
                    }
                    setData(response.data[0]);
                    setInitialCNP(response.data[0].cnp);
                }
            }
            catch(error)
            {
                console.error("Error: ", error);
            }
        }
        getPatient();
    }, [param.patient_id]);

    useEffect(() => {
        async function getMedicalRecordList() {
            try
            {
                const response = await Axios.get(`http://localhost:3001/medical-record/get-medical-record-list/${param.patient_id}`);
                if(response)
                {
                    setRows(response.data);
                }
            }
            catch(error)
            {
                console.error("Error: ", error);
            }
        }
        getMedicalRecordList();
    }, [param.patient_id]);

    const handleChange = (e) => {
        if(validateCNP(e.target.name === "cnp" && e.target.value))
        {
            const birthInfo = getBirthInfo(e.target.value);
            setData({...data, cnp: e.target.value, dateOfBirth: birthInfo[0], age: birthInfo[1], gender: birthInfo[2]});
        }
        else{
            setData({...data, [e.target.name]: e.target.value});
        }
    }

    const validateCNP = (cnp) => {
        if(cnp.length === 13){
            return 1;
        }
        return 0;
    }

    const getBirthInfo = (cnp) => {
        let year, month, day, age, gender, month_difference = "", full_year ="";
        if(cnp.substring(0,1) === "1" || cnp.substring(0,1) === "5" || cnp.substring(0,1) === "7")
        {
            gender = "M";
        }
        if(cnp.substring(0,1) === "2" || cnp.substring(0,1) === "6" || cnp.substring(0,1) === "8")
        {
            gender = "F";
        }

        if(cnp.substring(0,1) === "1" || cnp.substring(0,1) === "2")
        {
            year = parseInt("19" + cnp.substring(1,3));
        }
        if(cnp.substring(0,1) === "5" || cnp.substring(0,1) === "6")
        {
            year = parseInt("20" + cnp.substring(1,3));
        }

        month = cnp.substring(3, 5);
        day = cnp.substring(5, 7);

        month_difference = Date.now() - new Date(month + "/" + day + "/" + year).getTime();
        full_year = new Date(month_difference).getUTCFullYear();

         age = Math.abs(full_year - 1970);

        return [day + "/" + month + "/" + year, age, gender];
    }

    const onSubmit = async () => {
        try 
        {
            const response = await Axios.put(`http://localhost:3001/patient/update-patient/${param.patient_id}`, {data, initialCNP: initialCNP});
            if(response.status === 200)
            {
                setSuccessMessage(response.data);
                setErrorMessage("");
            }
        }
        catch(error)
        {
            if( error.response.status === 409)
            {
                setErrorMessage(error.response.data);
                setSuccessMessage("");
            }
            else{
                alert('An error occured on server. Please try again later.');
            }
        }
    }

    const columns = [
        {field: 'id', headerName: 'No.', width: 70},
        {field: 'date', headerName: 'Date', type: 'date', width: 250},
        {field: 'view', headerName: 'Medical Record', width: 130, sortable: false, filterable: false,
            renderCell: (cellValues) => {
                return (
                    <Button variant="contained" sx={{background: '#FFE69A', color: 'black', "&:hover":{color: '#FBFBFB'}}} onClick={() => {navigate(`/patients/view-medical-record/${param.patient_id}/` + cellValues.id)}}>View</Button>
                )
            },
        },
    ]

    const optionsBloodGroup = [
        {value: "O"},
        {value: "A"},
        {value: "B"},
        {value: "AB"}
    ];

    const optionsRHFactor = [
        {value: "-/negative"},
        {value: "+/positive"}
    ];

  return (
    <>
    <NavBar/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container py={5}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
                <Paper elevation={0} sx={{width: {xs: '500px', sm: '1150px'}, padding:'0px 50px'}}>
                    {successMessage && <Alert severity="success" sx={{width: '100%'}}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error" sx={{width: '100%'}}>{errorMessage}</Alert>}
                    {editMode &&
                        <Grid container sx={{p: 1, mb: 3, mt: 1}}>
                            <Grid item xs={6} p={1}>
                                <Typography sx={{fontSize: '22px', fontWeight: 500, leterSpacing: '9px'}}>EDIT MODE</Typography>
                            </Grid>
                            <Grid item xs={6} p={1}>
                                <Box display='flex' justifyContent='flex-end'>
                                    <Button type="submit" variant="contained"  sx={{mr: 2, background: '#8FBDD3'}}><SaveIcon sx={{mr: 1}}/>SAVE</Button>
                                    <Button variant="contained" color="primary" sx={{background: '#F05454'}} 
                                        onClick={() => {
                                            setEditMode(false);
                                            setErrorMessage(false);
                                            setSuccessMessage(false)}}>
                                        <CloseIcon sx={{mr: 1}}/>CANCEL
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    }
                    <Grid container sx={{display: 'flex', py:1}}>
                        {
                            editMode? (
                                <>
                                <Grid item xs={12} sm={3} p={1}>
                                    <TextField type="text" {...register("firstName")} required name="firstName" label="First name" variant="outlined" fullWidth value={data.firstName} onChange={handleChange}/>
                                    <Typography className="error">{errors.firstName?.message}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3} p={1}>
                                    <TextField {...register("lastName")} required name="lastName" type="text" label="Last name" variant="outlined" fullWidth value={data.lastName} onChange={handleChange}/>
                                    <Typography className="error">{errors.lastName?.message}</Typography>
                                </Grid>
                                </>
                            ):
                            (
                                <Grid item xs={12} md={6} px={1} pb={4} sx={{display: 'flex'}}>
                                    <Typography sx={{fontSize: '27px'}}>{data.lastName} {data.firstName}</Typography>
                                    <Box sx={{ml: 3}}>
                                        <Tooltip title="Edit patient data">
                                            <IconButton onClick={() => {setEditMode(!editMode)}}>
                                                <EditIcon sx={{color: '#9F73AB', fontSize: '27px'}}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid container sx={{display: 'flex', pb:2}}>
                        <Grid item xs={12} md={3} p={1}>
                            {editMode?  (<><TextField {...register("cnp")} required name="cnp" type="text" label="CNP" variant="outlined"  fullWidth value={data.cnp} onChange={handleChange}/>
                                           <Typography className="error">{errors.cnp?.message}</Typography></>)
                                        :(<><Typography sx={{fontSize: '14px'}}>CNP</Typography>
                                            <Typography sx={{fontSize: '14px'}}>{data.cnp}</Typography></>)}
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Date of Birth</Typography>
                            <Typography sx={{fontSize: '14px'}}>{data.dateOfBirth}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Age</Typography>
                            <Typography sx={{fontSize: '14px'}}>{data.age}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            <Typography sx={{fontSize: '14px'}}>Gender</Typography>
                            <Typography sx={{fontSize: '14px'}}>{data.gender}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            {editMode?  (<><TextField {...register("weight")} required name="weight" label="Weight" variant="outlined" type="number"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }} fullWidth value={data.weight} onChange={handleChange}/>
                                            <Typography className="error">{errors.weight?.message}</Typography></>)
                                        :(<><Typography sx={{fontSize: '14px'}}>Weight</Typography>
                                            <Typography sx={{fontSize: '14px'}}>{data.weight} (kg)</Typography></>)}
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            {editMode?  (<><TextField {...register("height")} required name="height" label="Height" variant="outlined" type="number"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                            }} fullWidth value={data.height}  onChange={handleChange}/>
                                            <Typography className="error">{errors.height?.message}</Typography></>)
                                        :(<><Typography sx={{fontSize: '14px'}}>Height</Typography>
                                            <Typography sx={{fontSize: '14px'}}>{data.height} (cm)</Typography></>)}
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            {editMode?  (<FormControl required fullWidth variant="outlined">
                                                <InputLabel id="blood-group-label">Blood Group</InputLabel>
                                                <Select labelId="blood-group-label" label="Blood Group" value={data.bloodGroup} name="bloodGroup" onChange={handleChange}> 
                                                    {
                                                        optionsBloodGroup.map((val) => {
                                                            return(
                                                                <MenuItem value={val.value} key={val.value}>{val.value}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>)
                                        :(<><Typography sx={{fontSize: '14px'}}>Blood Group</Typography>
                                            <Typography sx={{fontSize: '14px'}}>{data.bloodGroup}</Typography></>)}
                        </Grid>
                        <Grid item xs={12} md={3} p={1}>
                            {editMode?  (<FormControl required fullWidth variant="outlined">
                                                <InputLabel id="rh-factor-label">RH factor</InputLabel>
                                                <Select labelId="rh-factor-label" name="rhFactor" label="RH factor" value={data.rhFactor} onChange={handleChange}>
                                                    {
                                                        optionsRHFactor.map((val) => {
                                                            return(
                                                                <MenuItem value={val.value} key={val.value}>{val.value}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>)
                                        :(<><Typography sx={{fontSize: '14px'}}>RH Factor</Typography>
                                            <Typography sx={{fontSize: '14px'}}>{data.rhFactor}</Typography></>)}
                        </Grid>
                    </Grid>
                    <Grid container sx={{background: '#FBFBFB'}}>
                        <Accordion sx={{width: '100%'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                <Typography>Further Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<TextField {...register("street")} required name="street" type="text" label="Street" variant="outlined" fullWidth value={data.street} onChange={handleChange}/>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Street</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.street}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<TextField {...register("buildingNumber")} required name="buildingNumber" type="text" label="Building number" variant="outlined" fullWidth value={data.buildingNumber} onChange={handleChange}/>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Building number</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.buildingNumber}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<TextField {...register("floor")} name="floor" type="text" label="Floor" variant="outlined" fullWidth value={data.floor} onChange={handleChange}/>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Floor</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.floor}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<TextField {...register("apartment")} name="apartment" type="text" label="Apartment" variant="outlined" value={data.apartment} fullWidth onChange={handleChange}/>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Apartment</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.apartment}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<Autocomplete
                                                        disablePortal
                                                        freeSolo
                                                        name="city"
                                                        value={data.city || ''}
                                                        inputValue={data.city || ''}
                                                        options={['Alba Iulia', 'Arad', 'Pitești', 'Bacău', 'Oradea', 'Brașov','Cluj-Napoca', 'București', 'Timișoara']}
                                                        onChange={(event, newValue) => {setData({...data, city: newValue})}}
                                                        onInputChange={(event, newValue) => {setData({...data, city: newValue})}}
                                                        renderInput={(params) => <TextField {...register("city")} {...params} required name="city" label="City" variant="outlined"/>}
                                                    />)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>City</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.city}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<Autocomplete
                                                        disablePortal
                                                        freeSolo
                                                        value={data.county || ''}
                                                        inputValue={data.county || ''}
                                                        options={['Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Brașov','Cluj', 'Ilfov', 'Timiș']}
                                                        onChange={(event, newValue) => {setData({...data, county: newValue})}}
                                                        onInputChange={(event, newValue) => {setData({...data, city: newValue})}}
                                                        renderInput={(params) => <TextField {...params} {...register("county")} required name="county" label="County" variant="outlined"/>}
                                                    />)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>County</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.county}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<><TextField {...register("phoneNumber")} required name="phoneNumber" type="text" label="Phone number" variant="outlined" fullWidth value={data.phoneNumber} onChange={handleChange}/>
                                                        <Typography className="error">{errors.phoneNumber?.message}</Typography></>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Phone number</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.phoneNumber}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<> <TextField {...register("email")} name="email" type="text" label="Email" variant="outlined" fullWidth value={data.email} onChange={handleChange}/>
                                                        <Typography className="error">{errors.email?.message}</Typography></>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Email</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.email}</Typography></>)}
                                    </Grid>
                                    <Grid item xs={12} md={4} p={1}>
                                        {editMode?  (<TextField {...register("occupation")} required name="occupation" type="text" label="Occupation" variant="outlined" fullWidth value={data.occupation} onChange={handleChange}/>)
                                                    :(<><Typography  sx={{fontSize: '16px'}}>Occupation</Typography>
                                                        <Typography sx={{fontSize: '14px'}}>{data.occupation}</Typography></>)}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{width: '100%'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                <Typography>Allergies</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {editMode?(
                                    <>
                                    <FormControl>
                                        <Autocomplete
                                            multiple
                                            sx={{width: '600px'}}
                                            options={allergens}
                                            value={data.allergies || []}
                                            renderInput={(params) => <TextField {...params} />}
                                            onChange={(event, newValue) => {setData({...data, allergies: newValue})}}
                                                   
                                            filterOptions={(options, params) => {
                                                const filtered = filter(options, params);
                                                const {inputValue} = params;
                                                const isExisting = options.some((option) => inputValue === option.title);
                                                        
                                                if (inputValue !== '' && !isExisting) 
                                                {
                                                    filtered.push(inputValue);
                                                }
                                                return filtered;
                                            }}
                                        />
                                    </FormControl>
                                    </>
                                    ):(<Typography sx={{fontSize: '14px'}}>{data.allergies? Array.isArray(data.allergies) && data.allergies.length > 1 ? data.allergies.join(', ') : data.allergies : ''}</Typography>)
                                }
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true} sx={{width: '100%'}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                <Typography>Consultations</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display='flex' justifyContent='flex-end' py={2}>
                                    <Tooltip title="Add new medical record">
                                        <Button onClick={()=>{navigate(`/patients/new-medical-record/${param.patient_id}`)}}><PostAddIcon sx={{color: '#056676', fontSize: '2rem'}}/></Button>
                                    </Tooltip>
                                </Box>
                                <Grid item>
                                    <div style={{height: 430, width: '100%'}}>
                                        {
                                            <DataGrid 
                                                columns={columns}
                                                pageSize={5}
                                                rowsPerPageOptions={[5]}
                                                rows={rows}
                                            />
                                        }
                                    </div>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </form>
    </>
  )
}

export default PatientProfile