import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./pages/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProjectPage } from "./pages/ProjectPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { CodePage } from "./pages/CodePage";
import { useContext, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "./utils/apiUtils";
import toast from "react-hot-toast";
import { AppContext } from "./context/AppContext";

function App() {

  const navigate = useNavigate();
  const {setIsLoggedIn,setUserData,token,setToken} = useContext(AppContext);

  useEffect(()=>{
    async function checkingToken(){
      try{
        const res = await axios.post(`${apiUrl}/user/checkingToken`, {token});
        
        toast.success("token verified");
      }
      catch(error){
        toast.error("token invalid");
        function logoutHandler(){
          try{
            setIsLoggedIn(false);
            setToken(null);
            setUserData(null);
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
      
            toast.success("Logout done");
            navigate("/") ;
          }
          catch(e){
            toast.error("Logout not successful");
          }
        }
        logoutHandler();
      }
    }
    token && checkingToken();
  }, [token]);

  return (
    
    <div className="text-black h-[100%] w-[100%] ">
      
        
        <Navbar/>

          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>} ></Route>
            <Route path="/signup" element={<RegisterPage/>}></Route>
            <Route path="/projects" element={<ProjectPage />} ></Route>
            <Route path="/workspace/:id" element={<WorkspacePage />} ></Route>
            <Route path="/code/:id" element={<CodePage />} ></Route>
          </Routes>

    
    </div>
  );
}

export default App;
