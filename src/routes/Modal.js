import { X } from 'lucide-react';
import React from 'react';

/***@param children Wrap the Modal compoent arround any JSX elements to create a modal */
function Modal({ handleModalClick, title = '', children }) {
	return (
		<div className=' py-8 w-full h-full flex flex-col justify-center items-center transition-all fixed left-1/2 -translate-x-1/2  top-0 z-50 bg-black/30'>
			<div className='modal-content bg-white p-6 rounded-md h-fit w-full max-w-[512px]  overflow-y-auto '>
				<div className='flex justify-between'>
					<h1 className='font-bold text-2xl'>{title}</h1>
					<X size={24} className=' cursor-pointer' onClick={handleModalClick} />
				</div>
				{children}
			</div>
		</div>
	);
}

export default Modal;
