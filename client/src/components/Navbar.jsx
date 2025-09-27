import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAppContext();

  // Logout handler
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  }

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
      />

      <div className='flex gap-4'>
        {!token && (
          <>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 rounded-full text-sm 
                         cursor-pointer bg-blue-600 hover:bg-blue-700 
                         text-white px-8 py-2.5 transition"
            >
              Login
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 rounded-full text-sm 
                         cursor-pointer bg-purple-600 hover:bg-purple-700 
                         text-white px-8 py-2.5 transition"
            >
              Signup
              <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>
          </>
        )}

        {token && (
          <>
            <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 rounded-full text-sm font-semibold
                cursor-pointer bg-primary hover:bg-[#1D4ED8]
               text-white px-10 py-2.5 shadow-md transition-all duration-200 ease-in-out"
              >
            Dashboard
            <img src={assets.arrow} className="w-3" alt="arrow" />
            </button>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full text-sm font-semibold
                cursor-pointer bg-[#EF4444] hover:bg-[#DC2626]
               text-white px-8 py-2.5 shadow-md transition-all duration-200 ease-in-out"
              >
            Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar;