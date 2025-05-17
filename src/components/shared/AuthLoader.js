import { motion } from 'motion/react';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function AuthLoader() {
	return (
		<div className='h-screen flex items-center justify-center bg-gray-100'>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col items-center justify-center gap-4'
			>
				<ThreeDots
					visible={true}
					height='80'
					width='80'
					color='#1d1d1d'
					radius='9'
					ariaLabel='three-dots-loading'
					wrapperStyle={{}}
					wrapperClass=''
				/>
			</motion.div>
			{/* <motion.div
				className='flex gap-2'
				animate={{ scale: [1, 1.5, 1] }}
				transition={{
					repeat: Infinity,
					duration: 0.8,
					ease: 'easeInOut',
				}}
			>
				{[...Array(3)].map((_, index) => (
					<motion.div
						key={index}
						className='w-4 h-4 bg-blue-500 rounded-full'
						animate={{
							y: [0, -10, 0],
						}}
						transition={{
							repeat: Infinity,
							duration: 0.6,
							delay: index * 0.2,
							ease: 'easeInOut',
						}}
					/>
				))}
			</motion.div> */}
		</div>
	);
}

export default AuthLoader;
