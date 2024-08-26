import { Link } from "react-router-dom"


const Header = () => {
  return (
    <header className='flex justify-between '>
    <Link to={'/'}>
               <a href="" className='flex items-center gap-1'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
     <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
   </svg>
                <span className="font-bold text-xl">Airbnb</span>

               </a>
    </Link>
    <div className="flex gap-4 border-gray-400 rounded-full py-2 px-3 shadow-md shadow-gray-400">
               <div>Anywhere</div>
               <div className="border-l border-gray-300"></div>
               <div>Any week</div>
               <div className="border-l border-gray-300"></div>
               <div>Add guests</div>
               <button className="bg-pink-600 text-white p-1 rounded-full">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
     </svg>
   </button>

   </div>
   <div className="flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4 hover:shadow-md shadow-gray-400
    ease-in-out delay-300">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>


       
   </div>       
   

       
       
   </header>
  )
}

export default Header