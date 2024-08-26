import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const RegistorPage = () => {
  const [name, setname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        await axios.post('http://localhost:8080/api/user/register', {
            name,
            email,
            password
        });
        alert('Registration succesful, Redirecting to login page')
        navigate('/login')
    }catch(err){
        console.log(err)
        alert("What are you trying to do nigga")
    }
  }


  return (
    <div className='mt-16 flex justify-center items-center'>
        <div className="mb-64">
          <h1 className="text-4xl text-black font-semibold text-center mb-5">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            placeholder="your name" 
            />
            <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="your@email.com" 
            />
            <input 
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password" 
            />
            <button className="primary">Register</button>
          </form>
        </div>

    </div>
  )
}

export default RegistorPage