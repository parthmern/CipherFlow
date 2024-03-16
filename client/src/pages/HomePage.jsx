import React from 'react'
import { useNavigate } from 'react-router-dom'
import codeImg from "../assest/images/Screenshot 2024-03-07 220435.png";
import codeImg2 from "../assest/images/Screenshot 2024-03-07 222926.png";
import codeImg3 from "../assest/images/Creating-different-types-of-flowcharts-with-drawio-1.png";
export const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className='text-black relative'>
      <div className='w-full  h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden'>
          <div className='flex flex-col z-[50] items-center justify-center'>
              <div className='font-[Akira] flex items-center justify-center text-[18px] md:text-[50px] text-white border-black subTextO'>
                Pseudocodes & Diagrams
              </div>
              <div className='font-[Akira] text-[15px] md:text-[40px] subText'>
                for engineering friends
              </div>
              <div className='text-[#74F0ED] text-[10px] md:text-[20px] font-[Akira]'>
                integrated with Open AI ✨
              </div>
          </div>
          <div onClick={()=>{navigate("/signup")}} className='mt-10 z-[50] select-none cursor-pointer'>
              <div className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' >
                <span  className='font-semibold'>Get Started</span> - it's free
              </div>
          </div>

          <img
          src={
            "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1920,quality=75/www/homepage/MobileHero.png"
          }
          alt=""
          width={800}
          height={500}
          className="w-[50%] absolute opacity-80  spin-slow z-[5] object-cover spin-slow"
          />

          <div className='absolute -rotate-6 z-[4]'>
              <img 
                  className=' relative border border-slate-300 left-[-280px] w-[50%]  top-[130px]'
                  src={codeImg}
              />

              
          </div>

          <div className='absolute rotate-6 z-[4]'>
            <img 
                    className=' relative border border-slate-300 right-[-650px] w-[60%]  top-[10px]'
                    src={codeImg2}
                />
          </div>

          <div className='absolute -rotate-6 z-[4]'>
            <img 
                    className=' relative border border-slate-300 right-[0px] w-[30%]  top-[-250px]'
                    src={codeImg3}
                />
          </div>
          
          
          

          


          
      </div>

      
      
    </div>
  )
}
