import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { UseGetCategory } from "../../../hooks/useStats";
import { useState } from "react";
import { useEffect } from "react";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
	const [category,setcategory] = useState([]);
	const [loading,getcategory] = UseGetCategory();

	useEffect(()=>{

		const setstats= async ()=>{
			setcategory(await getcategory());
		}
		setstats();

	},[])

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 max-h-[26rem]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Répartition Des Catégories</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={category}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='nbr'
							nameKey='business_category'
							label={({ business_category, percent }) => `${business_category} ${(percent * 100).toFixed(0)}%`}
						>
							{category.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CategoryDistributionChart;