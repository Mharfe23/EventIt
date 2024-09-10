import React from 'react'

const Souhaiternouscontacter = () => {
return (
    <form>
        <div className='w-full p-24 text-white bg-[#000300]'>
            <h2 className='lg:text-4xl md:text-3xl text-2xl font-bold pb-4 mx-auto  mb-6 text-center lg:text-left'>Vous souhaitez nous contacter ?</h2>
            <div className='max-w-[1240px] mx-auto grid lg:grid-cols-2 lg:gap-10  gap-4 justify-center'>
                <div>
                    <select className="select select-bordered w-full sm:max-w-[500px] lg:max-w-none  text-gray-500">
                        <option disabled selected>Choisissez l'objet de votre demande</option>
                        <option>Demande de démo</option>
                        <option>Proposition de partenariat</option>
                        <option>Autre</option>
                    </select>
                
                    <div className='grid lg:grid-cols-2 lg:gap-5'>
                            <div>
                                <input type="text" className="input input-bordered w-full max-w-[500px] mt-4" placeholder="Prénom Nom*" />
                                <input type="text" className="input input-bordered w-full max-w-[500px] mt-4" placeholder="Structure / Organization*" />
                            </div>
                            <div>
                                <input type="email" className="input input-bordered w-full max-w-[500px] mt-4" placeholder="Email*" />
                                <input type="phone" className="input input-bordered w-full max-w-[500px] mt-4" placeholder="Téléphone*" />
                            </div>
                    </div>
                </div>

                <div>
                        <textarea className="textarea textarea-bordered w-full max-w-[500px] h-full" placeholder="Message*" required></textarea>
                </div>         
            </div>
            <button type='submit' className='bg-[#00df9a] w-[200px] btn border-none rounded-md mt-24 py-3 font-medium text-black block mx-auto'>Envoyer votre message </button>

        </div>
    </form>
)
}

export default Souhaiternouscontacter