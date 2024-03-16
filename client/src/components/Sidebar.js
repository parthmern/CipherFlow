import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { apiUrl } from '../utils/apiUtils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({setProjectChangeDetect}) => {

  const navigate = useNavigate();
  const {isLoggedIn, userData, token} = useContext(AppContext);

  const [name, setName] = useState(null);
  console.log("name", name);

  if(!isLoggedIn){
    return(
      <div>
        LOGIN FIRST
      </div>
    )
  }

  async function submitHandler(e){
    e.preventDefault();
    console.log("submit", name);

    try{

      const res = await axios.post(`${apiUrl}/project/createProject`, {name,token});
      console.log("createProject=>", res);
      setName("");
      setProjectChangeDetect((prev)=> !prev);
      toast.success("Project created sucessful");
    }
    catch(error){
      console.log("eroror", error);
      toast.error("failed to create project")
    }

    
    

  }

  return (
    <div className='w-[100px] md:w-[275px] flex flex-col items-center justify-between p-1 md:p-5 h-[calc(full-50px)] bg-[#121212] top-0 '>

        <div className='h-[calc(100vh-80px)]  flex flex-col items-center justify-between'>
          <div className='flex flex-col text-[12px] md:text-[25px] items-center bebas p-2 '>
            <p className='text-[#FFD100]'>{`${userData?.name} 's`}</p>
            <p className='text-white'> Projects</p>
            <div className='border w-full border-b'></div>
            <div onClick={()=>{navigate("/")}} className='mt-4 text-emerald-500 text-white '>
              Move to Home 
            </div>
          </div>

          <div className='md:p-5 p-1 text-[8px] md:text-[15px] flex md:gap-y-5 md:gap-5 border rounded-sm border-1 border-white'>
            <form className='flex flex-col gap-y-5' onSubmit={submitHandler}>
              <label className='font-[Akira]   text-[#F695C5]'>Add Project</label>
              <input className='bg-black text-white p-2 w-[90%] ' placeholder='Enter Name Of Project' value={name} onChange={(e)=>{setName(e.target.value)}} ></input>
              <button className='bg-blue-500 capitalize cursor-pointer hover:bg-blue-700 text-white py-1 px-3 rounded' type='submit' >
                  submit
              </button> 
            </form>
          </div>
        </div>



    </div>
  )
}
