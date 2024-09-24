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

    export const useSendNotif = () => {
        const [loadingSend, setLoadingSend] = useState(false);

        const sendNotif = async (title,content, target) => {
            setLoadingSend(true);

            try {
                const res = await fetch('/api/notif/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title,content, target }),
                });

                const data = await res.json();
                if (!res.ok) {
                    toast.error('Erreur lors de l\'envoi de la notification');

                    console.log(data.error);
                    return;
                }
                toast.success('Notification envoyée avec succès');

            } catch (error) {
                toast.error('Erreur lors de l\'envoi de la notification');
                console.log(error);

            } finally {
                setLoadingSend(false);
            }
        }

        return [loadingSend, sendNotif];
    }