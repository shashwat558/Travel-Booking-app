import { useState } from "react"


const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  return (
    <div className='mt-16 flex justify-center items-center'>
        <div className="mb-64">
          <h1 className="text-4xl text-black font-semibold text-center mb-5">Login</h1>
          <form className="max-w-md mx-auto">
            <input 
            type="email"
            placeholder="your@email.com" 
            />
            <input 
            type="password"
            placeholder="password" 
            />
            <button className="primary">Login</button>
          </form>
        </div>

    </div>
  )
}

export default LoginPage