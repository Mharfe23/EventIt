import { useState } from 'react';
import toast from "react-hot-toast";

export const useGetNotifAdmin = () => {
    
        const [loadingAdmin,setLoading] = useState(false);
    
        const getNotifAdmin = async () => {
    
            setLoading(true);
    
            try {
                const res = await fetch('/api/notif/get/admin');
                
                const data = await res.json();
                if(!res.ok){
                    toast.error(data.message);
                    return;
                }
                return data;
    
            } catch (error) {
                toast.error('Erreur lors de la récupération des notifications');
                console.log(error);
                
            }finally{
                setLoading(false);
            }
        }
        return [loadingAdmin, getNotifAdmin];
}

export const useGetNotifRep = () => {
        
            const [loadingRep,setLoadingRep] = useState(false);
        
            const getNotifRep = async () => {
        
                setLoadingRep(true);
        
                try {
                    const res = await fetch('/api/notif/get/rep');
                    
                    const data = await res.json();
                    if(!res.ok){
                        toast.error(data.message);
                        return;
                    }
                    return data;
        
                } catch (error) {
                    toast.error('Erreur lors de la récupération des notifications');
                    console.log(error);
                    
                }finally{
                    setLoadingRep(false);
                }
            }
            return [loadingRep, getNotifRep];
    }
