import axios from "axios";
import React, { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext, UserContextType, User } from "../UserContext"


const LoginPage = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const { setUser } = context as UserContextType;
  

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const {data} = await axios.post<User>('http://localhost:8080/api/user/login', {email, password})
      setUser(data)
      
      alert("Login successful")
      setRedirect(true)
    }catch(err){
      console.error(err)
      alert("Login failed")
    }
    
  }

  if (redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='mt-16 flex justify-center items-center'>
        <div className="mb-64">
          <h1 className="text-4xl text-black font-semibold text-center mb-5">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <input 
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="your@email.com" 
            />
            <input 
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            value={password}
            placeholder="password" 
            />
            <button className="primary">Login</button>
          </form>
        </div>

    </div>
  )
}

export default LoginPage