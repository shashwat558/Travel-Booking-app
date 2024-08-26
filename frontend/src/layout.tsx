
import { Outlet } from 'react-router-dom'
import Index from './pages'




const Layout = () => {
  return (
    <div>
        <Index />
        <Outlet />
        
    </div>
  )
}

export default Layout