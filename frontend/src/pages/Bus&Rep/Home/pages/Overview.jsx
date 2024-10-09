import React from 'react'
import Header from "../../../../components/componentsNew/Header";
import {motion} from 'framer-motion'
import StatCard from '../../../../components/componentsNew/StatCard';
import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react'
import { useEffect,useState } from 'react';
import { getBusinessNumber,GetReperesentNumber} from "../../../../hooks/useStats";
import CategoryDistributionChart from '../../../../components/componentsNew/overview/CategoryDistributionChart'
import NotifAffiche from '../../../../components/componentsNew/notif/NotifAffiche';
import { useGetNotif } from "../../../../hooks/useNotif";
import { useAuthContext } from '../../../../Context/AuthContext';
const Overview = () => {
    const [businessesNumb, setBusinessesNumb] = useState(0);
	const [representNumb, setRepresentNumb] = useState(0);
	const [notiflist, setNotiflist] = useState([]);
	const [loading2, getNotif] = useGetNotif();

	const [loading, getBusinessNum] = getBusinessNumber();
	const [loading3, getReperesent] = GetReperesentNumber();
    
    const {authUser} = useAuthContext();
    const admin = !authUser.user_id;


    useEffect(()=>{
        const setstat = async ()=>{
    
			setNotiflist(await getNotif());
          setBusinessesNumb(await getBusinessNum());
          setRepresentNumb(await getReperesent());
        }
        setstat();
    
      },[])



  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Overview"/>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20'>
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}>
          
        <StatCard name='Total des participant' icon={Zap} value={representNumb} color='#6366F1' />
        <StatCard name='Total des entreprises' icon={ShoppingBag} value={businessesNumb} color='#EC4899' />

      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
        <NotifAffiche notiflist={notiflist} admin={admin}/>
        <CategoryDistributionChart />
      </div>
      </main>
    </div>
  )
}

export default Overview;