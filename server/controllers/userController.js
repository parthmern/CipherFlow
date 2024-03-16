const jwt = require("jsonwebtoken");


const user = require("../models/userModel");

// creating user in DB
const signupController = async (req,res) =>{
    try{

        const {name, email, password} = req.body ;

        const isUserExist = await user.findOne({email : email});

        if(isUserExist){

            console.log("existed user=>", isUserExist);

            console.log("🚫 user already exist");
            return(
                res.status(400).json(
                    {
                        success : false,
                        message : "user already exist",
                    }
                )
            )

        }

        const createdUser = await user.create(
            {
                name ,
                email, 
                password 
            }
        );

        console.log("res=>", res);

        
        console.log("✅ user created successful=>", createdUser);
        return(
            res.status(200).json(
                {
                    success : true ,
                    message : "user created successful",
                    createdUser : createdUser ,
                }
            )
        )
        

    }

    catch(error){
        console.log("🚫 user not created=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "user not created",
                    error : error ,
                }
            )
        )
    }
}

// login user and set cookies
const loginController = async (req, res) =>{
    try{

        const {email} = req.body ;

        // checking user is there in DB or not
        const foundedUser = await user.findOne({email});

        if(!foundedUser){
            console.log("🚫 user is not available");
            return(
                res.status(400).json(
                    {
                        success : false ,
                        message : "user is not available do register first",
                    }
                )
            )
        }

        // generating jwt
        const tokenData = {
            email : foundedUser.email ,
            id : foundedUser._id ,
        };

        const jwtSecret = "parthmern"; 

        const options = {
            expiresIn: "24h",
        };

        const jwtToken = await jwt.sign(
            tokenData,
            jwtSecret,
            options,
        );

        console.log("jwt token=>", jwtToken);

        // cookies setting
        const cookies = {
            foundedUser,
            token : jwtToken,
        };

        const cookiesOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires after 24 hours
            httpOnly: true,
        };
        
        console.log("✅ loginUser success=>", foundedUser, cookies);
        res.cookie("token", cookies, cookiesOptions).status(200).json(
            {
                success : true, 
                message : "user login success",
                foundedUser ,
                cookies,
            }
        );
    


    }
    catch(error){
        console.log("🚫 loginUser failed=>", error);
        return(
            res.status(500).json(
                {
                    success : false ,
                    message : "loginUser failed",
                    error : error ,
                }
            )
        )
    }
}



module.exports = {
    signupController,
    loginController
};