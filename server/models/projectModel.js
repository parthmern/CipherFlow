const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name : {
            type : String ,
            required : true ,
        },

        createdAt : {
            type: Date ,
            default : Date.now(),
        },

        trash : {
            type : Boolean ,
            default : false ,
        },

        document : {
            type : String ,
            default : JSON.stringify(
                {
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
            )
        },

        whiteBoard : {
            type : String ,
        }

    }
)

const project = mongoose.model("project", projectSchema);
module.exports = project ;