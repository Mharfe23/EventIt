import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../../../components/componentsNew/Header";

import StatCard from "../../../../components/componentsNew/StatCard";
import UsersTable from "../../../../components/componentsNew/users2/UsersTable";
import UserGrowthChart from "../../../../components/componentsNew/users2/UserGrowthChart";
import UserActivityHeatmap from "../../../../components/componentsNew/users2/UserActivityHeatmap";
import UserDemographicsChart from "../../../../components/componentsNew/users2/UserDemographicsChart";
import { useState } from "react";
import { useEffect } from "react";
import {GetReperesentNumber, GetReperesentToday,useGetReperesent} from "../../../../hooks/useStats";


const UsersPageInv = () => {
	const [usernumber,setusernumber] = useState(0);
	const [users,setusers] = useState([]);

	const [loading, getuserNumber] = GetReperesentNumber();
	const [loading3,getusers] = useGetReperesent();

	useEffect(() => {

		const setStat = async ()=>{
			setusernumber(await getuserNumber());
			setusers(await getusers());
		}
		
		setStat();
	},[])

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Users' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Users'
						icon={UsersIcon}
						value={usernumber}
						color='#6366F1'
					/>
					
				</motion.div>

				<UsersTable userData={users} admin={false}/>

				{/* USER CHARTS */}
				
			</main>
		</div>
	);
};
export default UsersPageInv;
