
import { GrLinkNext } from "react-icons/gr";
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import TopNavbar from '../../../components/welcome/TopNavbar';
import toast ,{ Toaster }from 'react-hot-toast';

const SignUpRep1 = ({formData, handleNextStep}) => {
    const [localData, setLocalData] = useState({
        email: formData.email, 
        password: formData.password, 
        confirmPassword: formData.confirmPassword,
        fullname: formData.fullname,
    });

    const handleNext = (e) => {
        e.preventDefault();

        //check input values
        if(localData.email === '' || localData.password === '' || localData.confirmPassword === '' || localData.fullname == ''){
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        if(localData.password !== localData.confirmPassword){
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }
       
        if(localData.password.length < 6){
            toast.error('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        //end check input values

        handleNextStep(localData);
    };

    const handleChange = (e) => {
        setLocalData({...localData, [e.target.name]: e.target.value});
    }

    return (<>
        <TopNavbar hiddenBelowMd={false} />
        
        <div className='flex flex-col items-center justify-center max-w-md min-w-md mx-auto rounded-lg shadow-md bg-white overflow-hidden mt-4'>
            <div className='w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-blur-lg bg-opacity-0'>
                <h1 className=' text-3xl font-bold  p-8 text-center'>event<span className='font-serif text-3xl '>I</span>t</h1>

                <form>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom complet</span>
                        </label>
                        <input type="text" onChange={handleChange} value={localData.fullname} name="fullname" placeholder="Entrer le nom complet" className='w-full input input-bordered h-10'/>
                    </div>
                    
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input type="text" name="email" onChange={handleChange} value={localData.email} placeholder='Entrer votre email' className='w-full input input-bordered h-10'/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Mot de passe</span>
                        </label>
                        <input type="password" onChange={handleChange} value={localData.password} name="password" placeholder='Enter votre mot de passe' className='w-full input input-bordered h-10'/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirmer le mot de passe</span>
                        </label>
                        <input type="password" onChange={handleChange} value={localData.confirmPassword} name="confirmPassword" placeholder='Confirmer votre mot de passe' className='w-full input input-bordered h-10'/>
                    </div>

                    <div className="flex justify-between mt-8 pb-2">
                        <div>
                            <p className='mt-2 text-sm content-center'>Vous avez un compte? </p>
                            <Link to="/login" className="text-sm  hover:text-blue-600  content-center link">Connectez-vous </Link>
                        </div>
                        
                        <button onClick={handleNext} className='btn btn-outline font-medium text-sm btn-sm mt-4 '><span>Suivant</span> <GrLinkNext /></button>
                    </div>
                </form>
            </div>
        </div>
    </>)
};
export default SignUpRep1;