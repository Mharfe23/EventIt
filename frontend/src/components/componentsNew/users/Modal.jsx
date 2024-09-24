
import React from 'react';
const Modal = ({ show, onClose, children ,onSubmit}) => {
	if (!show) return null;
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
			<div className="bg-white rounded-lg p-6 w-3/4">
				{children}
				<button
					onClick={onClose}
					className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
				>
					Close
				</button>
				<button onClick={onSubmit}
				className="mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg  ">
					Submit
				</button>
			</div>
		</div>
	);
};

export default Modal;