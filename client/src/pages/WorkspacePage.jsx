import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '../components/Editor';
import axios from 'axios';
import { apiUrl } from '../utils/apiUtils';
import toast from 'react-hot-toast';
import { Canvas } from '../components/Canvas';
import chagptLogo from "../assest/images/ChatGPT-Icon-PNG.png";

export const WorkspacePage = () => {

    const {id} = useParams();
    console.log("id", id);

    const navigate = useNavigate();

    const [triggerSave, setTriggerSave] = useState(0);
  
    const [documentData, setDocumentData] = useState(null);
    const [initialDocData, setInitialDocData] = useState(null);

    const [flag, setFlag] = useState("document");


    const [whiteBoard, setWhiteBoard] = useState(null);
    const [initWhiteBoard, setInitWhiteBoard] = useState(null);

    // const myRef = useRef(null);

    async function saving(){

      console.log("documentData=>", documentData);

      const document = JSON.stringify(documentData);
      console.log("docuemtn", document);

      const toastId = toast.loading("Saving ...")
      try{
        console.log("trying");
        const res = await axios.post(`${apiUrl}/project/updateDocument` ,{id, document, whiteBoard});
        console.log("res=>", res);
        toast.success("saved !!");
      }catch(error){
        console.log("error in proj update");
        toast.error("not saved !!");
      }
      toast.dismiss(toastId);

    }

    async function getProjectDetails(){

      try{

        const res = await axios.post(`${apiUrl}/project/getProjectDetails`, {id});
        console.log("res of proj details=>", res?.data?.data);

        const doc = JSON.parse(res?.data?.data?.document);
        setInitialDocData(doc);

        if(res?.data?.data?.whiteBoard){
          setInitWhiteBoard(res?.data?.data?.whiteBoard)
        }

      }
      catch(error){
        console.log("erorr in get proj detils");
      }
    }

    //console.log("==>myRef.current", myRef.current);

    useEffect(()=>{
      getProjectDetails();
    },[])

    useEffect(()=>{
      
      saving(); 
      if(!(triggerSave == 0)){
        
      }
        
      
    }, [triggerSave, whiteBoard]);

    console.log("triggersave", triggerSave);


    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.ctrlKey && event.key === 's') {
              event.preventDefault(); // Prevent the default browser action (saving the page)
              saveFunction(); // Call your custom function here
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const saveFunction = () => {
      // Write your save function logic here
      console.log('Ctrl + S pressed! Your save function executed.');
      // For demonstration purposes, it logs a message to the console
      setTriggerSave((prev)=> !prev);
  };


  return (
    <div className='flex h-full relative '>

        <div className={`ml-5 h-screen ${flag == "canvas" && "hidden"} ${flag == "document" && "w-[100%]"} ${flag == "both" && "w-[30%]"}`} >
            <Editor initialDocData={initialDocData} documentData={documentData} setDocumentData={setDocumentData}   />
        </div>

        <div className='h-[calc(1450px-100vh)]  bg-red-600 w-[2px]'>
        </div>

        <div className={`p-1 canIframe h-screen ${flag == "document" && "hidden"} ${flag == "canvas" && "w-[80%]"} ${flag == "both" && "w-[70%]"}`}>
            <Canvas triggerSave={triggerSave} initWhiteBoard={initWhiteBoard} setWhiteBoard={setWhiteBoard} />
        </div>

        <div className='absolute cursor-pointer top-[0px] right-0 md:top-[-35px] md:left-[70%] px-2 py-[0.5px] rounded z-10 bg-yellow-500' onClick={()=>setTriggerSave((prev)=> prev+1)}>
          Save
        </div>

        <div className='absolute flex  items-center justify-center cursor-pointer rounded border left-[35%] top-[-38px] md:left-[42%] z-[1000] bg-white '>
          <div className={`${flag == "document" ? "bg-[#e8e8e8] rounded" : "bg-white"} text-black px-2 py-[0.5] border-r`} onClick={()=>{setFlag("document")}}>Document</div>
          <div className={`${flag == "both" ? "bg-[#e8e8e8]" : "bg-white rounded"} text-black px-2 py-[0.5] border-r hidden md:block`} onClick={()=>{setFlag("both")}}>Both</div>
          <div className={`${flag == "canvas" ? "bg-[#e8e8e8]" : "bg-white rounded"} text-black  py-[0.5] px-2`} onClick={()=>{setFlag("canvas")}}>Canvas</div>
        </div>

        <div
        onClick={()=>{navigate(`/code/${id}`)}}
        className=' fixed flex z-[1000] cursor-pointer items-center justify-center  top-[95vh] right-0  '>
          <button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
            <img className=" h-5 me-2 -ms-1" src={chagptLogo} />
            <p className='pl-2 font-body'>Generate code</p>
          </button>
        </div>

    </div>
  )
}
