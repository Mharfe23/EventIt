import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from '../../Context/AuthContext';
 
import { useMatchup } from '../../hooks/Bus&Rep/Usematchup'; // Adjust the path as necessary

  const Matchup = () => {
    const [loading, matchup] = useMatchup();
    const [participants, setParticipants] = useState([]);
    const {authUser} = useAuthContext();



    const handleMatchup = async () => {
      const data = await matchup({ user_id: authUser.user_id, business_id: authUser.business_id, info: authUser.info }); // Replace with actual values
      if (data) {
        setParticipants(data.matches); // Assuming the API returns a list of participants
      }
    };

    return (
      <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 overflow-y-auto mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button className={`btn btn-primary block mx-auto ${loading? 'btn-disabled':''}`} onClick={handleMatchup} >
          {loading ? 'Loading...' : 'AFFICHER MES MATCHES'}
        </button>
        <ul className='mt-4 '>
        <li className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300 flex gap-2 items-center justify-between border-[1px] mb-5 shadow-sm shadow-slate-50 rounded-lg bg-gray-900 font-bold'>
          <p>Nom et prenom</p>
          <p>Categorie Communes</p>
          <p>Score de compatibilité</p>
        </li>

          {participants.map((participant, index) => (
            <li key={participant.user_id} className='mb-4'>
              <div className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center justify-between border-[1px] mb-2 shadow-sm shadow-slate-50 rounded-lg bg-gray-900 '>
                <div className='flex items-center gap-3'>
                <img
                      src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
                      alt='Product img'
                      className='size-10 rounded-full'
                    />
                <p>{participant.fullname}</p>
                </div>
                
                <p className='grid grid-cols-3 gap-2'>
                    {participant.common_keywords.map((categ)=>{
                    return <span className='bg-slate-100 p-1 text-center text-xs text-black rounded-md'>{categ}</span>
                  })}
                </p>
                <p>{Math.floor(participant.score*100)}</p>
              

              </div>
            
            </li> // Adjust based on the actual structure of participant
          ))}
        </ul>
      </motion.div>
    );
  };

    

export default Matchup