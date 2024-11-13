import React, { useState } from 'react';
import { useSendNotif } from '../../../hooks/useNotif'; // Adjust the import path as needed
import toast from 'react-hot-toast';

const NotificationForm = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('representative'); // Example target, can be adjusted
  const [loadingSend, sendNotif] = useSendNotif();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'message') {
      setMessage(value);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'target') {
      setTarget(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() && title.trim()) {
      try {
        await sendNotif(title, message, target);
        setMessage(''); // Clear the input field
        setTitle('');
      } catch (error) {
        toast.error('Erreur lors de l\'envoi de la notification');
      }
    } else {
      toast.error('Veuillez remplir tous les champs');
    }
  };

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
      <h2 className='py-3 text-lg'>Envoyer une Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            id="title"
            name="title"
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-2 pr-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-10 mt-4 input sm:w-[70%] md:w-[80%] '
            value={title}
            onChange={handleChange}
            placeholder='Entrer le titre du notification'
            required
          />
        </div>
        <div>
          <label htmlFor="message" className='block relative top-10'>Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 ml-20 mt-4 textarea sm:w-[70%] md:w-[80%] '
            onChange={handleChange}
            rows="4"
            cols="50"
            placeholder="Enter your notification message here..."
            required
          />
        </div>
        <div>
          <label htmlFor="target" >Cible:</label>
          <select
            id="target"
            name="target"
            className='bg-gray-700 text-white ml-10 mt-5  placeholder-gray-400 rounded-lg pl-3 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={target}
            onChange={handleChange}>

            <option value="representative" >Représentant</option>
            <option value="admin" >Entreprise</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <br />
        <button type="submit" disabled={loadingSend} className=' btn'>
          {loadingSend ? 'Sending...' : 'Envoyer Notification'}
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;
