import React from 'react'
import matchmaking from '../../assets/matchmaking.png'
const Matchmaking = () => {
  return (
    <div className='w-full bg-white pt-16 pb-32 px-14'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-5'>
            <img src={matchmaking} alt="/" className='w-[100%]  mx-auto ' />
            <div className='flex flex-col justify-center'>
                <h2 className='text-[#00df9a] md:text-4xl sm:text-3xl text-2xl font-bold pb-2 md:pb-4'>Une seule application pour tous vos événements</h2>
                <p>eventIt vous permet de gérer toute l'organisation de votre événement professionnel sur un seul logiciel</p>
                <button className='text-[#00df9a] w-[200px] rounded-md mx-auto md:mx-0 mt-9 py-3 font-medium bg-black'>Demander un démos </button>
            </div>
        </div>

    </div>
  )
}

export default Matchmaking