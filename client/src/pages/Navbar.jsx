import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export const Navbar = () => {

  const navigate = useNavigate();

  const {setIsLoggedIn,setUserData,token,setToken} = useContext(AppContext);

  const { isLoggedIn, userData } = useContext(AppContext);
  console.log("isLoggedIn", isLoggedIn);

  function logoutHandler(){
    try{
      setIsLoggedIn(false);
      setToken(null);
      setUserData(null);
      localStorage.removeItem("userData");
      localStorage.removeItem("token");

      toast.success("Logout done");
      navigate("/") ;
    }
    catch(e){
      toast.error("Logout not successful");
    }
  }

  return (
    <div className="bg-black z-[1000] border-b text-white h-[50px] w-[100%] flex items-center justify-between   px-5">

      <div onClick={()=>{navigate("/")}} className='hidden md:flex gap-x-1 font-[Akira] cursor-pointer hover:text-[#7FFFD4]'>
        <span className='text-[#AAFF00] font-green-200'>Cipher </span> <span className=''>Flow</span>
      </div>

      <div className='flex w-full justify-end gap-x-5'>
        {
          !isLoggedIn ? (
            <>
              <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-1 px-3 rounded' onClick={() => { navigate("/login") }}>
                LOGIN
              </div>
              <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-1 px-3 rounded' onClick={() => { navigate("/signup") }}>
                SIGNUP
              </div>
            </>
          ) : (
            <div className='flex items-center w-full justify-evenly md:justify-end  gap-x-3'>
              <div onClick={()=>{navigate("/projects")}} className='font-[Akira] cursor-pointer hover:text-[#AAFF00] mb-[-2px] text-white'>
                Projects |
              </div>
              <p className='' >{userData?.name}</p>
              <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white py-1 px-3 rounded' onClick={logoutHandler}>
                LOGOUT
              </div>
            </div>
          )
            }
      </div>
    </div>
  )
}
