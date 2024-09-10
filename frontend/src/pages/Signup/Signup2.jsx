
import { GrLinkPrevious } from "react-icons/gr";
import React,{useState} from 'react'
import TopNavbar from '../../components/welcome/TopNavbar';
import { toast } from 'react-hot-toast';
const SignUp = ({formData,handlePrevStep,handleSubmit}) => {
  const [localData, setLocalData] = useState({
      
    name_event: formData.name_event || '',
    description: formData.description || '',
    location: formData.location || '',
    start_date: formData.start_date || '',
    end_date: formData.end_date || '',
  
    });
  
    const handleChange = (e) => {
      setLocalData({...localData, [e.target.name]: e.target.value});
    }

    function handleInputError({ name_event, description, start_date, end_date, location}){
      if(name_event === '' || description === '' || start_date === '' || end_date === '' || location === ''){
          toast.error('Veuillez remplir tous les champs');
          return false;
      }
  
      if(start_date > end_date){
          toast.error('La date de début doit être inférieure à la date de fin');
          return false;
      }
      return true;
  }

    const handleFinish = (e) => {
      e.preventDefault();
      if(!handleInputError(localData)) return;
      handleSubmit(localData);
    }



  return (<>
    <TopNavbar hiddenBelowMd={false} />

    <div className='flex flex-col items-center justify-center max-w-md min-w-md mx-auto rounded-lg shadow-md bg-white overflow-hidden mt-4'>
      <div className='w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-blur-lg
      bg-opacity-0'>
      <h1 className=' text-3xl font-bold  p-8 text-center'>event<span className='font-serif text-3xl '>I</span>t</h1>

      <form>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Nom d'événement</span>
          </label>
          <input type="text" name="name_event" onChange={handleChange} value={localData.name_event} placeholder='Entrer le nom d&apos;événement' className='w-full input input-bordered h-10'/>
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text'>Description</span>
          </label>
          <textarea
                placeholder="Description" onChange={handleChange} value={localData.description}
                className="textarea textarea-bordered textarea-xs w-full h-24 " name="description"></textarea>
        </div>
        <div>
            <label className='label p-2'>
                <span className='text-base label-text' >Lieu</span>
            </label>
            <input type="text" name="location" onChange={handleChange} value={localData.location} placeholder='Entrer le lieu' className='w-full input input-bordered h-10'/>
        </div>
        <div className="py-3 mt-2">
            <label className="mr-4 p-2">
                <span className='text-base label-text'>Date de début</span>
            </label>
            <input type="date" name="start_date" value={localData.start_date} onChange={handleChange} className="input input-bordered input-sm max-w-xs" placeholder="none"/>
        </div>
        <div className="py-3">
            <label className="mr-10 p-2">
                <span className='text-base label-text'>Date de Fin</span>
            </label>
            <input type="date" name="end_date" value={localData.end_date} onChange={handleChange} className="input input-bordered input-sm  max-w-xs" placeholder="none"/>
        </div>
        
        <div className="flex justify-between mt-3 pb-2">
          
          <button onClick={handlePrevStep} className='btn btn-outline font-medium text-base btn-sm mt-4'><GrLinkPrevious /><span>Précédent</span></button>
          <button type="button" onClick={handleFinish} className='btn btn-outline font-medium text-base btn-sm mt-4 '><span>S'inscrire</span></button>
        </div>
        

      </form>
      </div>
    </div>
    </>
  )
};

export default SignUp;