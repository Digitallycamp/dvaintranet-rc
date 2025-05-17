import React, { useEffect, useState } from 'react';
import { getAssessmentByUser } from '../utils/course';
import { useAuth } from '../context/AuthContext';

function Assessments() {
	const [submittedAssessments, setSubmittedAssessments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		// Fetch submitted assessments by the user
		const fetchAssessments = async () => {
			try {
				setLoading(true);
				const assessments = await getAssessmentByUser(user.userId);
				setSubmittedAssessments(assessments);
			} catch (err) {
				setError('Failed to fetch assessments. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		fetchAssessments();
	}, [user.userId]);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>My Submitted Assessments</h1>

			{/* Handle loading state */}
			{loading && <p>Loading assessments...</p>}

			{/* Handle error state */}
			{error && <p className='text-red-500'>{error}</p>}

			{/* Display assessments */}
			{!loading && !error && submittedAssessments.length === 0 && (
				<p>No assessments have been submitted yet.</p>
			)}

			{/* Render assessments */}
			<div className='space-y-4'>
				{submittedAssessments.map((assessment) => (
					<div
						key={assessment.id}
						className='p-4 border rounded-md shadow-sm bg-white w-full max-w-[768px]'
					>
						<h2 className='text-lg font-bold'>{assessment.lesson_title}</h2>
						<h3>Assessment ID: {assessment.id}</h3>
						<p className='text-sm text-gray-600'>
							Submitted On:
							{new Date(assessment?.createdAt.seconds * 1000).toLocaleString(
								'en-GB',
								{
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
								}
							)}
						</p>
						<p className='mt-2'>
							Details:{' '}
							<a
								target='_blank'
								rel='noreferrer'
								href={assessment.assessment}
								className='text-blue-600'
							>
								{assessment.assessment || 'No Details'}
							</a>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Assessments;
