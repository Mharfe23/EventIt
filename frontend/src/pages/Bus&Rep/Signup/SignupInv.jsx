import React from 'react'
import SignUp1 from './SignupBus1'
import SignUp2 from './SignupBus2';
import { useState } from 'react';

const SignupInv = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        business_name: "",
        business_phone: "",
        address: "",
        website: "",
        description: "",
        business_pic: "",
        event_name: "",
        category:""
    })

    const handleNextStep = (newData) => {
        setFormData({...formData, ...newData})
        setStep(step + 1);
    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }

    //const [loading, signup] = useSignup();
    
    const handleSubmit = async (newData) => {
        setFormData({...formData, ...newData});
        //await signup(formData);
       
    }
  return (<>
     {step === 1 && <SignUp1 formData={formData} handleNextStep={handleNextStep} />}
     {step === 2 && <SignUp2 formData={formData} handlePrevStep={handlePrevStep} handleSubmit={handleSubmit} />}
    </>
  )
}

export default SignupInv