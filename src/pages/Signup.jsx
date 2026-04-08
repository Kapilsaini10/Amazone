import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth' 
import { login } from '../Store/authSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)   
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (authStatus) navigate("/");
    }, [authStatus, navigate]);


    const createAccount = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
         
        try {

            // 1. Create the account in Appwrite
            const userData = await authService.createAccount({ email, password, name })
            
            if (userData) {
                // 2. Automatically log them in after signup
                const currentUser = await authService.getCurrentUser()
                if (currentUser)dispatch(login({ userData: currentUser }))
                navigate("/")
            }

        } catch (error) {
           
            if(error.message.includes("active")){
                navigate("/"); // Redirect to home if already logged in
            }else{
            setError(error.message)}
        }finally{setLoading(false)}   
    }

    return (
        <div className="bg-white h-full flex flex-col items-center pb-10 py-20 pt-10">
            <Link to="/">
                <h1 className="text-3xl font-bold mb-6 italic">amazone<span className="text-yellow-500">.in</span></h1>
            </Link>

            <div className="border border-gray-300 p-8 rounded-md w-[350px] flex flex-col">
                <h2 className="text-2xl font-medium mb-4">Create Account</h2>
                
                {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

                <form onSubmit={createAccount}>
                    <h5 className="text-sm font-bold mb-1">Your name</h5>
                    <input 
                        type="text" 
                        placeholder="First and last name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded-sm mb-3 focus:ring-1 focus:ring-yellow-500 outline-none" 
                    />

                    <h5 className="text-sm font-bold mb-1">E-mail</h5>
                    <input 
                        type="email" 
                        value={email}
                        placeholder='Enter your E-Mail'
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded-sm mb-3 focus:ring-1 focus:ring-yellow-500 outline-none" 
                    />

                    <h5 className="text-sm font-bold mb-1">Password</h5>
                    <input 
                        type="password" 
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-400 p-2 rounded-sm mb-4 focus:ring-1 focus:ring-yellow-500 outline-none" 
                    />

                    <button type="submit" disabled={loading} className="w-full bg-yellow-400 py-2 rounded-sm border border-yellow-600 hover:bg-yellow-500 font-semibold shadow-sm text-sm">
                        {loading ? "Creating account..." : "Verify email"}
                    </button>
                </form>

                <p className="text-xs mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:text-orange-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup