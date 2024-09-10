import React, {useState} from 'react'
import SignUp1 from './Signup1'
import SignUp2 from './Signup2'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name_organizer:'', email:'', password:'', confirmPassword:'', phone:'',
        name_event:'', description:'', start_date:'', end_date:'', location:''
    })

    const handleNextStep = (newData) => {
        setFormData({...formData, ...newData})
        setStep(step + 1);
    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }

    const [loading, signup] = useSignup();
    
    const handleSubmit = async (newData) => {
        setFormData({...formData, ...newData});
        await signup(formData);
       
    }


  return (
    <div>
        {step === 1 && <SignUp1 formData={formData} handleNextStep={handleNextStep} />}
        {step === 2 && <SignUp2 formData={formData} handlePrevStep={handlePrevStep} handleSubmit={handleSubmit} />}
        
    </div>
    )
}

export default Signup