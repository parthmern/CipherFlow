import React, { useEffect, useRef, useState } from 'react';
import Header from '@editorjs/header';
import EditorJS from '@editorjs/editorjs';
// import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import { useSearchParams } from 'react-router-dom';


export const Editor = ({documentData,initialDocData, setDocumentData}) => {

  const ejInstance = useRef();

    const rawDocument = {
        "time" : 1550476186479,
        "blocks" : [
            {
                data : {
                    text : "Project Name", 
                    level : 2 ,
                },
                id : "123",
                type : 'header'
            },
            {
                data : {
                    level : 5 ,
                },
                id : "123",
                type : 'header'
            },

        ],
        "version" : "2.8.1"
    }

    const [document, setDocument] = useState();

    console.log("documentdata in editor", documentData);
    
    const initEditor = () =>{
      console.log("initialdone");

      if (ejInstance.current) {
        ejInstance.current.destroy();
      }
    

        var editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */

            
            onReady: () => {
              ejInstance.current = editor;
            },
            onChange: async () => {
              let content = await editor.saver.save();
  
              console.log(content);

              setDocumentData(content);
            },

            tools: {
                header: {
                    class: Header,
                    config: {
                      placeholder: 'Enter a header',
                      levels: [2, 3, 4],
                      defaultLevel: 3
                    }
                  },

                //   list: {
                //     class: List,
                //     inlineToolbar: true,
                //     config: {
                //       defaultStyle: 'ordered'
                //     }
                //   },

                  list: {
                    class: NestedList,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'ordered'
                    },
                  },
                  
              },

            holder: 'editorjs',
            theme: 'dark',
            data : initialDocData ? initialDocData : rawDocument
          });
          
    }

    useEffect(() => {
      initialDocData && initEditor();
    }, [initialDocData]);
  

  return (
    <div className=' '>
        <div className='w-full '  id='editorjs'>
        </div>
    </div>
  )
}
