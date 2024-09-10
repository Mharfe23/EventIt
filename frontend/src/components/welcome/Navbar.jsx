import React from 'react'
import { useState } from 'react'


import { Link } from 'react-router-dom';
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'


const Navbar = () => {
  const [nav,setNav] = useState(false);

  const handleNav = () => {
      setNav(!nav)
  }

  return (<div className='bg-black'>
    
    
    <div className=' text-white flex justify-between items-center max-w-[1240px] px-4 mx-auto bg-black' >
        <h1 className=' text-3xl font-bold  sm:py-1'>event<span className='font-serif text-3xl '>I</span>t</h1>
        <ul className='hidden md:flex '>
            <li className='p-4'>Fonctionnalités</li>
            <li className='p-4'>Pourquoi event<span className='font-serif'>I</span>t ?</li>
            <li className='p-4'>Client</li>
            <li className='p-4'>Ressources</li>
            <li className='p-4'>Tarifs</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        </div>
        <div className={nav ? `fixed left-0 top-14 w-[60%] h-full border-r border-r-gray-900 ease-in-out duration-500 bg-[#000300]
           `: "fixed left-[-100%]" }>
            <ul className='p-4 uppercase'>
            <li className='p-4 border-gray-600 border-b'>Fonctionnalités</li>
            <li className='p-4 border-gray-600 border-b'>Pourquoi event<span className='font-serif'>I</span>t?</li>
            <li className='p-4 border-gray-600 border-b'>Client</li>
            <li className='p-4 border-gray-600 border-b'>Ressources</li>
            <li className='p-4 border-gray-600 border-b'>Tarifs</li>
            <li className='p-4 border-gray-600 border-b'><Link to="/login" >Se connecter</Link></li>
            <li className='p-4'><Link to="/signup" >S'inscrire</Link></li>
            </ul>
        </div>
    </div>
    </div>
    
  ) 
}

export default Navbar