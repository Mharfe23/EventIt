import React from 'react'
import Header from "../../../../components/componentsNew/Header";
import {motion} from 'framer-motion'
import StatCard from '../../../../components/componentsNew/StatCard';
import { useEffect,useState } from 'react';
import { useGetReperesentByBusiness,useGetReperesentByBusinessToday} from "../../../../hooks/useStats";
import { Package, TrendingUp } from "lucide-react";
import RepresentTable from '../../../../components/componentsNew/users/RepresentTable';

const MonEntreprise = () => {
    const [represent,setRepresent] = useState([]);
    const [representTod,setRepresentTod] = useState([]);
    const [loading,getReperesent] = useGetReperesentByBusiness();
    const [loading2,getReperesentTod] = useGetReperesentByBusinessToday();

    useEffect(()=>{
        const setStat = async ()=> {
        
            setRepresent(await getReperesent());
            setRepresentTod(await getReperesentTod())
        }
        setStat();
    },[])


  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Mon Entreprise"/>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20'>
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}>
          
        <StatCard name='Mes Representant' icon={Package} value={represent.length} color='#6366F1' />
        <StatCard name='Inscrit Aujourdhui' icon={TrendingUp} value={representTod.length} color='#EC4899' />

      </motion.div>

      <div >
        <RepresentTable Representlist={represent}/>
      </div>
      </main>
    </div>
  )
}

export default MonEntreprise