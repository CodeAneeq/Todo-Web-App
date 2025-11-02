import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const ModeContext = React.createContext();

export const ModeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");  
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

    const Toggle = () => {
        setIsDark(prev => !prev);
        console.log("Toggle Swtitched");   
    }

   return (
    < ModeContext.Provider value={{isDark, Toggle}}>
        {children}
   </ModeContext.Provider>
   )
}


