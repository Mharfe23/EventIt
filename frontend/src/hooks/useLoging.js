import { useState } from 'react';
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const useLogin = () => {

    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({email, password}) => {

        setLoading(true);

        try {
            const res = await fetch('/api/auth/login/organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await res.json();
            if(!res.ok){
                toast.error(data.message);
                return;
            }
            setAuthUser(data);
            toast.success("Connexion réussie");

        } catch (error) {
            toast.error('Erreur lors de la connexion');
            console.log(error);
            
        }finally{
            setLoading(false);
        }
    }
    return [loading, login];


}

export default useLogin;

