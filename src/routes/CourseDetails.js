import {
	ArrowLeft,
	Check,
	Clock,
	DollarSign,
	Network,
	Workflow,
} from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import PaymentInfoCard from './PaymentInfoCard';

import { addCourseToBatch } from '../utils/user';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useAppSettings } from '../hooks/useAppSettings';

function CourseDetails() {
	const { user } = useAuth();
	const { appDocData } = useAppSettings();
	const [isShowModal, setIsShowModal] = useState(false);
	const [isSubmitting, setIsSubmiting] = useState(false);
	const currentBatch = appDocData.currentBatch;

	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};

	console.log('NEW USER ==', user);
	const location = useLocation();
	const course = location.state;
	console.log(course);
	// const openMakePayment = () => {
	// 	setIsShowModal(!isShowModal);
	// };

	const handleCompleteRCourseRegistration = async (cid) => {
		// Check if user already added thatg course
		if (user.batches[currentBatch]?.find((crs) => crs.courseID === cid)) {
			return toast.info(
				'You have already Registered for this course. Wait for Admin Approval'
			);
		}
		// Update user batch and course info and send admin to approve payment then before userc an see lesson

		setIsSubmiting(true);
		// await new Promise((resolve) => setTimeout(resolve, 400));
		try {
			// add user selected course to current  batch
			addCourseToBatch(user.userId, currentBatch, cid);
			toast.success(
				'You have signed up for the this course, await approval from Admin'
			);
			console.log(cid);
		} catch (error) {
			console.log(error);
			toast.error('Oops ! something went wrong');
		} finally {
			setIsSubmiting(false);
		}
	};

	return (
		<div>
			<header className='flex justify-start mb-6'>
				<button onClick={handleBack} className='flex items-center space-x-1'>
					<ArrowLeft /> Back
				</button>
			</header>
			<div className='flex justify-between bg-zinc-800 p-6 rounded-lg'>
				<div className='space-y-2 md:w-[70%]'>
					<small className='text-white text-sm'>Career Path</small>
					<h1 className='text-white text-2xl font-semibold'>{course.title}</h1>
					<small className='text-stone-400'>{course['career path']}</small>
					<p className='text-white text-sm'>{course.intro}</p>
					<p className='text-white text-sm'>
						{/* Includes JavaScript, Node.JS, SQL, Express.JS, React, TDD, and more. */}
						Includes {course?.Includes.map((item) => item).join(', ')}
					</p>
					<div className=' flex flex-col gap-3 sm:flex sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6'>
						<button
							className='order-2 sm:order-none bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
							onClick={() => setIsShowModal(!isShowModal)}
						>
							Make Payment To Register
						</button>
						<p className='text-white text-sm order-1 sm:order-none'>
							1,460 learners enrolled
						</p>
					</div>
				</div>
				<div className=' hidden lg:block border border-white p-4 space-y-3'>
					<p className='text-white text-base font-semibold'>
						This career path includes
					</p>
					<ul className='text-white text-sm font-light space-y-2'>
						<li className='flex items-center space-x-2'>
							<Check size={14} /> <span>Project to apply new skills</span>
						</li>
						<li className='flex items-center space-x-2'>
							<Check size={14} /> <span>Quizzes to test your knowledge</span>
						</li>
						<li className='flex items-center space-x-2'>
							<Check size={14} /> <span>A professional certification</span>
						</li>
						<li className='flex items-center space-x-2'>
							<Check size={14} /> <span>Instructor-led live class</span>
						</li>
						<li className='flex items-center space-x-2'>
							<Check size={14} /> <span>Conect and meet other learners</span>
						</li>
					</ul>
				</div>
			</div>
			<div className=' space-y-3   sm:flex sm:justify-between sm:items-center  bg-zinc-400 mt-4  p-6 border border-zinc-800'>
				<div className='flex items-center space-x-3'>
					<div>
						<Network />
					</div>
					<div className='flex flex-col'>
						<small>Skill level</small>
						<strong className='text-lg'>{course['skill level']}</strong>
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<div>
						<Clock />
					</div>
					<div className='flex flex-col'>
						<small>Duration</small>
						<strong className='text-lg'>{course.Duration}</strong>
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<div>
						<Workflow />
					</div>
					<div className='flex flex-col'>
						<small>Projects</small>
						<strong className='text-lg'>{course.projects}</strong>
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<div>
						<Network />
					</div>
					<div className='flex flex-col'>
						<small>Prerequisites</small>
						<strong className='text-lg'>{course.Prerequisites}</strong>
					</div>
				</div>
			</div>
			<div className=' mt-8 space-y-4 lg:grid lg:grid-cols-[8fr_4fr] lg:gap-8 '>
				<div className='space-y-3 '>
					<h3 className='font-semibold text-lg'>About this career path</h3>
					<p className='text-sm '>{course.description}</p>
				</div>
				<div className='bg-zinc-400 border border-zinc-800 p-6 flex items-center space-x-2'>
					<div>
						<DollarSign />
					</div>
					<div className='flex flex-col'>
						<small>Average Salary (US)</small>
						<strong>$120,000</strong>
					</div>
				</div>
			</div>
			<div className='pt-10'>
				<h2 className='mb-6 font-bold text-lg'>Syllabus</h2>

				{course.syllabus.map((syllabu, index) => {
					console.log(syllabu);
					return (
						<React.Fragment key={syllabu.subject}>
							<div className='flex space-x-2 bg-zinc-50 border border-zinc-800 p-4'>
								<div className='bg-zinc-800  w-8 h-8 rounded-full flex justify-center items-center text-white'>
									<strong className='text-8'>{index}</strong>
								</div>
								<div>
									<h3 className='text-base font-semibold'>{syllabu.subject}</h3>
									<p className='text-sm'>
										{syllabu.content.map((con) => con).join(', ')}
									</p>
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</div>
			<div className='mt-8 flex justify-center'>
				<button
					onClick={() => setIsShowModal(!isShowModal)}
					className='order-2 sm:order-none bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
				>
					Get started
				</button>
			</div>

			{isShowModal && (
				<Modal handleModalClick={() => setIsShowModal(!isShowModal)}>
					<PaymentInfoCard
						isSubmitting={isSubmitting}
						courseTitle={course.title}
						careerPath={course['career path']}
						handleCourseRegistration={() =>
							handleCompleteRCourseRegistration(course.id)
						}
					/>
				</Modal>
			)}
		</div>
	);
}

export default CourseDetails;
