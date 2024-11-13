import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";


const NotifTable = ({notiflist}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterednotif, setFilterednotif] = useState(notiflist);
	
	useEffect(() =>{
		setFilterednotif(notiflist);
	},[notiflist]);


	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = notiflist.filter(
			(product) => product.title.toLowerCase().includes(term) || product.content.toLowerCase().includes(term)
		);

		setFilteredProducts(filtered);
	};

	
	
	

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 overflow-y-auto h-[80vh]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Notification Details</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Chercher une Notification...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Titre
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Message
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Cible
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
							
							
							
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{notiflist.map((product) => (
							
							<motion.tr
								key={product.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
									<img
										src='https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww'
										alt='Product img'
										className='size-10 rounded-full'
									/>
									{product.title}
								</td>

								<td className='px-8 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.content.length >40  ?product.content.slice(0,40)+"...":product.content}
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.target}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									{product.date.slice(0,10)}
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default NotifTable;