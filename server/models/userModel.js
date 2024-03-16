const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String ,
            
        }, 

        photo : {
            type : String 
        },

        email : {
            type : String ,
            required : true ,
            unique: true ,
        },

        createdAt : {
            type: Date ,
            default : Date.now(),
        },

        projects : [
            {
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'project',
            }
        ]

    }
)

const user = mongoose.model('user', userSchema);
module.exports = user ;
