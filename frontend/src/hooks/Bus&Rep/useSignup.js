import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";

export const  useSignupRep = () =>{

    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({email, password, confirmPassword, fullname, event_name, business_name, info}) => {
        
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup/businessRep', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, confirmPassword, fullname, event_name, business_name, info})
            });

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
              
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
export const useSignupBus = () =>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({email, password, confirmPassword, business_name, business_phone, address, website, description, business_pic, event_name, category}) => {
        
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup/businessAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, confirmPassword, business_name, business_phone, address, website, description, business_pic, event_name, category})
            });

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message);
              
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