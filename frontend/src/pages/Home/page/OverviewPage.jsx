import React from 'react'
import Header from "../../../components/componentsNew/Header";

import {motion} from 'framer-motion'
import StatCard from '../../../components/componentsNew/StatCard'
import SalesOverviewChart from '../../../components/componentsNew/overview/SalesOverviewChart'
import CategoryDistributionChart from '../../../components/componentsNew/overview/CategoryDistributionChart'
import SalesChannelChart from '../../../components/componentsNew/overview/SalesChannelChart'
import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react'
const OverviewPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Overview"/>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20'>
      <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}>
          
        <StatCard name='Total des participant' icon={Zap} value='12,345' color='#6366F1' />
        <StatCard name='Nouveau participant' icon={Users} value='1,234' color='#8B5CF6' />
        <StatCard name='Total des entreprises' icon={ShoppingBag} value='567' color='#EC4899' />
        <StatCard name='Nouveau entreprise' icon={BarChart2} value='12' color='#10B981' />

      </motion.div>
      
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
      </main>
    </div>
  )
}

export default OverviewPage