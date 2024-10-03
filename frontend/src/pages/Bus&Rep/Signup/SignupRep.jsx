import React from 'react'
import SignUp1 from './SignupRep1'
import SignUp2 from './Signup2Rep';
import { useState } from 'react';
import { useSignupRep} from '../../../hooks/Bus&Rep/useSignup';

const SignupRep = () => {

    const [step,setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
        event_name: "",
        business_name: "",
        info: "",
    })

    const handleNextStep = (newData) => {
        setFormData({...formData, ...newData})
        setStep(step + 1);
    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }
    const [loading, signup] = useSignupRep();

    const handleSubmit = async (newData) => {
        setFormData({...formData, ...newData});
        await signup(formData);
    }

    
  return (<>
        {step === 1 && <SignUp1 formData={formData} handleNextStep={handleNextStep} />}
        {step === 2 && <SignUp2 formData={formData} handlePrevStep={handlePrevStep} handleSubmit={handleSubmit} />}
     </>
    
  )
}

export default SignupRep;