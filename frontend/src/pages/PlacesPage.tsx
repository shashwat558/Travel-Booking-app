/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perk from '../components/Perk';
import axios from 'axios';
// import AccountNav from './AccountNav'

interface uploadData {
  filename: string
}

const PlacesPage:React.FC = () => {
  const {action} = useParams();
  const [title, settitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addPhotos, setAddPhotos] = useState<string[]>([]);
  const [photoLink, setPhotoLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [maxGuest, setMaxGuest] = useState<number>(1);


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

  const addPhotoByLink = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      const {data:filename} = await axios.post<uploadData>('http://localhost:8080/api/user/uploadByLink', { link: photoLink });
      //@ts-expect-error
      setAddPhotos((prev) => {
        return [...prev, filename]
      })
      setPhotoLink("")

      
      // Handle success (e.g., show a success message or clear the input)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(error);
    }
  };

  const uploadPhoto = async (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    //@ts-ignore 
    for(let i=0; i< files.length; i++){
      //@ts-ignore
      data.append('photos', files[i])

    }
    
    
    try{
      await axios.post('http://localhost:8080/api/user/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const {data:filenames}= response
        setAddPhotos((prev) => {
        

          return [...prev, ...filenames as string]
        })
        setPhotoLink("")
      })
    }

    catch(err){
      console.log(err)
    }}


  return (
    <div>
      {action !== "new" && (
       
        <div className='text-center'>
        <Link className=' inline-flex bg-primary text-white py-2 px-4 rounded-full' to={'/profile/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
  
        <span>Add new places</span>
        </Link>
        </div>

      )}
      {action === "new" && (
        <div className='text-left'>
          <form>
          {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input type='text' placeholder='title' value={title}  onChange={(e:  React.ChangeEvent<HTMLInputElement>) => settitle(e.target.value)}/>
            {preInput('Address', 'Address to this place')}
            <input type='text' placeholder='Address' value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}/>
            {preInput('Photos', 'more = better')}
            <div className='flex gap-2'>
              <input type="text" placeholder={"Add using a link ...jpg"} value={photoLink} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhotoLink(e.target.value)}/>
              <button className='bg-gray-400 px-4 rounded-md' onClick={addPhotoByLink}>Add&nbsp;Photos</button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {addPhotos.length > 0 && addPhotos.map((link) => (
                <div className='mr-2'><img  className ="rounded-2xl" src={"http://localhost:8080/uploads/"+link} /></div>
              ))}
            <label className='border border-gray-700 bg-transparent rounded-md text-2xl flex gap-1  p-8 shadow-sm cursor-pointer'>
            <input type="file" className='hidden' onChange={uploadPhoto}/>

               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>Uplaod

            </label>
            </div>
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

      )}
      
      
      
    </div>
  )
}

export default PlacesPage