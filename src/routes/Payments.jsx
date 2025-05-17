import React, { useEffect, useState } from 'react';

import { Oval } from 'react-loader-spinner';

import { showOnlyUserApprovedCourse } from '../utils/user';
import { useAuth } from '../context/AuthContext';

import PaymentApproved from '../components/PaymentApproved';
import { useAppSettings } from '../hooks/useAppSettings';

function Payments() {
	const { appDocData, loading: appLoading } = useAppSettings();
	const [selectedBatch, setSelectedBatch] = useState(''); // Default selected batch
	const [approvedCourses, setApprovedCourses] = useState([]); // Approved courses for the selected batch
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null); // Error state
	const { user } = useAuth();

	useEffect(() => {
		if (!selectedBatch && appDocData?.currentBatch) {
			setSelectedBatch(appDocData.currentBatch);
		}
	}, [appDocData]);
	// Fetch the user's data and filter approved courses
	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			setError(null);
			try {
				if (!user || !user.userId) {
					throw new Error('User object is not available');
				}
				const result = await showOnlyUserApprovedCourse(
					user.userId,
					selectedBatch,
					setApprovedCourses,
					setLessons
				);
				if (!result) {
					setApprovedCourses([]);
					setLessons([]);
					return;
				}
				const { approvedCourses, lessonsForApprovedCourses } = result;
				// Set the approved courses
				setApprovedCourses(approvedCourses);
				setLessons(lessonsForApprovedCourses);
			} catch (error) {
				setError('Failed to fetch courses. Please try again.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		// Fetch data when `selectedBatch` changes
		if (selectedBatch) {
			fetchUserData();
		}

		// fetchUserData();
	}, [selectedBatch, user]); // Re-run when the selected batch changes

	// Handle batch selection
	const handleBatchChange = (e) => {
		setSelectedBatch(e.target.value);
	};

	if (appLoading) {
		return <p>Loading app Data</p>;
	}
	if (loading) {
		return <Oval width={24} height={24} />;
	}

	if (error) {
		return <p className='text-red-500'>{error}</p>;
	}

	console.log(selectedBatch);
	return (
		<div className='space-y-6'>
			<h1 className='text-2xl text-zinc-900'>
				My Approved Confirmed Payment(s)
			</h1>
			<select
				value={selectedBatch}
				onChange={handleBatchChange}
				className='border cursor-pointer border-slate-600 px-4 h-10 rounded-lg focus:outline-0 focus:outline-slate-800'
			>
				<option>--Select Batch--</option>
				{user?.batches &&
					Object.keys(user.batches).map((key, index) => (
						<option key={index} value={key}>
							{key}
						</option>
					))}
			</select>
			<div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
				{approvedCourses?.length > 0 ? (
					approvedCourses?.map((course) => (
						<PaymentApproved key={course.id} {...course} />
					))
				) : (
					<p>No approved payment for this batch.</p>
				)}
			</div>
		</div>
	);
}

export default Payments;
