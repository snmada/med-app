import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage.js'
import SignUp from './pages/SignUp/SignUp.js'
import SignIn from './pages/SignIn/SignIn.js'
import PatientList from './pages/Patient/PatientList/PatientList.js'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<LandingPage/>}/>
              <Route exact path="/register" element={<SignUp/>}/>
              <Route exact path="/login" element={<SignIn/>}/>
              <Route exact path="/patients" element={<PatientList/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App