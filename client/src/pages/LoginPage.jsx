import React, { useContext, useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../fireBaseSetup/firebase';
import axios from 'axios';
import { apiUrl } from '../utils/apiUtils';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

  const {isLoggedIn,setIsLoggedIn,userData,setUserData,token,setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const [flag,setFlag] = useState(0);

    const loginHandler = async () => {
        
        console.log("clicked on loginBtn");

        var toastId = toast.loading("trying to do login");

        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((result) => {
        //console.log("==>", result);
        const { displayName, email, photoURL } = result.user;
        setUserData({ name:displayName, email, photo : photoURL });
        setIsLoggedIn(true);
        setFlag(1);
        
        


      }).catch((error) => {
        console.log({ error });
        toast.error("login failed");
      });

      toast.dismiss(toastId);

    }

    useEffect(()=>{
        async function loginUser(){
            if(userData){
                try{
                  const res = await axios.post(`${apiUrl}/user/login`,userData);
                  console.log("res", res);
                  toast.success("login successful");

                  setIsLoggedIn(true);
                  setToken(res?.data?.cookies?.token);
                  setUserData(res?.data?.foundedUser);

                  // localstorageSetterFunction
                  localStorage.setItem("userData", JSON.stringify(res?.data?.foundedUser));
                  localStorage.setItem("token", JSON.stringify(res?.data?.cookies?.token));
                  navigate("/projects");
                }
                catch(error){
                  console.log("error=>", error);
                  toast.error(`${error?.response?.data?.message}`);
                }
            }
        }
        loginUser();
    }, [flag]);

    console.log("userdata=>",userData);


  return (
    <div className='flex items-center gap-y-5  bg-black justify-center flex-col h-[calc(100vh-50px)]'>

      <div className='text-white font-[Akira] font-bold text-xl bg-black'>
        Login Using Gmail
      </div>

      <div className="flex items-center justify-center bg-black  dark:bg-gray-800">
          <button onClick={loginHandler} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white   hover:shadow transition duration-150">
              <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
              <span>Login with Google</span>
          </button>
      </div>

    </div>
  )
}
