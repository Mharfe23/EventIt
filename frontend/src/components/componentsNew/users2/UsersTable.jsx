import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../users/Modal";
import { Edit, Trash2} from "lucide-react";


const UsersTable = ({userData,admin}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(userData);
	const [selectedUser, setselectedUser] = useState(null);
	const [showEditModal, setshowEditModal] = useState(false);
	const [showDeleteModal,setshowDeleteModal] = useState(false);
	const [expandedDescriptions, setExpandedDescriptions] = useState({}); // Track which descriptions are expanded

	useEffect(()=>{
		setFilteredUsers(userData);
	},[userData])

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = userData.filter(
			(user) => user.fullname.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
		);
		setFilteredUsers(filtered);
	};

	const handleEditClick = (product) => {
		setselectedUser(product);
		setshowEditModal(true);
	};

	const handleDeleteClick = (product)=>{
		setselectedUser(product);
		setshowDeleteModal(true);
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setselectedUser((prevProduct) => ({
			...prevProduct,
			[name]: value
			
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const response = await fetch('/api/org/crud/updateRepresentative', {
				method: 'PUT', // Specify the request method as PUT
				headers: {
				  'Content-Type': 'application/json', // Set the content type to JSON
				},
				body: JSON.stringify(selectedUser)
			  });
			 
			  if (!response.ok) {
				throw new Error(response.error);
			  }

			  toast.success("Modifié avec succés");
			
			  setshowEditModal(false); // Close modal after submission
		} catch (error) {
			console.log(error);
			toast.error(error.message)
		}
}

		const handleDelete = async (e) =>{
			e.preventDefault();
			
			try {
				const response = await fetch('/api/org/crud/deleteRepresentative', {
					method: 'DELETE', // Specify the request method as PUT
					headers: {
					  'Content-Type': 'application/json', // Set the content type to JSON
					},
					body: JSON.stringify({"id":selectedUser.user_id})
				  });
				 
				  if (!response.ok) {
					throw new Error(response.message);
				  }
	
				  toast.success("Supprimé avec succés");
				
				  setshowDeleteModal(false); 
			} catch (error) {
				console.log(error);
				toast.error(error.message)
			}
				
		}
		const toggleDescription = (business_id) => {
			setExpandedDescriptions((prevState) => ({
			  ...prevState,
			  [business_id]: !prevState[business_id], // Toggle the expanded state
			}));
		  };

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 overflow-y-auto h-[75vh]'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Représentants</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Chercher un représentant...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Business 
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Info
							</th>
							
							{admin?<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>:null}
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((user) => (
							<motion.tr
								key={user.user_id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{user.name}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{user.fullname}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.business_name}</div>
									
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{user.email}</div>

								</td>

								
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300 cursor-pointer '
									onClick={() => toggleDescription(user.user_id)}
									 >
										{expandedDescriptions[user.user_id]
										? user.info
										:user.info.slice(0,20)+"..."}
										
										</div>
								</td>
								

								

								{admin?<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleEditClick(user)}>
										<Edit size={18} />
									</button>
									<button className='text-red-400 hover:text-red-300' onClick={()=> handleDeleteClick(user)}>
										<Trash2 size={18} />
									</button>
								</td>:null}
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
			<Modal show={showEditModal} onClose={() => setshowEditModal(false)} onSubmit={handleSubmit} >
				
				<h3 className="text-xl font-semibold mb-4 text-gray-600">Modifier le representant</h3>
				
				<form  className="grid md:grid-cols-2  gap-6">
					
						<div className="mb-4">
						<label className="block text-black">Name</label>
						<input
							type="text"
							name="fullname"
							value={selectedUser?.fullname || ""}
							onChange={handleInputChange}
							className="border rounded-lg px-3 py-2 w-full text-black"
						/>
						</div>
						
					<div>
						<div className="mb-4">
						<label className="block text-black">Info</label>
						<textarea
							
							name="info"
							value={selectedUser?.info|| ""}
							onChange={handleInputChange}
							className="border rounded-lg px-3 py-2 w-full text-black lg:h-28"
						/>
						</div>
					</div>
					
					
					
				</form>
			</Modal>
			<Modal show ={showDeleteModal} onClose={()=> setshowDeleteModal(false)} onSubmit={handleDelete}>
				<p className="text-xl text-black">Est-t-vous sure de vouloire Supprimer <span className="text-red-500 font-semibold"> Definitivement </span> ce compte?</p>
			</Modal>
		</motion.div>
	);
};
export default UsersTable;
