import { Select, Option } from "@material-tailwind/react";

import React from 'react'

export const CodeSelector = ({language, setLanguage}) => {

    console.log("langauage=>", language);

  return (
    <div className="w-72">
      <Select value={language} onChange={(val)=>{setLanguage(val)}} className="text-white" label="Select Version">
        <Option value="c programming language">C language</Option>
        <Option value="java programming language">Java</Option>
        <Option value="javascript programming language">JavaScript</Option>
        <Option value="cpp programming language">cpp</Option>
        <Option value="python programming language">Python</Option>
      </Select>
    </div>
  )
}
