import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../../components/componentsNew/Header";

import StatCard from "../../../components/componentsNew/StatCard";
import UsersTable from "../../../components/componentsNew/users2/UsersTable";
import UserGrowthChart from "../../../components/componentsNew/users2/UserGrowthChart";
import UserActivityHeatmap from "../../../components/componentsNew/users2/UserActivityHeatmap";
import UserDemographicsChart from "../../../components/componentsNew/users2/UserDemographicsChart";
import { useState } from "react";
import { useEffect } from "react";
import {GetReperesentNumber, GetReperesentToday,useGetReperesent} from "../../../hooks/useStats";


const UsersPage = () => {
	const [usernumber,setusernumber] = useState(0);
	const [usernumberToday,setusernumberToday] = useState(0);
	const [users,setusers] = useState([]);

	const [loading, getuserNumber] = GetReperesentNumber();
	const [loading2, getuserNumberToday] = GetReperesentToday();
	const [loading3,getusers] = useGetReperesent();

	useEffect(() => {

		const setStat = async ()=>{
			setusernumber(await getuserNumber());
			setusernumberToday(await getuserNumberToday());
			setusers(await getusers());
		}
		
		setStat();
	},[])

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Représentants' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Des Représentants'
						icon={UsersIcon}
						value={usernumber}
						color='#6366F1'
					/>
					<StatCard name='Nouveau Représentant' icon={UserPlus} value={usernumberToday} color='#10B981' />
					
				</motion.div>

				<UsersTable userData={users} admin={true}/>

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div>
			</main>
		</div>
	);
};
export default UsersPage;
