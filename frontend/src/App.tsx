
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages'
import LoginPage from './pages/LoginPage'
import Layout from './layout'
import RegistorPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'

function App() {
 
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.withCredentials = true

  return (
    <UserContextProvider>
      <Routes>

        <Route path='/' element={<Layout/>}>
        <Route path='/profile' element= {<ProfilePage />}/>
          <Route index element={<Index/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegistorPage />}/>
          <Route path='/profile/places' element={<PlacesPage />}/>
          <Route path='/profile/:?subpage' element={<ProfilePage/>}/>
          <Route path='/profile/:subpage/:action' element={<ProfilePage/>}/>

          

        </Route>




      </Routes>
    </UserContextProvider>
    
  )
}

export default App
