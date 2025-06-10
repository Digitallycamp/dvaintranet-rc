import { Play } from 'lucide-react';
import ReactPlayer from 'react-player/youtube';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
	studentMarkLessonAsCompleted,
	studentSubmitAssessment,
} from '../utils/course';
import { useAuth } from '../context/AuthContext';
import { Oval } from 'react-loader-spinner';

function CourseLessons() {
	const [searchParams] = useSearchParams();
	const mockId = searchParams.get('msockid'); // Retrieve the mockId from URL

	const location = useLocation();

	const [showLeson, setShowLesson] = useState(false);

	const [assessment, setAssessment] = useState('');
	const [isSubmitting, setIssubmitting] = useState(false);
	const { user } = useAuth();
	console.log('showlesson', showLeson);
	const { state } = location;
	const courseLesson = state?.lessons.filter(
		(myless) => myless.courseID === mockId
	);

	const sortedCourse = courseLesson.sort((a, b) => {
		const timeA = a.createdAt.seconds * 1e9 + a.createdAt.nanoseconds;
		const timeB = b.createdAt.seconds * 1e9 + b.createdAt.nanoseconds;
		return timeA - timeB;
	});

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
		const activeLesson = sortedCourse.find((less) => less.id === lessonId);

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

	if (courseLesson.length === 0) {
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
					{<h3>Batch: {courseLesson[0]?.batchID}</h3>}
					<hr className='border-b border-b-zinc-800' />
					<div>
						{/* // dynamic */}

						<div>
							<div className='flex items-center  justify-between '>
								<strong>Lessons</strong>
							</div>
							<hr className='border-b border-b-zinc-200' />
							<ul className='space-y-3 mt-2'>
								{courseLesson.map((lesson) => {
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
											<div className='p-2 rounded-full bg-slate-400'>
												<Play size={12} color='#fff' />
											</div>
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
						<div
							style={{
								backgroundImage: "url('/videobg.png')",
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
							}}
							className=' bg-zinc-800 p-4 rounded-lg w-full max-w-[640px] h-[360px]'
						>
							{showLeson &&
								showLeson?.videoURL.map((vid, index) => {
									const checkVid = !vid
										? `${courseLesson[0]?.videoURL[0]}`
										: vid;

									return (
										<ReactPlayer
											url={`${checkVid}`}
											controls
											width='100%'
											height='100%'
											style={{ borderRadius: '8px' }}
										/>
									);
								})}
						</div>
						{showLeson && (
							<div className='pt-8'>
								<h3 className='text-lg font-semibold '>Assessment</h3>
								<p>{showLeson?.assessment?.assessment}</p>
								<div className='space-y-1'>
									<form className='w-full ' onSubmit={handleSubmitAccessment}>
										<label className='text-xs'>Submit Assessment</label>
										<br />
										<div className='flex'>
											<input
												name='assessment'
												value={assessment}
												onChange={(e) => setAssessment(e.target.value)}
												required
												type='url'
												placeholder='Paste your link here'
												className='font-semibold px-3 py-2 w-full mt-auto rounded-tl-md rounded-bl-md outline-0 border outline-none'
											/>
											<button
												type='submit'
												className=' block bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-tr-md rounded-br-md mt-auto cursor-pointer'
											>
												{isSubmitting ? (
													<Oval width={24} height={24} />
												) : (
													'Submit'
												)}
											</button>
										</div>
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

								<h3 className='text-lg mt-10 font-semibold'>Resources</h3>
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
							</div>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}

export default CourseLessons;
