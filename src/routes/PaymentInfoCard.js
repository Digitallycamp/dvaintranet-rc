import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useAppSettings } from '../hooks/useAppSettings';

function PaymentInfoCard({
	handleClick,
	handleCourseRegistration,
	isSubmitting,
	courseTitle,
	careerPath,
}) {
	const { appDocData, loading } = useAppSettings();
	if (loading) {
		return <p className='text-center'>Loading...</p>;
	}
	return (
		<>
			{appDocData.currentBatch === 'none' ? (
				<p className='text-center text-red-700'>
					No ongoing live classes,{' '}
					<a
						className='text-blue-800'
						href='https://chat.whatsapp.com/LV9wATBQ25o689CgsiDfLx'
						rel='noreferrer'
						target='_blank'
					>
						Join community
					</a>{' '}
					for more info
				</p>
			) : (
				<div className=' rounded-lg max-w-[512px] h-fit space-y-3 '>
					{/* <div className='flex justify-end'>
				<button onClick={handleClick}>
					<X />
				</button>
			</div> */}
					<div>
						<h1 className='text-zinc-800 text-2xl font-semibold'>
							{courseTitle}
						</h1>
						<p className='text-zinc-700'>({careerPath})</p>
					</div>
					<div>
						<h3>Pay to:</h3>

						<div className='space-x-3'>
							<strong>Account Name:</strong>
							<small className='uppercase'>Onyearizo Chimezie Wisdom</small>
						</div>
						<div className='space-x-3'>
							<strong>Account Number:</strong>
							<small>0773489215</small>
						</div>
						<div className='space-x-3'>
							<strong>Bank:</strong>
							<small>Access Bank</small>
						</div>
					</div>
					<p className='text-sm'>
						After payment click on 'I have made payment' button bellow
					</p>
					<div>
						<button
							className='order-2 sm:order-none bg-zinc-900 text-zinc-300 font-semibold px-8 py-2 rounded-md mt-auto'
							onClick={handleCourseRegistration}
						>
							{isSubmitting ? (
								<Oval width={24} height={24} />
							) : (
								'I have made payment'
							)}
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default PaymentInfoCard;
