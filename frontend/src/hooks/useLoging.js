
import { useState } from 'react';
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";


const useLogin = () => {

    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({email, password}) => {

        setLoading(true);

        const apiEndpoints = ['/api/auth/login/organizer','/api/auth/login/businessRep','/api/auth/login/businessAdmin'
        ]

        try {
            const res = await Promise.all(apiEndpoints.map(endpoint => 
            
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
        ));
            const data = await Promise.all(res.map(res =>  res.json()));

            const successfulResponse = await data.find(result => result.event_id);

            if(successfulResponse){
                await setAuthUser(successfulResponse);
                toast.success("Connexion réussie");
                
            }else {
                toast.error('Aucun compte trouvé avec ces informations');
            }

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


/*import { useState } from 'react';
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

*/