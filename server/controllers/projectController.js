const project = require("../models/projectModel");
const user = require("../models/userModel");


const createProjectController = async (req, res) => {

    try{

        const {name} = req.body;
        const {id} = req.user ;
        
        console.log("💫 name=>", name,req.user);

        const createdProject = await project.create(
            {
                name
            }
        );

        if(!createdProject){
            console.log("🚫 created project is empty");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "project not created",
                        createdProject,
                    }
                )
            )
        }

        const addedProjInUser = await user.findOneAndUpdate(
            { _id : id },
            {
                $push :{
                    projects : createdProject._id 
                }   
            },
            { new: true }
        );

        if(!addedProjInUser){
            console.log("🚫 added project in user is failed");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "added project in user is failed",
                        addedProjInUser,
                    }
                )
            )
        }

        console.log("✅ project created successful=>", createdProject);
        console.log("✅ add proj in user is successful=>", addedProjInUser);
        
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "project created successful",
                    createdProject,
                    addedProjInUser,
                }
            )
        )

        
    }
    catch(error){
        console.log("🚫 created proj failed=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "created project failed",
                    error : error ,
                    token,
                }
            )
        )
    }


}

const getProjectsController = async (req, res) => {

    try{

        const {id} = req.user ;
        
        if(!id){
            console.log("🚫 id is not avaialbe=>", id);
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "Id is not available"
                    }
                )
            )
        }

        const userDetails = await user.findById(
            {_id : id},
        ).populate("projects");
        
        console.log("✅ projects", userDetails?.projects);

        const projects =  userDetails?.projects;
        
        console.log("✅ project fetching done", projects);
        return(
            res.status(200).json(
                {
                    message : "Project fetching done", 
                    success : true ,
                    userDetails,
                    projects,
                }
            )
        )

        
    }
    catch(error){
        console.log("🚫 getProjects failed=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "created project failed",
                    error : error ,
                    token,
                }
            )
        )
    }
}
 
const updateDocumentController = async (req, res) => {

    try {
        const { id, document, whiteBoard } = req.body;
        console.log("🪙 proj id=>", id);

        const findProject = await project.findById(id);

        if (!findProject) {
            console.log("🚫 project id not found");
            return res.status(400).json({
                success: false,
                message: "project id not found",
                findProject,
            });
        }

        let updateFields = {};
        if (document && document !== 'null' && document !== null) {
            console.log("updating doc ", document);
            updateFields.document = document;
        }
        if (whiteBoard) {
            console.log("updating whiteboard");
            updateFields.whiteBoard = whiteBoard;
        }

        const updatedProject = await project.findByIdAndUpdate(id, updateFields, { new: true });

        console.log("✅ updatedProject successfully =>", updatedProject);

        return res.status(200).json({
            success: true,
            message: "updatedProject successfully",
            updatedProject
        });

    } catch (error) {
        console.log("🚫 projectupdate failed=>", error);
        return res.status(500).json({
            success: false,
            message: "projectupdate failed",
            error: error,
        });
    }

}

const getProjectDetailsController = async (req, res) => {
    try {
        const { id } = req.body; 
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
        return res.status(200).json({
            success: true,
            data: projectDetails,
        });

    } catch (error) {
        console.log("❌ Error fetching project details:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching project details",
            error: error,
        });
    }
}

const deleteProjectController = async (req, res) =>{
    try{
        const {id} = req.body ;
        console.log("projectID ->", id);

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

        const deletedProject = await project.findByIdAndDelete(id);

        console.log("✅ deleted project ->", deletedProject);

        return(
            res.status(200).json(
                {
                    success : false ,
                    message : "Project deleted successful" ,
                    deletedProject, 
                }
            )
        )




    }
    catch(error){
        console.log("❌ Error in deletion of project", error);
        return res.status(500).json({
            success: false,
            message: " Error in deletion of project",
            error: error,
        });
    }
}


module.exports = {
    createProjectController, 
    getProjectsController,
    updateDocumentController,
    getProjectDetailsController,
    deleteProjectController
} ;