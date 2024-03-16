import { DrawIoEmbed, DrawIoEmbedRef } from 'react-drawio';
import { useEffect, useRef, useState } from 'react';

export function Canvas({initWhiteBoard, setWhiteBoard, triggerSave}) {
  const [exportedData, setExportedData] = useState(null);
  const canvasRef = useRef(null);

  // Function to handle export button click
  const handleExport = () => {
    // Check if the ref to the Canvas component exists
    if (canvasRef.current) {
      // Send export action with desired format (e.g., xmlsvg)
      canvasRef.current.exportDiagram({ format: 'xmlsvg' });
    }
    
  };

  console.log("exported data -=>", exportedData);
  //console.log("exported data -=>", exportedData);

  useEffect(()=>{
    if(triggerSave !== 0){
      handleExport();
    }
  }, [triggerSave]);


  // const [iframeContent, setIframeContent] = useState('');
   

  //   const handleIframeLoad = () => {
  //       console.log("onLoad detect");
  //       const iframeDocument = canvasRef.current.contentDocument || canvasRef.current.contentWindow.document;
  //       const iframeContent = iframeDocument.body.innerHTML;
  //       setIframeContent(iframeContent);
  //   };

  //   useEffect(()=>{

  //     handleExport();

  //   }, [iframeContent])

  //   useEffect(() => {
  //     const interval = setInterval(() => {
          
  //       handleExport();
  //     }, 10000); // 30 seconds

      
  //     return () => clearInterval(interval);
  // }, []);

  
 

  console.log("#############################333", initWhiteBoard);
  

  return (
    <div className='h-full z-[1000] '>
      {/* Export button */}
      {/* <button onClick={handleExport}>Export Diagram</button> */}

      {/* Canvas component */}
    
         
      <DrawIoEmbed 
      
        xml = {
          `${initWhiteBoard ? initWhiteBoard : ""}`
        }
        ref={canvasRef}
        
        // Event handler to receive exported data
        onExport={async (data) => {
          
          setExportedData(data.data);
          
          function convertBase64ToXML(base64Data) {
            const xmlData = atob(base64Data.split(',')[1]);
            return xmlData;
          }
        
        // The base64-encoded SVG data
        const base64Data = data.data ;
        
        // Convert base64 data to XML
        const xmlData = convertBase64ToXML(base64Data);
        
        // Parse the XML data
        const parser = new DOMParser();
        const xmlDoc = await parser.parseFromString(xmlData, "text/xml");
        
        // Now you can work with xmlDoc, which contains the parsed XML data
        console.log("xml=>",xmlDoc);
        //console.log(JSON.stringify(xmlDoc.location)); 
        const x = xmlDoc.querySelectorAll("svg");

        
        console.log("x=>",x[0].outerHTML);

        setWhiteBoard(x[0].outerHTML);

        //setExportedData(x[0].outerHTML);

        // console.log("converting to string");
        // // Assuming xmlData is the XML document object
        // const xmlSerializer = new XMLSerializer();
        // const xmlString = await xmlSerializer.serializeToString(xmlData);

        

        // console.log("xmlstring==>",xmlString);
        
        
      }} 


      />
        
      
      {/* Display exported data */}
      {exportedData && (
        <div>
          <h3>Exported Diagram</h3>
          {/* Display exported data (e.g., as an image or SVG) */}
          {/* For example, you can use an <img> tag for SVG data */}
          <img src={`${exportedData}`} alt="Exported Diagram" />
        </div>
      )}
    </div>
  );
}

