import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaGithubSquare , FaDribbbleSquare} from 'react-icons/fa'

const Footer = () => {
return (
    <div className='w-full bg-gray-900 p-10 '>
            <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-5 text-white '>
                    <div>
                            <h1 className='w-full text-3xl font-bold  sm:py-1 pb-20'>event<span className='font-serif text-3xl '>I</span>t</h1>
                            <p className='mt-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est fugiat asperiores tempora corrupti neque aliquam laborum, optio perspiciatis vero ipsa.</p>
                            <div className='flex justify-between w-[75%] my-5'>
                                    <FaFacebookSquare size={30}/>
                                    <FaInstagram size={30}/>
                                    <FaTwitterSquare size={30}/>
                                    <FaGithubSquare size={30}/>
                                    <FaDribbbleSquare size={30}/>
                            </div>
                    </div>
                    <div className='lg:col-span-2 flex justify-between gap-4 flex-wrap'>
                            <div>
                                    <h1 className='text-xl font-bold'>À propos de nous</h1>
                                    <p className='mt-5'>À propos de nous</p>
                                    <p className='mt-5'>Contactez-nous</p>
                                    <p className='mt-5'>Notre équipe</p>
                            </div>
                            <div>
                                    <h1 className='text-xl font-bold'>Services</h1>
                                    <p className='mt-5'>Gestion d'événements</p>
                                    <p className='mt-5'>Planification d'événements</p>
                                    <p className='mt-5'>Marketing d'événements</p>
                            </div>
                            <div>
                                    <h1 className='text-xl font-bold'>Support</h1>
                                    <p className='mt-5'>FAQ</p>
                                    <p className='mt-5'>Conditions</p>
                                    <p className='mt-5'>Politique de confidentialité</p>
                            </div>
                    </div>
            
                    
            </div>
    </div>
)
}

export default Footer