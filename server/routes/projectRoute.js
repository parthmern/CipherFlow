const express = require("express");

const isUser = require("../middleware/auth");
const { createProjectController, getProjectsController, updateDocumentController, getProjectDetailsController, deleteProjectController } = require("../controllers/projectController");
const { chatgptController } = require("../controllers/chatgptController");

const router = express.Router() ;

router.post("/createProject", isUser, createProjectController);
router.post("/getProjects", isUser, getProjectsController);
router.post("/updateDocument", updateDocumentController);
router.post("/getProjectDetails", getProjectDetailsController);
router.post("/deleteProject", deleteProjectController);
router.post("/getCode", chatgptController);

module.exports = router ;