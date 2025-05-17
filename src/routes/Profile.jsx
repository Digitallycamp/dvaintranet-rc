import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import avatar from '../assets/avater.PNG';
function Profile() {
	const { user } = useAuth();
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	useEffect(() => {
		if (user) {
			// Get user's IP address and then their location
			fetch(
				'https://api.ipgeolocation.io/ipgeo?apiKey=eda4651de09a41da8506cf4f09498b37'
			)
				.then((response) => response.json())
				.then((data) => {
					setLocation({
						city: data.city,
						country: data.country_name,
					});
				})
				.catch((error) => console.error('Error getting location: ', error));
		}
	}, [user]);
	return (
		<div className='bg-white p-6 rounded-lg shadow-md max-w-[512px] mx-auto'>
			<h1 className='text-3xl font-bold mb-6'>My Profile</h1>
			<div className='flex items-center space-x-4 mb-6'>
				<img
					src={avatar}
					alt={user.fullname}
					className='w-16 h-16 rounded-full border'
				/>
				<div>
					<h2 className='text-lg font-semibold'>
						{user.fullname || 'No Name Available'}
					</h2>
					<p className='text-sm text-gray-600'>{user.email || 'No Email'}</p>
				</div>
			</div>
			<div className='space-y-4'>
				<div className='text-sm'>
					<h3 className='font-bold'>Student ID:</h3>
					<p className='text-gray-600'>{user.studentID || 'N/A'}</p>
				</div>
				<div className='text-sm'>
					<h3 className='font-bold'>Whatsapp Number:</h3>
					<p className='text-gray-600'>{user.whatsapp_no || 'N/A'}</p>
				</div>
				<div className='text-sm'>
					<h3 className='font-bold'>Location:</h3>
					<p className='text-gray-600'>Country: {location.country || 'N/A'}</p>
				</div>
				<div className='text-sm'>
					<h3 className='font-bold'>Application Reason:</h3>
					<p className='text-gray-600'>
						{user.applicationReason || 'No Reason Provided'}
					</p>
				</div>
				<div className='text-sm'>
					<h3 className='font-bold'>Registered Date:</h3>
					<p className='text-gray-600'>
						{new Date(user.registeredDate.toDate()).toLocaleString('en-GB', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit',
						}) || 'N/A'}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Profile;
