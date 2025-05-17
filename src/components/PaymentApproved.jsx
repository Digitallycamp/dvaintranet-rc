import { Clock } from 'lucide-react';
import React from 'react';

function PaymentApproved(props) {
	const {
		title,
		Duration: duration,
		'career path': careerPath,
		'skill level': skillLevel,
	} = props;

	return (
		<div className=' border border-zinc-100 rounded-lg  hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full '>
			<div className='flex-grow'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p className='text-zinc-500 text-sm'>({careerPath})</p>
			</div>
			<div className='flex justify-between items-center text-zinc-500'>
				<div className='flex space-x-2'>
					<Clock size={18} />
					<span className='text-xs'>Duration :{duration}</span>
				</div>
				<span>{skillLevel}</span>
			</div>
		</div>
	);
}

export default PaymentApproved;
