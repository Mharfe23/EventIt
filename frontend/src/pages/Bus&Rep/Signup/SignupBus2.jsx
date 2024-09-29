import { GrLinkPrevious } from "react-icons/gr";
import React, { useState } from 'react';
import TopNavbar from '../../../components/welcome/TopNavbar';
import { toast } from 'react-hot-toast';

const SignUp = ({ formData, handlePrevStep, handleSubmit }) => {
  const [localData, setLocalData] = useState({
    address: formData.address || '',
    website: formData.website || '',
    description: formData.description || '',
    business_pic: formData.business_pic || '',
    event_name: formData.event_name || '',
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  function handleInputError({ address, website, description, business_pic, event_name }) {
    if (address === '' || website === '' || description === '' || business_pic === '' || event_name === '') {
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
                            <span className='text-base label-text'>Adresse</span>
                        </label>
                        <input type="text" name="address" onChange={handleChange} value={localData.address} placeholder="Entrer l'adresse" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Site Web</span>
                        </label>
                        <input type="text" name="website" onChange={handleChange} value={localData.website} placeholder="Entrer le site web" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Description</span>
                        </label>
                        <textarea
                            placeholder="Description" onChange={handleChange} value={localData.description}
                            className="textarea textarea-bordered textarea-xs w-full h-20" name="description"></textarea>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Photo de l'entreprise</span>
                        </label>
                        <input type="text" name="business_pic" onChange={handleChange} value={localData.business_pic} placeholder="Entrer l'URL de la photo" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom d'événement</span>
                        </label>
                        <input type="text" name="event_name" onChange={handleChange} value={localData.event_name} placeholder="Entrer le nom d'événement" className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Catégorie</span>
                        </label>
                        <select name="category" onChange={handleChange} value={localData.category || ''} className='w-full input input-bordered h-10'>
                            <option value="">Sélectionner une catégorie</option>
                            <option value="IA">IA</option>
                            <option value="cloud & Infra">Cloud</option>
                            <option value="digitalisation">Digitalisation</option>
                            <option value="autre">Autre</option>
                        </select>
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

export default SignUp;