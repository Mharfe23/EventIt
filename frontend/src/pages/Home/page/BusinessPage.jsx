import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

import Header from "../../../components/componentsNew/Header";
import StatCard from "../../../components/componentsNew/StatCard";
import ProductsTable from "../../../components/componentsNew/users/ProductsTable";
import SalesTrendChart from "../../../components/componentsNew/users/SalesTrendChart";
import CategoryDistributionChart from "../../../components/componentsNew/overview/CategoryDistributionChart";



const BusinessPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Products' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 '
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Business' icon={Package} value={1234} color='#6366F1' />
					<StatCard name='Top representant' icon={TrendingUp} value={89} color='#10B981' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};
export default BusinessPage;