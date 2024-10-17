
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import PlacesForm from './PlacesForm';
// import AccountNav from './AccountNav'




const PlacesPage:React.FC = () => {
  const {action} = useParams();

  

  const getPlaces = async () => {
    const places = await axios.get('/user/places');
    console.log(places)
  }
 

  


  return (
    <div>
      {action !== "new" && (
       
        <div className='mt-4 text-center'>
        <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/profile/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
  
        <span onClick={() =>getPlaces()}>Add new places</span>
        </Link>
        </div>

      )}
      {action === "new" && (
        <PlacesForm />
        

      )}
      
      
      
    </div>
  )
}

export default PlacesPage