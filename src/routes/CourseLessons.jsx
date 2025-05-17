import { Play } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	studentMarkLessonAsCompleted,
	studentSubmitAssessment,
} from '../utils/course';
import { useAuth } from '../context/AuthContext';
import { Oval } from 'react-loader-spinner';

function CourseLessons() {
	const location = useLocation();

	const [showLeson, setShowLesson] = useState(false);

	const [assessment, setAssessment] = useState('');
	const [isSubmitting, setIssubmitting] = useState(false);
	const { user } = useAuth();
	console.log('showlesson', showLeson);
	const { state } = location;

	const handleMarkLessonAsCompleted = async (id) => {
		/* Calculate the toggled state
        React updates the state asynchronously, so the value of completedLesson being passed to studentMarkLessonAsCompleted is not the latest toggled value when you do setCompletedLesson(!completedLesson). rather do this way to get latest toggled value */
		const newCompletedValue = !showLeson?.completed;
		// Pass the calculated value
		await studentMarkLessonAsCompleted(id, newCompletedValue);
		// Update the local state to reflect the database
		setShowLesson((prevLesson) => ({
			...prevLesson,
			completed: newCompletedValue,
		}));
	};

	const handleLesson = (lessonId) => {
		const activeLesson = state.lessons.find((less) => less.id === lessonId);

		setShowLesson(activeLesson);
	};
	if (!state) {
		return <p>No course data available.</p>;
	}
	// if (!showLeson) {
	// 	return <p>Loading...</p>;
	// }

	const handleSubmitAccessment = async (event) => {
		event.preventDefault();
		const assessmentData = {
			assessment,
			courseID: showLeson.courseID,
			lessonID: showLeson.id,
			lesson_title: showLeson.title,
			userId: user.userId,
			createdAt: Timestamp.now(),
			marked: false,
		};

		try {
			setIssubmitting(true);
			await studentSubmitAssessment(assessmentData);
		} catch (error) {
			console.log(error);
		} finally {
			setIssubmitting(false);
			setAssessment('');
		}
	};

	if (state.lessons.length === 0) {
		return <p className='text-center'>No lesson posted by Intructor!</p>;
	}

	return (
		<div>
			<header>
				{/* <div className=' border border-zinc-400 bg-zinc-50 px-3 py-2 rounded-lg w-1/4'>
					<select className='border-0 bg-zinc-50 w-full'>
						<option value='batcha'>Batch A</option>
						<option value='batchb'>Batch B</option>
					</select>
				</div> */}
			</header>
			<main className=' flex flex-col lg:flex lg:flex-row gap-6 mt-10 '>
				<aside className='  lg:w-1/4 bg-zinc-50 p-6 rounded-lg space-y-2 order-2 lg:order-1 overflow-y-auto'>
					{<h3>Batch: {state.lessons[0]?.batchID}</h3>}
					<hr className='border-b border-b-zinc-800' />
					<div>
						{/* // dynamic */}

						<div>
							<div className='flex items-center  justify-between '>
								<strong>Lessons</strong>
							</div>
							<hr className='border-b border-b-zinc-200' />
							<ul className='space-y-3 mt-2'>
								{state.lessons.map((lesson) => {
									console.log(lesson);
									return (
										<li
											onClick={() => handleLesson(lesson.id)}
											className={`flex justify-between items-center space-x-2 cursor-pointer ${
												showLeson.id === lesson.id
													? 'text-slate-900'
													: 'text-zinc-600 '
											}`}
										>
											{lesson.title}
											<Play size={12} />
										</li>
									);
								})}
							</ul>
						</div>
						{/* // dynamic */}
					</div>
				</aside>
				<section className=' w-full lg:w-[75%] bg-zinc-50 p-6 rounded-lg  order-1 lg:order-2'>
					<div className='space-y-4'>
						<h3> {showLeson?.title}</h3>
						<div className='bg-zinc-800 p-4 rounded-lg w-full max-w-[560px] h-[315px]'>
							{showLeson &&
								showLeson?.videoURL.map((vid, index) => {
									const checkVid = !vid
										? `${state.lessons[0]?.videoURL[0]}`
										: vid;

									return (
										<iframe
											key={index}
											title={showLeson?.title}
											className='w-full h-full'
											src={`${checkVid}`}
											// width='560'
											// height='315'

											allow='autoplay; encrypted-media'
											allowFullScreen
										></iframe>
									);
								})}
							{/* <iframe
								className='w-full h-full'
								src={`${lessons.videoUrl}`}
								// width='560'
								// height='315'
								allow='autoplay'
							></iframe> */}
							{/* <iframe
								className='w-full h-full'
								src='https://drive.google.com/file/d/18B_nHQP0kDSBIt2SXqhWY6hmrbmq7f72/preview'
								// width='560'
								// height='315'
								allow='autoplay'
							></iframe> */}
						</div>
						{showLeson && (
							<div>
								<h3 className='2xl font-semibold'>Assessment</h3>
								<div className='space-y-4'>
									<p>{showLeson?.assessment?.question1}</p>
									<h3 className='2xl font-semibold'>Resources</h3>
									<ul>
										{showLeson?.resources.map((resource, index) => {
											return (
												<li key={index} className='space-x-2'>
													<span>{index + 1}.</span>
													<a href={`${resource}`} className='text-blue-500'>
														{resource}
													</a>
												</li>
											);
										})}
									</ul>
									<form className=' my-10' onSubmit={handleSubmitAccessment}>
										<label className='text-xs'>Submit Assessment</label>
										<br />
										<input
											name='assessment'
											value={assessment}
											onChange={(e) => setAssessment(e.target.value)}
											required
											type='url'
											placeholder='Paste your link here'
											className='font-semibold px-3 py-2 w-1/2 mt-auto rounded-tl-md rounded-bl-md outline-0 border outline-none'
										/>
										<button
											type='submit'
											className=' bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-tr-md rounded-br-md mt-auto cursor-pointer'
										>
											{isSubmitting ? (
												<Oval width={24} height={24} />
											) : (
												'Submit'
											)}
										</button>
									</form>
									{user.role === 'admin' && (
										<button
											onClick={() => handleMarkLessonAsCompleted(showLeson?.id)}
											className={`${
												showLeson.completed
													? 'bg-green-400 text-zinc-900 font-bold'
													: 'bg-zinc-900'
											} text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto cursor-pointer`}
										>
											{showLeson.completed ? 'Completed' : 'Mark Completed'}
										</button>
									)}
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}

export default CourseLessons;
