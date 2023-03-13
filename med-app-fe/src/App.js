import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage.js'
import SignUp from './pages/SignUp/SignUp.js'
import SignIn from './pages/SignIn/SignIn.js'
import PatientList from './pages/Patient/PatientList/PatientList.js'
import NewPatientRegistration from './pages/Patient/NewPatientRegistration/NewPatientRegistration.js'
import PatientProfile from './pages/Patient/PatientProfile/PatientProfile.js'
import CreateMedicalRecord from './pages/MedicalRecord/CreateMedicalRecord/CreateMedicalRecord.js'
import ViewMedicalRecord from './pages/MedicalRecord/ViewMedicalRecord/ViewMedicalRecord.js'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<LandingPage/>}/>
              <Route exact path="/register" element={<SignUp/>}/>
              <Route exact path="/login" element={<SignIn/>}/>
              <Route exact path="/patients" element={<PatientList/>}/> 
              <Route exact path="/patients/add" element={<NewPatientRegistration/>}/> 
          </Routes>
      </BrowserRouter>
  )
}

export default App