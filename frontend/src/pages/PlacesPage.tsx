import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import AccountNav from './AccountNav'

const PlacesPage:React.FC = () => {
  const {action} = useParams();
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
            <h2 className='text-xl font-semibold mt-4'>Title</h2>
            <p className='text-gray-600'>TItle of your place should be short</p>
            <input type='text' placeholder='title' />
            <h2 className='font-semibold text-xl mt-4 '>Address</h2>
            <p className='text-gray-600'>Address to this place</p>
            <input type='text' placeholder='Address' />
            <h2 className='font-semibold text-xl mt-4'>Photos</h2>
            <p className='text-gray-500 text-sm'>more = better</p>
            <div className='flex gap-2'>
              <input type="text" placeholder={"Add using a link ...jpg"} />
              <button className='bg-gray-400 px-4 rounded-md'>Add&nbsp;Photos</button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            <button className='border border-gray-700 bg-transparent rounded-md text-2xl flex gap-1  p-8 shadow-sm '>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>Uplaod

            </button>
            </div>
            <h2 className='text-xl font-semibold mt-4'>Description</h2>
            <p className='text-gray-600'>Description that defines your place</p>
            <textarea />

            <h2 className='text-xl font-semibold mt-4'>Perks</h2>
            <p className='text-gray-600'>Select all the perks</p>
            <div>
              <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <label className='border p-4 flex items-center gap-2 rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>

                <span>Wifi</span>
                </label>
                <label className='border p-4 flex gap-2 items-center rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>

                <span>Free Parking spot</span>
                </label>
                <label className='border p-4 flex gap-2 items-center rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                <span>TV</span>
                </label>
                <label className='border p-4 flex gap-2 items-center rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>


                <span>Pets</span>
                </label>
                <label className='border p-4 flex gap-2 items-center rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>

                <span>Private Entrance</span>
                </label>
                <label className='border p-4 flex gap-2 items-center rounded-2xl'>
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>



                <span>Radio</span>
                </label>
                
              </div>
            </div>
            <h2 className='text-xl font-semibold mt-6'>Extra Info</h2>
            <p className='text-gray-600'>House rules, neighbourhood etc.</p>
            <textarea />
            
            <h2 className='text-xl font-semibold mt-6'>Check in&out times, max guests</h2>
            <p className='text-gray-600'>Add check-in and check-out time and remember to have some time window to clean the room between the guests</p>
            <div className='grid sm:grid-cols-3 gap-2'>
              <div>
                <h3 className='mt-2 -mb-1 ' >Check in time</h3>
                <input type="text" placeholder='14:00' />
              </div>
              <div>
                <h3 className='mt-2 -mb-1  '>Check out time</h3>
                <input type="text"/>
              </div>
              <div>
                <h3 className='mt-2 -mb-1  '>Max. number of guests</h3>
                <input type="text"/>
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