import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./pages/Navbar";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProjectPage } from "./pages/ProjectPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { CodePage } from "./pages/CodePage";

function App() {
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
