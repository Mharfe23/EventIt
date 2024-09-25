import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

import {GetReperesentNumberPerBusiness } from "../../../hooks/useStats";
import { useEffect,useState } from 'react';


const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const RepresperbusChart  = () => {

    const [repbybus,setrepbybus] = useState([]);
    const [loading,getrepbybus] = GetReperesentNumberPerBusiness();

    useEffect(()=>{
         const setstats = async ()=>{
            setrepbybus(await getrepbybus());
            console.log(repbybus);

         }
         setstats();
    },[])

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Representant par entreprise</h2>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={repbybus}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='business_name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"Représentant"} fill='#8884d8'>
							{repbybus.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};


export default RepresperbusChart