
import GetNotification from './GetNotification';
import React, { useState } from 'react';
import Notification from './Notification';
import { useGetNotifAdmin, useGetNotifRep } from '../../../hooks/useNotif';
import toast from 'react-hot-toast';
import SendNotification from './SendNotification';
const Container = () => {
  const [notificationType, setNotificationType] = useState('');
  const [loadingAdmin, getNotifAdmin] = useGetNotifAdmin();
  const [loadingRep, getNotifRep] = useGetNotifRep();
  const [notifications, setNotifications] = useState([]);

    const handleNotificationTypeChange = (event) => {
        setNotificationType(event.target.value);
    };
    let [getnotif, setGetNotif] = useState(true);
    
    const handleNotificationGet = async () => {
        setGetNotif(true);
        let result;
        if (notificationType === 'admin') {
           result = await getNotifAdmin();
           setNotifications(result);
        } else if (notificationType === 'representative') {
            result = await getNotifRep();
            setNotifications(result);
        }else{
          toast.error('Veuillez sélectionner un type de notification');
          return;
        }
        
    };
   
  return (
    <div className='bg-[#201E43]  w-full pl-72 p-24 flex flex-col'>
        <h1 className='text-white text-3xl font-bold mb-6'>Notifications</h1>
        <div className='h-[85%] bg-[#EEEEEE] rounded-lg min-w-[565px] overflow-x-auto'>
        <div className='join  flex sticky top-0'>
                <select value={notificationType} onChange={handleNotificationTypeChange} className='select select-bordered w-full select-md'>
                    <option value="" disabled selected>Selectioner la cible du notification</option>
                    <option value="admin">Business Admin</option>
                    <option value="representative">Business Representatives</option>
                </select>
                <button onClick={handleNotificationGet} className='btn '>
                   
                  Voir les notifications</button>
                <button onClick={() => setGetNotif(false)} className='btn'>Envoyer les notifications</button>
          </div>
          {(loadingAdmin || loadingRep) && <div className='flex justify-center items-center h-full'><div className='loader'></div></div>}
          {getnotif ? (
          <GetNotification notifications={notifications} />
        ) : (
          <SendNotification target={notificationType}/>
        )}
        
        </div>
    </div>
  )
}

export default Container;