import React, { useState } from 'react';
import SignupRep from './SignupRep';
import SignupBus from './SignupBus';
import TopNavbar from '../../../components/welcome/TopNavbar';
import { Building2 } from 'lucide-react';
import { User } from 'lucide-react';
const SignupInv = () => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (type) => {
        setSelected(type);
    };

    const renderContent = () => {
        if (selected === 'business') {
            return <SignupBus />;
        } else if (selected === 'represent') {
            return <SignupRep />;
        }
        return null;
    };

    return (
        <div className='h-screen '>
            {!selected ? (
                <div >
                    <TopNavbar hiddenBelowMd={false} />
                    <div className=' md:flex items-center gap-6 justify-around  mx-auto w-4/5  my-32'>
                        <div
                            className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg text-center cursor-pointer bg-white mb-6 md:mb-0'
                        
                            onClick={() => handleSelect('business')}
                        >
                            <h1 className='text-3xl  font-bold p-6 text-center flex gap-4 justify-center items-center'><Building2 size={32}/><span>Entreprise</span></h1>
                        </div>

                        <div
                            className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg  text-center cursor-pointer bg-white'
                            onClick={() => handleSelect('represent')}
                        >
                        <h1 className='text-3xl font-bold p-6 text-center flex justify-center gap-4 items-center'><User size={32}/><span>Representant</span></h1>

                        </div>

                    </div>
                    
                </div>
            ) : (
                <div>
                    {renderContent()}
                    
                </div>
            )}
        </div>
    );
};

export default SignupInv;