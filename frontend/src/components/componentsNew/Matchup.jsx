import React from 'react'
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthContext } from '../../Context/AuthContext';
import { useMatchup,useMatchupAdvice } from '../../hooks/Bus&Rep/Usematchup'; // Adjust the path as necessary
import toast from 'react-hot-toast';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

  const Matchup = () => {
    const [loading, matchup] = useMatchup();
    const [loadingAdvice, matchupAdvice] = useMatchupAdvice();
    const [participants, setParticipants] = useState([]);
    const {authUser} = useAuthContext();

    const [expandedParticipantId, setExpandedParticipantId] = useState(null);
    const [additionalContent, setAdditionalContent] = useState('');

    const handleArrowClick = async (participant) => {
      // Check if the same participant is already expanded
      if (expandedParticipantId === participant.user_id) {
        setExpandedParticipantId(null); // Collapse if already expanded
        setAdditionalContent(''); // Clear content if collapsing
        return;
      }
  
      try {
        // Fetch additional content from API
        const response = await matchupAdvice({
          match_id: participant.user_id,
          user_fullname: participant.fullname,
          user_info: authUser.info,
          match_name: participant.fullname
        });
  
        const content = await response; // Assuming the hook returns the parsed response directly
        const formatedContent = content.advice
            .split('\n')
            .map((line) => <p key={line} className='block'>{line}</p>);

        setAdditionalContent(formatedContent); // Assuming the content has an `advice` field
        setExpandedParticipantId(participant.user_id); // Expand the clicked participant
      } catch (error) {
        toast.error('Error fetching advice. Please try again later.'); // Fixing toast error
        setAdditionalContent('Could not fetch advice. Please try again later.');
      }
    };


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
            <li key={participant.user_id} className='mb-4 relative'>
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
                    {participant?.common_keywords.map((categ)=>{
                    return <span className='bg-slate-100 p-1 text-center text-xs text-black rounded-md'>{categ}</span>
                  })}
                </p>
                <p>{Math.floor(participant.score*100)}</p>
              

              </div>
              <div className='absolute -bottom-1 left-1/2 cursor-pointer p-0' onClick={() => handleArrowClick(participant)}>
                            <MdKeyboardDoubleArrowDown size={28}  />
              </div>

                        {/* Conditionally render the additional content */}
                        {expandedParticipantId === participant.user_id && (
                            <div className='mt-4 text-gray-200'>
                              {loadingAdvice ? (
                                <p>Loading advice...</p>  
                              ) : (
                                <p>{additionalContent}</p>  
                              )}
                            </div>
                          )}

            
            </li> // Adjust based on the actual structure of participant
          ))}
        </ul>
      </motion.div>
    );
  };

    

export default Matchup