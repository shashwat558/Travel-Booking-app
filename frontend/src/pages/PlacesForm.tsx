import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'

import PhotoUplaod from '../components/PhotoUplaod';
import Perk from '../components/Perk';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccountNav from './AccountNav';
import { PlaceDataProps } from './PlacesPage';

const PlacesForm = () => {
  const {id} = useParams();
  
  const [title, settitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [maxGuest, setMaxGuest] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    if(!id){
      return;
    }
    const getPlaces = async () => {
     const response =  await axios.get<PlaceDataProps>("/user/places/"+id);
     const data = response.data;
     settitle(data.title);
     setAddress(data.address);
     setAddedPhotos(data.photos);
     setPerks(data.perks);
     setExtraInfo(data.extraInfo);
     setDescription(data.description);
    //  setCheckIn(data.checkIn);
    //  setCheckOut(data.checkOut);
    setMaxGuest(data.maxGuest);
    } 
    getPlaces();


    
   
    
  },[id])


  function inputHeader(text:string): ReactElement{

    return (
      <h2 className='text-xl font-semibold mt-4'>{text}</h2>

    )

  }
  function inputDescription(text:string): JSX.Element{

    return (
      <p className='text-gray-600'>{text}</p>
      

    )

  }
  function preInput(header:string,description:string){
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  

  const addNewPlace  = async (e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      title, address, description, perks, addedPhotos, extraInfo, maxGuest, checkIn, checkOut
    }
    await axios.post('/user/places', data)
    navigate("/profile/places")
    

  }
  return (
    <div className='text-left'>
      <AccountNav />
          <form onSubmit={addNewPlace}>
          {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input type='text' placeholder='title' value={title}  onChange={(e:  React.ChangeEvent<HTMLInputElement>) => settitle(e.target.value)}/>
            {preInput('Address', 'Address to this place')}
            <input type='text' placeholder='Address' value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}/>
            {preInput('Photos', 'more = better')}


            <PhotoUplaod addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            
            {preInput('Description','description that defines your place')}
            <textarea  value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>

            {preInput('Perks','select all the perks of your place')}
            
              <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                
                <Perk selected={perks} onChange={setPerks}/>
                
                
              </div>
            
            <h2 className='text-xl font-semibold mt-6'>Extra Info</h2>
            <p className='text-gray-600'>House rules, neighbourhood etc.</p>
            <textarea value={extraInfo} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExtraInfo(e.target.value)} />
            
            <h2 className='text-xl font-semibold mt-6'>Check in&out times, max guests</h2>
            <p className='text-gray-600'>Add check-in and check-out time and remember to have some time window to clean the room between the guests</p>
            <div className='grid sm:grid-cols-3 gap-2'>
              <div>
                <h3 className='mt-2 -mb-1 ' >Check in time</h3>
                <input type="text" value={checkIn} placeholder='14:00' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckIn(e.target.value)} />
              </div>
              <div>
                <h3 className='mt-2 -mb-1  '>Check out time</h3>
                <input type="text" value={checkOut} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckOut(e.target.value)}/>
              </div>
              <div>
                <h3 className='mt-2 -mb-1  '>Max. number of guests</h3>
                <input type="number" value={maxGuest} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxGuest(Number(e.target.value))}/>
              </div>
            </div>
            <button className="primary my-4">Save</button>

           

          </form>
        </div>
  )
}

export default PlacesForm