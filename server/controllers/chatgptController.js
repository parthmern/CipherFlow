


const project = require("../models/projectModel");
const runPrompt = require("../utils/azureOpenai");

require('dotenv').config()
var API_KEY = process.env.API_KEY;

const chatgptControllerGpt = async (req, res) =>{
    try{

        const {id, lang} = req.body ;

        console.log("Fetching project details for ID: =>", id);

        // Find the project by ID
        const projectDetails = await project.findById(id);

        // Check if the project exists
        if (!projectDetails) {
            console.log("❌ Project not found for ID:", id);
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        console.log("✅ Project details found:", projectDetails);
        
        const document = projectDetails.document ;

        if(!document){
            return(
                res.status(404).json(
                    {
                        success : false ,
                        message :"Document not found" ,
                    }
                )
            )
        }

        //console.log("document", document);

        var que = `${document} 
        convert this to txt format and make sure that you return only txt format not other and extra single word`;

        var options = {

            method : 'POST',
            
            headers : {
                'Authorization': `Bearer ${API_KEY}` ,
                'Content-Type': 'application/json'
            },
            
            body : JSON.stringify({
                model : 'gpt-3.5-turbo',
                messages : [{role: "user", content: que}],
                max_tokens : 200 
            }) 
        }

        try{
            const response = await fetch('https://api.openai.com/v1/chat/completions',options);
            const data = await response.json() ;
            console.log(data);
    
            if(data.choices[0].message.content){
                var ans = data.choices[0].message.content ;
            }
            

    
            console.log("ans of gpt===>",ans);

            const que2 = `${ans} this is pseudocode so convert this to ${lang} language and make sure that it return only ${lang} code nothing extra not single word extra 
        
            -> rules to generate the code
            1)output with no introduction, no explaintation, only code
    
            2)DONT MAKE ANY MISTAKES, check if you did any
    
            3)make sure only return ${lang} code, and nothing else.
    
            4)make sure no DOCUMENATION IN THE OUTPUT
    
            5)make sure to return only code of block
    
            6)make sure to do not add pseudocode in code block
    
            7)make sure to donot add note from your side
    
            8) make sure to donot add extra lines or words or comments in code
    
            - make sure to follow above 8 rules while generating code block
    
            - make sure to follow all above rules all time
            
            ` ; 

            
            
            const res2 = await fetch('https://api.openai.com/v1/chat/completions', 
                {

                    method : 'POST',
                    
                    headers : {
                        'Authorization': `Bearer ${API_KEY}` ,
                        'Content-Type': 'application/json'
                    },
                    
                    body : JSON.stringify({
                        model : 'gpt-3.5-turbo',
                        messages : [{role: "user", content: que2}],
                        max_tokens : 200 
                    }) 
                }
            );
            const data2 = await res2.json() ;
            console.log("data2", data2);

            if(data2?.choices[0].message.content) {
                var ans2 = data2?.choices[0].message.content ;
            }
            console.log("ans of gpt===>",ans2);

            return(
                res.status(200).json(
                    {
                        ans : ans2 ,
                        success : true ,
                        message : "chatgpt is giving sol successfully",
                    }
                )
            )

            
        }
        catch(error){
            console.log("error in chatgpt api =>", error);
            return(
                res.status(300).json(
                    {
                        success : false, 
                        message : "gpt fatt gaya", 
                        error ,
                    }
                )
            )

        }

    }
    catch(error){
        console.log("🚫 chatgpt controller failed=>", error);

        if(error?.response?.status == 504){
            return res.status(504).json({
                success: false,
                message: "Vercel out of credit with time",
                error: error,
            });
        }

        return res.status(500).json({
            success: false,
            message: "chatgpt controller failed",
            error: error,
        });
    }
}

const chatgptController =async(req, res) =>{
    try{

        const {id, lang} = req.body ;
        console.log("lang=>", lang);

        console.log("Fetching project details for ID:", id);

        // Find the project by ID
        const projectDetails = await project.findById(id);

        // Check if the project exists
        if (!projectDetails) {
            console.log("❌ Project not found for ID:", id);
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        console.log("✅ Project details found:", projectDetails);
        
        const document = projectDetails.document ;

        if(!document){
            return(
                res.status(404).json(
                    {
                        success : false ,
                        message :"Document not found" ,
                    }
                )
            )
        }

        //console.log("document", document);

        var que = `${document} 
        convert this to txt format and make sure that you return only txt format not other and extra single word`;
        
        var ans =  await runPrompt(que, "",200, 0.5) ;
        console.log("ans=>", ans);

        // try{

        //     const que2 = `${ans} this is pseudocode so convert this to ${lang} language and make sure that it return only ${lang} code nothing extra not single word extra 
            
        //     -> rules to generate the code
        //     1)output with no introduction, no explaintation, only code

        //     2)DONT MAKE ANY MISTAKES, check if you did any

        //     3)make sure only return ${lang} code, and nothing else.

        //     4)make sure no DOCUMENATION IN THE OUTPUT

        //     5)make sure to return only code of block

        //     6)make sure to do not add pseudocode in code block

        //     7)make sure to donot add note from your side

        //     8) make sure to donot add extra lines or words or comments in code
 
        //     - make sure to follow above 8 rules while generating code block

        //     - make sure to follow all above rules all time
            
        //     ` ; 

        //     const response =  await runPrompt(que2, "",400, 0.5) ;
        //     console.log("res=>", response) ;
        //     if(response.code == '429'){
        //         throw error ;
        //     }
        //     if (response.toLowerCase().includes("apologize")) {
        //         throw new Error("String contains the word 'apologize'."); // Throw an error if 'apologize' is found
        //     } 
        //     else if(response.toLowerCase().includes("sorry")){
        //         throw new Error("String contains the word 'SORRY'."); 
        //     }
        //     else {
        //         console.log("String does not contain the word 'apologize/sorry'.");
        //     }
        //     return(
        //         res.status(200).json(
        //             {
        //                 success : true ,
        //                 message : "code generated successfully",
        //                 response
        //             }
        //         )
        //     )

        // }
        // catch(error){
            
        //     console.log("error in chatgpt api =>", error);
        //     return(
        //         res.status(400).json(
        //             {
        //                 success : false, 
        //                 message : "gpt error while generating the code", 
        //                 error ,
        //             }
        //         )
        //     )
            
        // }

        
            return(
                res.status(200).json(
                    {
                        success : true,
                        message : "✅ ans got successful",
                        ans,
                    }
                )
            )
        


        

        

    }
    catch(error){
        console.log("🚫 chatgpt controller failed=>", error);

        return res.status(500).json({
            success: false,
            message: "chatgpt controller failed",
            error: error,
        });
    }
}

const chatGptCodeController = async (req, res) =>{

    let {ans,lang} = req.body ;

    lang = "c programming";

    ans = `code for carwashing
    1. start
    2. call the user to enter car number
    3. check car is available in list
    4. if (car is available)
       - move car to the car wash
       - clean car
       - take payment from user
    5. else
       - call customer service
    6. End`;

    try{

        const que2 = `${ans} this is pseudocode so convert this to ${lang} language and make sure that it return only ${lang} code nothing extra not single word extra 
        
        -> rules to generate the code
        1)output with no introduction, no explaintation, only code

        2)DONT MAKE ANY MISTAKES, check if you did any

        3)make sure only return ${lang} code, and nothing else.

        4)make sure no DOCUMENATION IN THE OUTPUT

        5)make sure to return only code of block

        6)make sure to do not add pseudocode in code block

        7)make sure to donot add note from your side

        8) make sure to donot add extra lines or words or comments in code

        - make sure to follow above 8 rules while generating code block

        - make sure to follow all above rules all time
        
        ` ; 

        const response =  await runPrompt(que2, "",400, 0.5) ;
        console.log("res=>", response) ;
        if(response.code == '429'){
            throw error ;
        }
        if (response.toLowerCase().includes("apologize")) {
            throw new Error("String contains the word 'apologize'."); // Throw an error if 'apologize' is found
        } 
        else if(response.toLowerCase().includes("sorry")){
            throw new Error("String contains the word 'SORRY'."); 
        }
        else {
            console.log("String does not contain the word 'apologize/sorry'.");
        }
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "code generated successfully",
                    response
                }
            )
        )

    }
    catch(error){
        
        console.log("error in chatgpt api =>", error);
        return(
            res.status(400).json(
                {
                    success : false, 
                    message : "gpt error while generating the code", 
                    error ,
                }
            )
        )
        
    }
}

module.exports = {chatgptController, chatGptCodeController, chatgptControllerGpt};