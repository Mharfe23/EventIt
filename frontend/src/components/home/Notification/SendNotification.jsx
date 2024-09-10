import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const SendNotification = ({target}) => {
  const [notifData, setNotifData] = useState({
    title: '',
    content: '',
    target: target
  });
  const handleNotifChange = (e) => {
    setNotifData({ ...notifData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (notifData.title === '' || notifData.content === '') {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    if (notifData.target === '') {
      toast.error('Veuillez sélectionner la cible de votre notification');
      return;
    }
    const result = await fetch('/api/notif/send',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notifData)
    })
    if(result.ok){
      toast.success('Notification envoyée avec succès');
    }else{  
      toast.error('Erreur lors de l\'envoi de la notification');
    }
    setNotifData({
      title: '',
      content: '',
    });
    //send notification
  };
  return (
    <div className='p-4'>
      <form className='flex flex-col justify-center gap-4'>
      <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Titre</span>
          </label>
          <input type="text"  name="title" onChange={handleNotifChange} value={notifData.title} placeholder='Entrer le titre de votre notification' className='w-full input input-bordered h-10'/>
      </div>
      <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Détail</span>
          </label>
          <textarea name="content" className='textarea textarea-bordered h-40 w-full' onChange={handleNotifChange} value={notifData.content}
           placeholder='Entrer le contenue de votre notification'></textarea>
      </div>
        <button className='btn btn-primary' onClick={handleSubmit}>Envoyer</button>
      </form>
    </div>
  )
}

export default SendNotification