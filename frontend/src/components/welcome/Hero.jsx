import React from 'react'
import { Link } from 'react-router-dom'
import {ReactTyped}from 'react-typed'

const Hero = () => {
  return (
    <div className='text-white bg-[#000300] pb-14'>
        <div className='max-w-[800px]  w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <h1 className=' md:text-7xl sm:text-6xl text-4xl md:py-6 font-bold '>Votre plateforme évenementielle</h1>
            <ReactTyped className='md:text-5xl sm:text-4xl text-xl font-bold text-[#52f032] py-4' strings={[
              "Digitalisé" , "Simple", "Efficace", "Evolutive"
            ]} loop typeSpeed={120}  backSpeed={100} />
          <p className='md:text-xl text-base font-bold text-gray-400  '>La seule application de gestion d’événement qui booste vos inscriptions, votre accueil et vos interactions</p>
        <Link to="#contact" ><button className='bg-[#00df9a] w-[200px] rounded-md btn hover:bg-[#03cb8c] border-none mx-auto my-6 py-3 font-medium text-black'>Demander un démos </button></Link> 
        </div>
    </div>
  )
}

export default Hero