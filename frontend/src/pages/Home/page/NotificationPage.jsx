import { motion } from "framer-motion";
import {  Package, TrendingUp } from "lucide-react";

import Header from "../../../components/componentsNew/Header";
import StatCard from "../../../components/componentsNew/StatCard";
import NotificationForm from "../../../components/componentsNew/notif/NotificationForm";
import NotifTable from "../../../components/componentsNew/notif/NotifTable";
import { useEffect ,useState} from "react";
import { useGetNotif } from "../../../hooks/useNotif";
import {getnotifnum,getnotifnumtoday} from "../../../hooks/useStats"


const NotificationPage = () => {
	const [notiflist, setNotiflist] = useState([]);
	const [notifnum,setnotifnum] = useState(0);
	const [notiftoday,setnotiftoday] = useState(0);


	const [loading, getNotif] = useGetNotif();
	const [loading2,getnotifnumero] = getnotifnum();
	const [loading3,getnotifnumtod] = getnotifnumtoday();


	useEffect(() => {
		const setstat = async () => {
			setNotiflist(await getNotif());
			setnotifnum(await getnotifnumero());
			setnotiftoday(await getnotifnumtod());
		}
		setstat();

	}, []);


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Notification' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 '
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Des Notification' icon={Package} value={notifnum.total_notif} color='#6366F1' />
					<StatCard name='Nouveau Notification' icon={TrendingUp} value={notiftoday.today_notif} color='#10B981' />
				</motion.div>
                
                <NotificationForm/>

				<NotifTable notiflist={notiflist} />

				
			</main>
		</div>
	);
};
export default NotificationPage;