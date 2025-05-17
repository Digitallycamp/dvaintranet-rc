import React, { useEffect, useState } from 'react';

import { showOnlyUserApprovedCourse } from '../utils/user';
import { useAuth } from '../context/AuthContext';
import RegisteredCourseCard from '../components/users/RegisteredCourseCard';
import { useAppSettings } from '../hooks/useAppSettings';

function MyCourses() {
	const { appDocData, loading: appLoading } = useAppSettings();
	const [selectedBatch, setSelectedBatch] = useState(''); // Default selected batch
	const [approvedCourses, setApprovedCourses] = useState([]); // Approved courses for the selected batch
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null); // Error state
	const { user } = useAuth();
	// Synchronize `selectedBatch` with `appDocData.currentBatch`
	useEffect(() => {
		if (appDocData?.currentBatch) {
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

	// Initialize the first batch only when the component mounts
	// useEffect(() => {
	// 	if (user?.batches && !selectedBatch) {
	// 		const firstBatch = Object.keys(user.batches)[0]; // Get the first key
	// 		if (firstBatch) {
	// 			setSelectedBatch(firstBatch);
	// 		}
	// 	}
	// }, [user, selectedBatch]); // Only run when `user` changes

	if (appLoading) {
		return <p>Loading batch data..</p>;
	}
	if (loading) {
		return <p>Loading courses...</p>;
	}

	if (error) {
		return <p className='text-red-500'>{error}</p>;
	}

	console.log('MY REG BATCHES', selectedBatch);
	return (
		<div className='space-y-6'>
			<h1>My Courses</h1>
			<select
				value={selectedBatch}
				onChange={handleBatchChange}
				className='border cursor-pointer border-slate-600 px-4 h-10 rounded-lg focus:outline-0 focus:outline-slate-800'
			>
				{/* // GET ONLY USER REGISTERED BATCH */}
				<option>--Select Batch--</option>
				{Object.keys(user.batches).map((key, index) => (
					<option key={index} value={key}>
						{key}
					</option>
				))}
			</select>
			<div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
				{approvedCourses?.length > 0 ? (
					approvedCourses?.map((course) => (
						<RegisteredCourseCard
							key={course.id}
							{...course}
							lessons={lessons}
						/>
					))
				) : (
					<p>No approved courses for this batch.</p>
				)}
			</div>
		</div>
	);
}

export default MyCourses;
