import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import NotifRow from "../NotifRow";

const NotifAffiche = ({notiflist,admin}) => {
	
    const [notifcontent,setnotifcontent] = useState(notiflist);

    useEffect(()=>{
        if(!admin){
            notiflist = notiflist.filter((notif)=>notif.target!='admin');
        }
        setnotifcontent(notiflist);
    },[notiflist])
	
    
	
	

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 max-h-[26rem]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6  '>
				<h2 className='text-xl font-semibold text-gray-100'>Notification</h2>
				
			</div>

			<div className=' h-4/5 overflow-auto'>
				
					

					<div>
						{notifcontent.map((product) => (
							
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
							<NotifRow title={product.title} content={product.content} date={product.date}/>
							</motion.tr>
						))}
					</div>
				
			</div>
		</motion.div>
	);
};
export default NotifAffiche;