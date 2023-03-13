import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid, Box, Button} from '@mui/material'
import {DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton} from '@mui/x-data-grid'
import NavBar from '../../../components/NavBar/NavBar.js'
import Axios from 'axios'

function PatientList() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getPatientList() {
            try
            {
                const response = await Axios.get('http://localhost:3001/patient/get-patient-list');
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
        getPatientList();
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70, hideable: false},
        {field: 'view', headerName: 'Profile', width: 110, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button variant="contained" sx={{background: '#f8dc81', color: 'black', "&:hover":{color: '#FBFBFB'}}} size="small" onClick={() => {navigate("/patients/profile/" + cellValues.id)}}>View</Button>
                )
            }
        },
        {field: 'lastname', headerName: 'Last Name', width: 200, hideable: false},
        {field: 'firstname', headerName: 'First Name', width: 200, hideable: false},
        {field: 'cnp', headerName: 'CNP', width: 150, hideable: false},
        {field: 'date_of_birth', headerName: 'Date of Birth', type: 'date', width: 150, hideable: false},
        {field: 'age', headerName: 'Age', type: 'number', width: 90, hide: true},
        {field: 'city', headerName: 'City', width: 180, hide: true},
        {field: 'county', headerName: 'County', width: 180, hide: true}
    ]

    function CustomToolbar(){
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton sx={{color: '#439A97'}}/>
                <GridToolbarFilterButton sx={{color: '#439A97'}}/>
            </GridToolbarContainer>
        )
    }
    
  return (
    <>
    <NavBar/>
    <Grid container sx={{px: {xs: 2, md: 8}, display: 'block', py: 3}}>
        <Grid item py={3}>
            <Box display='flex' justifyContent='flex-end'>
                <button style={{border: 'none', fontSize: '18px', padding: '5px 30px', cursor: 'pointer', background: '#AAD8D3'}} onClick={() => {navigate("/patients/add")}}> + New Patient</button>
            </Box>
        </Grid>
        <Grid item>
            <div style={{height: 530, width: '100%'}}>
                {
                    <DataGrid 
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        rows={rows}
                        components={{Toolbar: CustomToolbar}}
                    />
                }
            </div>
        </Grid>
    </Grid>
    </>
  )
}

export default PatientList