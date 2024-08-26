
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages'
import LoginPage from './pages/LoginPage'
import Layout from './layout'
import RegistorPage from './pages/RegisterPage'
import axios from 'axios'

function App() {
 
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.withCredentials = true

  return (
    <Routes>

      <Route path='/' element={<Layout/>}>
        
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegistorPage />}/>

      </Route>
      

     

    </Routes>
  )
}

export default App
