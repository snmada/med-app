import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage.js'
import SignUp from './pages/SignUp/SignUp.js'
import SignIn from './pages/SignIn/SignIn.js'
import PatientList from './pages/Patient/PatientList/PatientList.js'
import NewPatientRegistration from './pages/Patient/NewPatientRegistration/NewPatientRegistration.js'
import PatientProfile from './pages/Patient/PatientProfile/PatientProfile.js'
import CreateMedicalRecord from './pages/MedicalRecord/CreateMedicalRecord/CreateMedicalRecord.js'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<LandingPage/>}/>
              <Route exact path="/register" element={<SignUp/>}/>
              <Route exact path="/login" element={<SignIn/>}/>
              <Route exact path="/patients" element={<PatientList/>}/>
              <Route exact path="/patients/add" element={<NewPatientRegistration/>}/> 
              <Route exact path="/patients/profile" element={<PatientProfile/>}/>
              <Route exact path="/patients/new-medical-record" element={<CreateMedicalRecord/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App