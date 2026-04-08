import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Checkout from './pages/CheckOut.jsx'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Order'
import { login, logout } from './Store/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import authService from './Appwrite/auth' // Your Appwrite auth service
import Footer from './components/Footer.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if a session already exists in Appwrite
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          const cleanUserData = JSON.parse(JSON.stringify(userData));
          dispatch(login({userData: cleanUserData}));
        } else {
          dispatch(logout())
        }
      }).catch(() => {
        dispatch(logout())
      })
      .finally(() => setLoading(false));
  }, []);

  return (
  <>
 <div className="app">
      <Navbar />

        <Routes>  

   <Route path="/orders" element={<Orders />} />

  <Route path="/" element={<Home />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
</Routes>
      
      {/* This renders your current page */}
      <main>
        <Outlet /> 
      </main>

      <Footer /> {/* Add it here at the bottom */}
    </div>

  </>
  )
}

export default App
