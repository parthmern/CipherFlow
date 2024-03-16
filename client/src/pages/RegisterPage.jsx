import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { auth } from '../fireBaseSetup/firebase';
import { apiUrl } from '../utils/apiUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {

    const [registerDetails, setRegisterDetails] = useState(null);
    const navigate = useNavigate();

    const signUpHandler = async () =>{

        console.log("click on signUpBtn");

        var toastId = toast.loading("signup loading ...");

        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
        .then((res)=>{
            //console.log("res==>", res);
            const { displayName, email, photoURL } = res.user;
            setRegisterDetails({ name : displayName, email, photo : photoURL });

        }).catch((error)=>{
            console.log({ error });
            toast.error("rregister failed");
        })
        toast.dismiss(toastId);

    }


    // 
    useEffect(()=>{

        async function registerUserFunc(){
            var toastId = toast.loading("signup loading ...")
            try{
                const res = await axios.post(`${apiUrl}/user/signup`,registerDetails);
                console.log("res", res);
                toast.success("signup successful you can do login now");
                navigate("/login");
                
            }
            catch(error){
                console.log("error=>>", error);
                toast.error(`${error?.response?.data?.message}`);
            }
            toast.dismiss(toastId);
        }

        if(registerDetails){
            registerUserFunc();
        }

    },[registerDetails]);

  return (
    <div className='flex items-center gap-y-5  bg-black justify-center flex-col h-[calc(100vh-50px)]'>

    <div className='font-[Akira] text-white font-bold text-xl'>
      SignUp Using Gmail
    </div>

    <div className="flex items-center justify-center  dark:bg-gray-800">
        <button onClick={signUpHandler} className="px-4 py-2 border flex gap-2 text-white rounded transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Signup with Google</span>
        </button>
    </div>

  </div>
  )
}


