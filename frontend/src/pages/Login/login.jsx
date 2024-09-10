

import TopNavbar from "../../components/welcome/TopNavbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLoging";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleInput = (data) =>{
    if (data.email === '' || data.password === '') {
      return false;
    }
    if(data.password.length < 6){
      return false;
    }
    return true;
  }
  const disabled = handleInput(formData) ? '' : 'btn-disabled';

  const [loading, login] = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInput(formData)) return;
    await login(formData);
}


  return (<>
   
    <TopNavbar hiddenBelowMd={false} />
    
    <div>
      <div className=' min-w-md max-w-md  mx-auto my-16 bg-white overflow-hidden rounded-xl shadow-lg'>
        <div className='w-full p-6 rounded-xl shadow-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

        <h1 className=' text-3xl font-bold  p-8 text-center'>event<span className='font-serif text-3xl '>I</span>t</h1>
      
        
        <form >
          <div>
            <label className='label p-2'>
              <span className='text-base label-text' >Email</span>
            </label>
            <input type="email" placeholder='Entrer votre email' name="email" onChange={handleChange} value={formData.email} className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Mot de passe</span>
            </label>
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder='Entrer votre mot de passe'
            className='w-full input input-bordered h-10' />

          </div>
          <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
          Vous n'avez pas de compte?
          </Link>

          <div>
            <button type="submit" onClick={handleSubmit} className={`btn btn-block btn-sm mt-2 ${disabled} `} >Login</button>
          </div>


        </form>

        </div>
      </div>
    </div>
    
    </>
  )
};

export default Login;