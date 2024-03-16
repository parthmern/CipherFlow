import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProjectSection } from '../components/ProjectSection';


export const ProjectPage = () => {

  const [projectChangeDetect, setProjectChangeDetect] = useState(true);

  console.log("projectChangeDetect=>", projectChangeDetect);
  return (
    <div className='text-black overflow-x-hidden flex bg-[#080808]'>

        {/* sidebar */}
        <Sidebar setProjectChangeDetect={setProjectChangeDetect} />

        {/* project section */}
        <ProjectSection projectChangeDetect={projectChangeDetect} setProjectChangeDetect={setProjectChangeDetect} />
    </div>
  )
}
