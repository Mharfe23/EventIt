import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect,useState } from 'react';
import {GetDailyBusSignups } from "../../../hooks/useStats";


const SalesTrendChart = () => {
	const [bussingups,setbussignups] = useState([]);
	const [loading,getbussignup] = GetDailyBusSignups();

	useEffect(()=>{

		const setstats = async ()=>{
			setbussignups(await getbussignup());
		}

		setstats();

	},[])

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Entreprise Inscrit</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={bussingups}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='count' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesTrendChart;