
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";


const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/auth/logout/organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            setAuthUser(null);
            toast.success("Déconnexion réussie");

        } catch (error) {
            toast.error('Erreur lors de la déconnexion');
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    return logout;
}

export default useLogout;
    

