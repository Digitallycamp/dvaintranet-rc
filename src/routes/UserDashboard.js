import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAppSettings } from '../hooks/useAppSettings';
import { content } from '../utils/launchpad';
import ReactPlayer from 'react-player';

const dashboardOverview = content.find(
	(val) => val.title === 'Dashboard Overview'
);

function UserDashboard() {
	const { appDocData, loading } = useAppSettings();
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user && !user.hasCompletedOnboarding) {
			navigate('/onboarding');
		}
	}, [user, navigate]);

	if (!user) {
		return (
			<div className='h-screen flex justify-center items-cente'>
				<span>Loading user data...</span>
			</div>
		); // Loading indicator
	}
	if (loading) {
		return <p>Loading app data</p>;
	}
	return (
		<div>
			<div className=' w-full space-y-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-10 rounded-2xl shadow-xl'>
				<div className=' md:flex md:items-center space-x-6'>
					<div className='flex flex-col  space-y-1 bg-blue-600 rounded-lg p-6'>
						<span>Current Batch</span>
						<strong className='text-2xl uppercase'>
							{appDocData.currentBatch}
						</strong>
					</div>
					<div className='mt-6'>
						<h1 className='text-white font-bold text-2xl'>
							<span>Welcome,</span>
							<span className=' font-bold capitalize'>{user?.fullname}</span>
						</h1>
						<span className='text-lg text-white'>
							STUDENT ID: {user.studentID}
						</span>
					</div>
				</div>
				<div className='mt-6 space-y-2'>
					<span className=' uppercase text-xs text-white'>your progress</span>
					<div className='h-2 bg-white rounded-md'>
						<div className='bg-green-700 rounded-md h-2 w-1/12'></div>
					</div>
				</div>
			</div>
			<div>
				<h3 className='text-2xl font-semibold text-gray-800 mt-10 '>
					Dashboard Overview
				</h3>
				<p className='mb-6'>
					Learn how the dashboard work and how to navigate your way through.
				</p>
				<div className='w-full bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg'>
					<div className=' aspect-video'>
						<ReactPlayer
							width='100%'
							height='100%'
							url={dashboardOverview.link}
							controls
						/>
					</div>
				</div>
			</div>
			<div className='pt-10'>
				<h3 className='text-2xl font-semibold text-gray-800 mt-10 '>
					AI career and course personalized recommendation.
				</h3>
				<p>Coming soon</p>
			</div>
		</div>
	);
}

export default UserDashboard;
