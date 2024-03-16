import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider( {children} )                            
{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState();
    const [token, setToken] = useState();


    useEffect(()=>{
        setUserData(JSON.parse(localStorage.getItem("userData")));
        setToken(JSON.parse(localStorage.getItem("token")));

        if(JSON.parse(localStorage.getItem("userData"))){
            console.log("setting login");
            setIsLoggedIn(true);
        }

    }, [])



   const value = {           
   isLoggedIn,
   setIsLoggedIn,
   userData,
   setUserData,
   token,
   setToken,
   }


   return <AppContext.Provider value={value}>    
        {children}                                
    </AppContext.Provider>;

}