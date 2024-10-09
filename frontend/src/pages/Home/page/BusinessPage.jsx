import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

import Header from "../../../components/componentsNew/Header";
import StatCard from "../../../components/componentsNew/StatCard";
import BusinessTable from "../../../components/componentsNew/users/ProductsTable";
import SalesTrendChart from "../../../components/componentsNew/users/SalesTrendChart";
import CategoryDistributionChart from "../../../components/componentsNew/overview/CategoryDistributionChart";
import RepresperbusChart  from "../../../components/componentsNew/business/RepresperbusChart";

import { useEffect ,useState} from "react";
import { getBusinessNumber,GetReperesentNumberPerBusiness,useGetBusinesses  } from "../../../hooks/useStats";

const BusinessPage = () => {
	const [businessesNumb, setBusinessesNumb] = useState(0);
	const [representNumb, setRepresentNumb] = useState(0);
	const [businessList, setBusinessList] = useState([]);
	const [loading, getBusinessNum] = getBusinessNumber();
	const [loading2, getReperesent] = GetReperesentNumberPerBusiness();
	const [loading3, getBusinesses] = useGetBusinesses();


	useEffect(() => {
		const setstat = async () => {
			const tempmaxrep = await getReperesent();
			
			const maxRepresentantObject = tempmaxrep.reduce((maxObj, currentObj) => {
				return (currentObj.Représentant > maxObj.Représentant) ? currentObj : maxObj;
			}, tempmaxrep[0]);

			setRepresentNumb(maxRepresentantObject?.Représentant||0);
			setBusinessesNumb(await getBusinessNum());

			setBusinessList(await getBusinesses());
		}
		setstat();
		
		
	}, [ ]);
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Business' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 '
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total des entreprises' icon={Package} value={businessesNumb} color='#6366F1' />
					<StatCard name='Top representant' icon={TrendingUp} value={representNumb} color='#10B981' />
				</motion.div>

				<BusinessTable Businesslist={businessList} admin={true}/>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
					<RepresperbusChart />
				</div>
				
			</main>
		</div>
	);
};
export default BusinessPage;