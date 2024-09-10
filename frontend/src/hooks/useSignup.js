import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const useSignup = () =>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async ({name_organizer, email, password, confirmPassword, phone, name_event, description, start_date, end_date, location}) => {
        
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup/organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name_organizer, email, password, confirmPassword, phone, name_event, description, start_date, end_date, location})
            });

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
              
            }

           
            setAuthUser(data);
            toast.success('Inscription réussie');

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    return [loading, signup];
}

export default useSignup;





