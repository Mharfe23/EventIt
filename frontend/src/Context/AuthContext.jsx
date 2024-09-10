import { createContext } from "react";
import { useContext } from "react";
import { useState,useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}


export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')) || null);
    
    useEffect(() => {
        if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            
        } else {
            localStorage.removeItem('authUser');
        }
    }, [authUser]);
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}