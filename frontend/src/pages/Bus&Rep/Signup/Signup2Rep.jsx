import { GrLinkPrevious } from "react-icons/gr";
import React, { useState } from 'react';
import TopNavbar from '../../../components/welcome/TopNavbar';
import { toast } from 'react-hot-toast';

const SignUp2Rep = ({ formData, handlePrevStep, handleSubmit }) => {
  const [localData, setLocalData] = useState({
    event_name: formData.event_name || '',
    business_name: formData.business_name || '',
    info: formData.info || '',
    
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  function handleInputError({ event_name, business_name, info }) {
    if (event_name === '' || business_name === '' || info === '') {
      toast.error('Veuillez remplir tous les champs');
      return false;
    }
    return true;
  }

  const handleFinish = (e) => {
    e.preventDefault();
    if (!handleInputError(localData)) return;
    handleSubmit(localData);
  };

return (
    <>
        <TopNavbar hiddenBelowMd={false} />

        <div className='flex flex-col items-center justify-center max-w-md min-w-md mx-auto rounded-lg shadow-md bg-white overflow-hidden my-4'>
            <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-bold p-6 text-center'>event<span className='font-serif text-3xl'>I</span>t</h1>

                <form>
                    
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom de l'evenement</span>
                        </label>
                        <input type="text" name="event_name" onChange={handleChange} value={localData.event_name} placeholder="Entrer l'adresse" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom de l'entreprise</span>
                        </label>
                        <input type="text" name="business_name" onChange={handleChange} value={localData.business_name} placeholder="Votre entreprise" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Information </span>
                        </label>
                        <textarea
                            placeholder="qui etes-vous? et Votre but pour participer l'evenement" onChange={handleChange} value={localData.info}
                            className="textarea textarea-bordered textarea-xs w-full h-20" name="info"></textarea>
                    </div>
             
                   

                    <div className="flex justify-between mt-3 pb-2">
                        <button onClick={handlePrevStep} className='btn btn-outline font-medium text-base btn-sm mt-4'><GrLinkPrevious /><span>Précédent</span></button>
                        <button type="button" onClick={handleFinish} className='btn btn-outline font-medium text-base btn-sm mt-4'><span>S'inscrire</span></button>
                    </div>
                </form>
            </div>
        </div>
    </>
);
};

export default SignUp2Rep;