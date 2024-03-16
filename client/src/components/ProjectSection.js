import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { apiUrl } from '../utils/apiUtils';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

export const ProjectSection = ({projectChangeDetect, setProjectChangeDetect}) => {

    const [projects, setProjects] = useState([]);

    const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
    const [deletedProjectId, setDeletedProjectId] = useState(null);


    const {token} = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(()=>{

        console.log("project change detected");

        const getProjectDetails = async () =>{
            try{
                const res = await axios.post(`${apiUrl}/project/getProjects`, {token});
                console.log("✅getProjectDetails", res?.data?.projects);

                const totalProjs = res?.data?.projects ;

                setProjects(totalProjs.reverse());

                toast.success("Project section updated !")
                
            }
            catch(error){
                console.log("error=>", error);
                //toast.error("failed to fetch projects")
            }
        }

        getProjectDetails();

    }, [projectChangeDetect, token]);

    const myFunction = async (name,id) => {
        const confirmation = window.confirm(`❌ Do you want to delete "${name}" ?`);
        if (confirmation) {
          console.log("You pressed OK!");
          const res = await axios.post(`${apiUrl}/project/deleteProject`, {id});
          console.log("deleted proj res=>", res);
          toast.success("Project deleted successful");
          
          window.location.reload();
        } else {
          console.log("You pressed Cancel!");
          toast.error("project not deleted");
        }
    }

  return (
    <div className='w-full pt-1 bg-[#080808]'>
        {
            projects.length > 0 ?  (
                <>
                {
                    projects.map((proj)=>{
                        return(
                            <div className='flex items-center justify-center bg-[#080808] hover:border-[#146ef5] border-[#2b2b2b] p-3 border border-b-[1px]'>
                                <p
                                className='lexend cursor-pointer hover:text-[#AAFF00]  w-[100%]  px-5  font-semibold text-white  '
                                onClick={()=>{navigate(`/workspace/${proj?._id}`)}} id={proj?._id}>{proj?.name}</p>
                                <div onClick={()=>{
                                    setIsDeleteBtnClicked((prev)=> !prev);
                                    console.log("deleted proj id", proj?._id);
                                    setDeletedProjectId(proj?._id);
                                    
                                    
                                    myFunction(proj?.name, proj?._id);
                                } }   className='text-red-500 cursor-pointer hover:bg-red-100 flex items-center justify-center p-2 rounded-full	 border-[1px] '>
                                    <MdDelete />
                                </div>
                            </div>
                            
                        )
                    })
                }
                </>
            ) : (
                
                <div className='text-yellow-400'>
                    No project found
                </div>
            )
        }
    </div>
  )
}
