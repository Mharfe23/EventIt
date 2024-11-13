import React from 'react'
import Header from "../../../components/componentsNew/Header";

import {motion} from 'framer-motion'
import StatCard from '../../../components/componentsNew/StatCard'
import UserGrowthChart from "../../../components/componentsNew/users2/UserGrowthChart";

import CategoryDistributionChart from '../../../components/componentsNew/overview/CategoryDistributionChart'
import SalesChannelChart from '../../../components/componentsNew/overview/SalesChannelChart'
import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react'
import { useEffect,useState } from 'react';
import { getBusinessNumber,GetBusinessToday,GetReperesentNumber ,GetReperesentToday } from "../../../hooks/useStats";



const OverviewPage = () => {
	const [businessesNumb, setBusinessesNumb] = useState(0);
  const [businessToday,setBusinessToday] = useState(0);
	const [representNumb, setRepresentNumb] = useState(0);
  const [representToday,setRepresentToday] = useState(0);

	const [loading, getBusinessNum] = getBusinessNumber();
	const [loading2, getBusinessTod] = GetBusinessToday();
	const [loading3, getReperesent] = GetReperesentNumber();
  const [loading4,getrepToday] = GetReperesentToday();




  useEffect(()=>{
    const setstat = async ()=>{

      setBusinessesNumb(await getBusinessNum());
      setBusinessToday(await getBusinessTod());
      setRepresentNumb(await getReperesent());
      setRepresentToday(await getrepToday());
    }
    setstat();

  },[])


  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Apercu"/>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20'>
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}>
          
        <StatCard name='Total des participant' icon={Zap} value={representNumb} color='#6366F1' />
        <StatCard name='Nouveau participant' icon={Users} value={representToday} color='#8B5CF6' />
        <StatCard name='Total des entreprises' icon={ShoppingBag} value={businessesNumb} color='#EC4899' />
        <StatCard name='Nouveau entreprise' icon={BarChart2} value={businessToday} color='#10B981' />

      </motion.div>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <UserGrowthChart />

					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
      </main>
    </div>
  )
}

export default OverviewPage