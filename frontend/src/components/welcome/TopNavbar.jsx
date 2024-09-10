import React from 'react'
import { MdLanguage } from "react-icons/md";
import { Link } from 'react-router-dom';
const TopNavbar = ({hiddenBelowMd}) => {

    const forHomePage = hiddenBelowMd ? 'hidden md:flex' : 'flex';
    

    return (
        
        <div>
            <div className={`bg-white w-full  text-black justify-between items-center content-center pt-4 gap-6  px-9 
                    ${forHomePage}`}>
                <div className='flex flex-col justify-center items-center content-center relative top-[-8px] '>
                {!hiddenBelowMd && (
                        <Link to="/" ><h1 className=' text-2xl font-bold'>event<span className='font-serif text-2xl '>I</span>t</h1></Link>
                        
                    )}
                    
                    
                    
                </div>
                <div className='max-w-[1240px] relative top-[-8px] '>
                    <Link to="/login" className='mr-3 text-sm hover:link font-medium'>Se connecter</Link>
                    <Link to="/signup" className='btn btn-outline hover:link text-sm font-medium'>S'inscrire</Link>
                </div>
                
            </div>
            <div className={`w-full h-[2px]  bg-black top-[66px] ${forHomePage}`}></div>
        </div>
    );
}
export default TopNavbar;

