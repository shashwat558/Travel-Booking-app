
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import PlacesForm from './PlacesForm';
import axios from 'axios';
import PlacesCard from '../components/PlacesCard';
// import AccountNav from './AccountNav'

interface PlaceDataProps {
  id: string;
  owner: string;
  title: string;
  address: string;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuest: 5

}


const PlacesPage:React.FC = () => {
  const {action} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlaceDataProps[]>([]);


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true)
        const response = await axios.get<PlaceDataProps[]>("/user/places", {withCredentials: true});
        const data = response.data;
        console.log(data)
        setPlaces(data);
        setLoading(false)


      } catch (error) {
        console.log(error)
        
      }
    }
    fetchPlaces()
  },[])
  if(loading) return <div>Loading...</div>;

 

  


  return (
    <div>
      {action !== "new" && (
       
        <div>
          <div className='mt-4 text-center'>
        <Link className='shadow-md hover:bg-pink-700 ease-in-out inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/profile/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
  
        <span className='sticky'>Add new places</span>
        </Link>
        </div>
        <div className='flex flex-col gap-3 mt-4'>
          {places.map((place) => (
            <PlacesCard key={place.id} title={place.title} description={place.description} owner={place.owner} maxGuest={place.maxGuest} perks={place.perks} photo={place.photos}/>
          ))}
        </div>
        </div>
        
        

      )}
      {action === "new" && (
        <PlacesForm />
        

      )}
      
      
      
    </div>
  )
}

export default PlacesPage