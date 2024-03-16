const userRouter = require("./routes/userRoute");
const projectRouter = require("./routes/projectRoute");
const cookieParser = require("cookie-parser");
const express = require("express");
const dbConnect = require("./utils/dbConnect");
const cors = require("cors");

const app = express() ;

const PORT = 4000 ;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//db connectiom
dbConnect();

// server listen
app.listen(PORT, ()=>{
    console.log("server listen successful");
});

// routes
app.use("/user", userRouter); 
app.use("/project", projectRouter);

app.use("/", (req, res)=>{
    res.send("server working");
})

