import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiUrl } from '../utils/apiUtils';
import { CodeBlock, CopyBlock, a11yDark, a11yLight, codepen, monokaiSublime, nord, paraisoDark, rainbow, tomorrowNight, vs2015, xt256 } from "react-code-blocks";
import toast from 'react-hot-toast';
import { CodeSelector } from '../components/CodeSelector';

export const CodePage = () => {

    const {id} = useParams();

    const [code, setCode] = useState() ;
    const [language, setLanguage] = useState("c programming language");

    async function getCode(){
      var toastId = toast.loading("Trying to generate code ...");
      console.log("under get code");
      
      try{
        
        const res = await axios.post(`${apiUrl}/project/getCode`, {id, lang: language});
        console.log("res",res);
        let ans = res?.data?.response;

        if (ans.startsWith("```") && ans.endsWith("```")) {
          ans = ans.slice(3, -3); // Remove ``` from beginning and end
      }

        setCode(ans);
        toast.success("got the code");
      }
      catch(error){
        console.log("error=>", error);
        toast.error("Gpt error refresh page again");
      }
      toast.dismiss(toastId);
    }

   useEffect(()=>{
      var toastId2 = toast.loading("Trying to generate code ...");
      getCode();
      toast.dismiss(toastId2)
   }, [language]);

 


  return (
    <div className='bg-black h-full flex flex-col items-center pt-10'>

    <CodeSelector setLanguage={setLanguage} language={language} />

      <div className='w-[80%] mx-auto my-10 '>
        {
          (code&&language) ?
          (<CodeBlock  text={code} language={language} theme={a11yLight} />) : (
            <div className=' flex h-[80vh] items-center justify-center'>
              <span className="loader mx-auto "></span>
            </div>
          )
        }
      </div>
    </div>
  )
}
