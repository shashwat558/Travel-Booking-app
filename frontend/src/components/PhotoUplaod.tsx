/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { ChangeEvent, FC, MouseEvent, useState } from "react";

interface uploadDataLink {
    filename: string
    
  }
  type UploadData =string[]

  interface PhotoUplaodProps {
    addedPhotos: string[]
    onChange: (addedPhotos: string[]) => void
  }
  

const PhotoUplaod:FC<PhotoUplaodProps> = ({addedPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState<string>("") 




    const addPhotoByLink = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
          const {data:filename} = await axios.post<uploadDataLink>('http://localhost:8080/api/user/uploadByLink', { link: photoLink },);
         
          //@ts-expect-error
          onChange((prev) => {
            return [...prev, filename]}); // Pass the updated array directly
            setPhotoLink("");
    
          
          
        } catch (error) {
          
          console.error(error + "FD;FDJ");
        }
      };
    
      const uploadPhoto = async (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) {
          console.log("No data selected")
          return;
        }
        const data = new FormData();
        console.log(data)
         
        for(let i=0; i< files.length; i++){
         
          data.append('photos', files[i])
    
        }
        console.log(data)
        
        
        
          await axios.post<UploadData>('http://localhost:8080/api/user/upload', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            const {data:filenames}= response
         
          //@ts-expect-error
            onChange((prev) => {
              return  [...prev, ...filenames]
            }); // Pass the updated array directly
    setPhotoLink("");
            
          })
        
    
      }
  return (
    <div>
        <div className='flex gap-2'>
    <input type="text" placeholder={"Add using a link ...jpg"} value={photoLink} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhotoLink(e.target.value)}/>
    <button className='bg-gray-400 px-4 rounded-md' onClick={addPhotoByLink}>Add&nbsp;Photos</button>
  </div>
  <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
    {addedPhotos.length > 0 && addedPhotos.map((link) => (
      <div className='mr-2'><img  className ="rounded-2xl" src={"http://localhost:8080/uploads/"+link} /></div>
    ))}
  <label className='border border-gray-700 bg-transparent rounded-md text-2xl flex gap-1  p-8 shadow-sm cursor-pointer'>
  <input type="file" className='hidden' multiple onChange={uploadPhoto}/>

     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>Uplaod

  </label>
  </div>
    </div>
  )
}

export default PhotoUplaod;