const express = require("express");


const { createProjectController, getProjectsController, updateDocumentController, getProjectDetailsController, deleteProjectController } = require("../controllers/projectController");
const { chatgptController } = require("../controllers/chatgptController");
const { isUser } = require("../middleware/auth");

const router = express.Router() ;

router.post("/createProject", isUser, createProjectController);
router.post("/getProjects", isUser, getProjectsController);
router.post("/updateDocument",isUser, updateDocumentController);
router.post("/getProjectDetails",isUser, getProjectDetailsController);
router.post("/deleteProject",isUser, deleteProjectController);
router.post("/getCode",isUser, chatgptController);

module.exports = router ;