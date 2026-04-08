import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/auth' // Assuming you have an auth service file
import { login as authLogin } from '../Store/authSlice'
import { useSelector } from 'react-redux' 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authStatus = useSelector((state) => state.auth.status); 

  useEffect(() => {
    if (authStatus) navigate("/");
  }, [authStatus, navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");    
      }
    } catch (error) {
      if(error.message.includes("active")){
        const userData = await authService.getCurrentUser();
         dispatch(authLogin({ userData }));
        navigate("/"); // Redirect to home if already logged in
      }else{
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-white h-full justify-content flex flex-col items-center pt-10 border border-red-300">
          <Link to="/">
        <h1 className="text-3xl font-bold mb-6">amazone<span className="text-yellow-500">.in</span></h1>
      </Link>
         <div className="mt-2 flex flex-col items-center w-[350px]">
        <div className="w-full flex items-center mb-10">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">New to Amazone?</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button 
          onClick={() => navigate('/signup')}
          className="w-full border border-gray-300 py-1 rounded-sm bg-yellow-300 hover:bg-yellow-400 text-sm shadow-sm"
        >
          Create your Amazone account
        </button>
      </div>
    

      <div className="border border-gray-300 p-8 rounded-md w-[350px] flex flex-col">
        <h2 className="text-2xl font-medium mb-4">Sign-In</h2>
        
        {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

        <form onSubmit={login}>
          <h5 className="text-sm font-bold mb-1">E-mail</h5>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-sm mb-4 focus:ring-1 focus:ring-yellow-500 outline-none" 
          />

          <h5 className="text-sm font-bold mb-1">Password</h5>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-400 p-2 rounded-sm mb-4 focus:ring-1 focus:ring-yellow-500 outline-none" 
          />

          <button type="submit" className="w-full bg-yellow-400 py-2 rounded-sm border border-yellow-600 hover:bg-yellow-500 font-semibold shadow-sm">
            Sign In
          </button>
        </form>

        <p className="text-xs mt-4 text-gray-600">
          By continuing, you agree to Amazone's Conditions of Use and Privacy Notice.
        </p>
      </div>

     
    </div>
  )
}

export default Login