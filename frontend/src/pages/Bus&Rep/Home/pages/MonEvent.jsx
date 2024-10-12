import React from 'react'
import Header from "../../../../components/componentsNew/Header";
import {motion} from 'framer-motion'
import StatCard from '../../../../components/componentsNew/StatCard';
import { useEffect,useState } from 'react';
import { } from "../../../../hooks/useStats";
import { Zap, TrendingUp } from "lucide-react";
import { getBusinessNumber,GetReperesentNumber,useGetBusinesses} from "../../../../hooks/useStats";
import BusinessTable from '../../../../components/componentsNew/users/ProductsTable'

const MonEvent = () => {
    

  const [businessesNumb, setBusinessesNumb] = useState(0);
	const [representNumb, setRepresentNumb] = useState(0);
	const [businessList, setBusinessList] = useState([]);

	const [loading4, getBusinesses] = useGetBusinesses();
	const [loading, getBusinessNum] = getBusinessNumber();
	const [loading3, getReperesent] = GetReperesentNumber();
    
   

    useEffect(()=>{
        const setstat = async ()=>{
    
          setBusinessesNumb(await getBusinessNum());
          setRepresentNumb(await getReperesent());
			    setBusinessList(await getBusinesses());

        }
        setstat();
    
      },[])


  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Evenement"/>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20'>
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}>
          
        <StatCard name='Total des participant' icon={Zap} value={representNumb} color='#6366F1' />
        <StatCard name='Total des entreprises' icon={TrendingUp} value={businessesNumb} color='#EC4899' />

      </motion.div>

      <div >
        <BusinessTable Businesslist={businessList} admin={false}/>

      </div>
      </main>
    </div>
  )
}

export default MonEvent;