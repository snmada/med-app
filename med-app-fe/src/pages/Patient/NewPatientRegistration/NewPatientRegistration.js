import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar  from "../../../components/NavBar/NavBar.js"
import {Grid, Paper, Typography, TextField, Autocomplete, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, createFilterOptions, Box, Button} from "@mui/material"
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

const initialState = {firstName: "", lastName: "", cnp: "", dateOfBirth: "", age: "", gender: "", occupation: "", street: "", buildingNumber: "", floor: "",
    appartment: "", city: "", county: "", phoneNumber: "", email: "", weight: "", height: "", bloodGroup: "", rhFactor: "", allergies: ""}

function NewPatientRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if(e.target.name == 'cnp' && validateCNP(e.target.value)){
            const birthInfo = getBirthInfo(e.target.value);
            setFormData({...formData, dateOfBirth: birthInfo[0], age: birthInfo[1], gender: birthInfo[2]});
        }
    }

    const schema = yup.object().shape({
        firstName: yup.string().matches(/[a-zăâîșțĂÂÎȘȚ -]+/i, "Must be only letters"),
        lastName: yup.string().matches(/[a-zăâîșțĂÂÎȘȚ -]+/i, "Must be only letters"),
        cnp: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(13, 'Must be a valid CNP').max(13, 'Must be a valid CNP'),
        phoneNumber: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be exactly 10 digits').max(10, 'Must be exactly 10 digits'),
        email: yup.string().email("Must be an valid email"),
        weight: yup.number().positive().integer().min(30).max(300),
        height: yup.number().positive().integer().min(30).max(250),
        bloodGroup: yup.string().nullable().required("Blood group is required"),
        rhFactor: yup.string().nullable().required("RH factor is required")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const filter = createFilterOptions();

    const validateCNP = (cnp) => {
        if(cnp.length === 13){
            return 1;
        }
        return 0;
    }

    const getBirthInfo = (cnp) => {
        let year, month, day, age, gender, month_difference="", full_year="";
        if(cnp.substring(0,1) === "1" || cnp.substring(0,1) === "5" || cnp.substring(0,1) === "7"){
            gender = "M";
        }
        if(cnp.substring(0,1) === "2" || cnp.substring(0,1) === "6" || cnp.substring(0,1) === "8"){
            gender = "F";
        }

        if(cnp.substring(0,1) === "1" || cnp.substring(0,1) === "2"){
            year = parseInt("19" + cnp.substring(1,3));
        }
        if(cnp.substring(0,1) === "5" || cnp.substring(0,1) === "6"){
            year = parseInt("20" + cnp.substring(1,3));
        }

        month = cnp.substring(3, 5);
        day = cnp.substring(5, 7);

        month_difference = Date.now() - new Date(month + "/" + day + "/" + year).getTime();
        full_year = new Date(month_difference).getUTCFullYear();

        age = Math.abs(full_year - 1970);

        return [day + "/" + month + "/" + year, age, gender];
    }

    const allergens = ['dairy', 'gluten', 'egg', 'fish', 'sesame', 'coconut', 'mustard', 'peanuts'];

    const optionsBloodGroup = [
        {label: "O", value: "O"},
        {label: "A", value: "A"},
        {label: "B", value: "B"},
        {label: "AB", value: "AB"}
    ];

    const optionsRHFactor = [
        {label: "-/negative", value: "-/negative"},
        {label: "+/positive", value: "+/positive"}
    ]

    const onSubmit = () => {
        console.log(formData)
    }

  return (
    <>
    <NavBar/>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{background: 'white', py: 6}}>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={20} sx={{width: {xs: '500px', sm: '850px'}, padding:'45px 50px'}}>
                    <Grid container>
                        <Grid item xs={12} px={1} style={{marginBottom: '25px', background: '#34626C', display: 'flex', justifyContent: 'center'}}>
                            <Typography sx={{fontSize: '22px', color: '#FBFBFB', p: 2}}>New Patient Registration</Typography>
                        </Grid>
                        <Grid item xs={12} px={1}>
                            <Typography className="description">Personal Information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("firstName")} required name="firstName" type="text" label="First name" variant="standard" size="small" fullWidth onChange={handleChange}/>
                            <Typography  className="error">{errors.firstName?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("lastName")} required name="lastName" type="text" label="Last name" variant="standard" size="small" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.lastName?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} p={1}>
                            <TextField {...register("cnp")} required name="cnp" type="text" label="CNP" variant="standard" size="small" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.cnp?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} p={1}>
                            <TextField name="dateOfBirth" type="text" label="Date of birth" variant="standard" size="small" fullWidth value={formData.dateOfBirth}/>
                        </Grid>
                        <Grid item xs={12} sm={2} p={1}>
                            <TextField name="age" type="text" label="Age" variant="standard" size="small" fullWidth value={formData.age}/>
                        </Grid>
                        <Grid item xs={12} sm={2} p={1}>
                            <TextField name="gender" type="text" label="Gender" variant="standard" size="small" fullWidth value={formData.gender}/>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <TextField {...register("occupation")} required name="occupation" type="text" label="Occupation" variant="standard" size="small" fullWidth onChange={handleChange}/>
                        </Grid> 
                        <Grid item xs={12} mt={2} px={1}>
                            <Typography className="description">Address</Typography>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <TextField {...register("street")} required name="street" type="text" label="Street" variant="standard" size="small" fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <TextField {...register("buildingNumber")}  name="buildingNumber" type="text" label="Building number" variant="standard" size="small" fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <TextField {...register("floor")} name="floor" type="text" label="Floor" variant="standard" size="small" fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <TextField {...register("appartment")} name="appartment" type="text" label="Appartment" variant="standard" size="small" fullWidth onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['Alba Iulia', 'Arad', 'Pitești', 'Bacău', 'Oradea', 'Brașov','Cluj-Napoca', 'București', 'Timișoara']}
                                onChange={(event, newValue) => {setFormData({...formData, city: newValue})}}
                                renderInput={(params) => <TextField {...params} {...register("city")} required variant="standard" label="City" size="small"/>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Brașov','Cluj', 'Ilfov', 'Timiș']}
                                onChange={(event, newValue) => {setFormData({...formData, county: newValue})}}
                                renderInput={(params) => <TextField {...params} {...register("county")}  required variant="standard" label="County" size="small"/>}
                            />
                        </Grid>
                        <Grid item xs={12} mt={2} px={1}>
                            <Typography className="description">Contact</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("phoneNumber")} required name="phoneNumber" type="text" label="Phone number" variant="standard" size="small" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.phoneNumber?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("email")} name="email" type="text" label="E-mail" variant="standard" size="small" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.email?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <Typography className="description">Medical Information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("weight")} required name="weight" label="Weight" variant="standard" 
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                            }} size="small" fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.weight?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} p={1}>
                            <TextField {...register("height")} required name="height" type="number" label="Height" variant="standard" InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }} size="small"  fullWidth onChange={handleChange}/>
                            <Typography className="error">{errors.height?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <FormControl>
                                <FormLabel>Blood Group</FormLabel>
                                <RadioGroup row name="bloodGroup" onChange={handleChange} >
                                    {
                                        optionsBloodGroup.map((val) => {
                                            return (
                                                <FormControlLabel {...register("bloodGroup")} value={val.value} control={<Radio/>} label={val.label} key={val.value}/>
                                            )
                                        })      
                                    }
                                </RadioGroup>
                            </FormControl>
                            <Typography className="error">{errors.bloodGroup?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <FormControl>
                                <FormLabel>RH Factor</FormLabel>
                                <RadioGroup row name="rhFactor" onChange={handleChange} >
                                    {
                                        optionsRHFactor.map((val) => {
                                            return (
                                                <FormControlLabel {...register("rhFactor")} value={val.value} control={<Radio/>} label={val.label} key={val.value}/>
                                            )
                                        })      
                                    }
                                </RadioGroup>
                            </FormControl>
                            <Typography className="error">{errors.rhFactor?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} p={1} mb={3}>
                            <FormControl>
                            <FormLabel>Allergies</FormLabel>
                                <Autocomplete
                                    multiple
                                    placeholder="Favorites"
                                    options={allergens}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(event, newValue) => {setFormData({...formData, allergies: newValue})}}
                                   
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                        const {inputValue} = params;
                                        const isExisting = options.some((option) => inputValue === option.title);
                                        
                                        if (inputValue !== '' && !isExisting) {
                                          filtered.push(inputValue);
                                        }
                                        return filtered;
                                    }}
                                    sx={{width: '300px'}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <Box display='flex' justifyContent='flex-end' sx={{background: 'transparent'}}>
                                <Button variant="contained" sx={{mr: 2, background: '#00917C'}} type="submit"><SaveIcon sx={{mr: 1}}/>SAVE</Button>
                                <Button variant="contained" sx={{background: '#F05454'}} onClick={() => {navigate("/patients")}}><CloseIcon sx={{mr: 1}}/>CANCEL</Button>
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

export default NewPatientRegistration