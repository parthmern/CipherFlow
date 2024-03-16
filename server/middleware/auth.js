const jwt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token?.token || req.body?.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log("💫 token in auth ==>", token);
        
        console.log("req.cookies", req.cookies?.token?.token);
        console.log("req.body.token", req.body?.token);
        console.log("header", req.header("Authorization"));

        if (!token) {
            console.log("🚫 token is not available");
            return res.status(400).json({
                success: true,
                message: "Token is not available",
            });
        }

        // Checking if token is valid or not
        try {
            const jwtSecret = "parthmern";
            const decoded = await jwt.verify(token, jwtSecret);
            console.log("💫 decoded token res =>", decoded);

            // Adding decoded token to request
            req.user = decoded;

            console.log("✅ isUser middleware successful");
            next(); // Move to next middleware
        } catch (error) {
            console.log("🚫 token is invalid");
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        console.log("🚫 isUser error =>", error);
        return res.status(500).json({
            success: false,
            message: "isUser error",
            error: error,
        });
    }
};

const checkingToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token?.token || req.body?.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log("💫 token in auth ==>", token);
        
        console.log("req.cookies", req.cookies?.token?.token);
        console.log("req.body.token", req.body?.token);
        console.log("header", req.header("Authorization"));

        if (!token) {
            console.log("🚫 token is not available");
            return res.status(400).json({
                success: true,
                message: "Token is not available",
            });
        }

        // Checking if token is valid or not
        try {
            const jwtSecret = "parthmern";
            const decoded = await jwt.verify(token, jwtSecret);
            console.log("💫 decoded token res =>", decoded);

            // Adding decoded token to request
            req.user = decoded;

            console.log("✅ token verified successful");
        
            return(
                res.status(200).json(
                    {
                        success : true, 
                        message : "token verfied",
                    }
                )
            )

        } catch (error) {
            console.log("🚫 token is invalid");
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        console.log("🚫 isUser error =>", error);
        return res.status(500).json({
            success: false,
            message: "isUser error",
            error: error,
        });
    }
};

module.exports = {isUser, checkingToken};
