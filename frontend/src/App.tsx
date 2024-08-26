
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages'
import LoginPage from './pages/LoginPage'
import Layout from './layout'

function App() {
 

  return (
    <Routes>

      <Route path='/' element={<Layout/>}>
        <Route index element={<Index/>}/>
        <Route path="/login" element={<LoginPage />}/>
      </Route>
      

     

    </Routes>
  )
}

export default App
