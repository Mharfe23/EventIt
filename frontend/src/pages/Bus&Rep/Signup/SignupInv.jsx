import React, { useState } from 'react';
import SignupRep from './SignupRep';
import SignupBus from './SignupBus';
import TopNavbar from '../../../components/welcome/TopNavbar';


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
        <div>
            {!selected ? (
                <div>
                    <TopNavbar hiddenBelowMd={false} />
                    <div className='flex items-center gap-6 justify-around max-w-md min-w-md mx-auto rounded-lg shadow-md  my-4'>
                        <div
                            className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg  text-center cursor-pointer bg-white'
                        
                            onClick={() => handleSelect('business')}
                        >
                            <h1 className='text-3xl font-bold p-6 text-center'>Entreprise</h1>
                        </div>
                    <div
                        className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg  text-center cursor-pointer bg-white'
                        onClick={() => handleSelect('represent')}
                    >
                    <h1 className='text-3xl font-bold p-6 text-center'>Representant</h1>

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