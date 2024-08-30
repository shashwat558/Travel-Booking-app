import React from 'react'
import { Link } from 'react-router-dom'

const PlacesPage:React.FC = () => {
  return (
    <div>
      <div className='text-center'>
      <Link className='bg-primary text-white py-2 px-4 rounded-full' to={'/profile/places/new'}>Add new places</Link>
      </div>
      
    </div>
  )
}

export default PlacesPage