// import React, { useEffect, useState } from 'react';
// import { motion } from 'motion/react';
// import rb from '../assets/rb.png';
// import RouteLoader from '../components/shared/RouteLoader';
// import { days, months } from '../utils/date';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { hasCompletedOnboarding, onboardUser } from '../utils/user';

// import { TailSpin } from 'react-loader-spinner';
// import toast from 'react-hot-toast';

// const intialValues = {
// 	fullname: '',
// 	email: '',
// 	whatsapp_no: '',
// 	dob: { day: '', month: '' },
// 	age: '',
// 	education: '',
// 	previousKnowledge: '',
// 	techProficiency: '',
// 	bootcampCommitment: '',
// 	videoConferencingComfort: '',
// 	preferredClassTime: '',
// 	purpose: '',
// 	currentProfession: '',
// 	applicationReason: '',
// };

// function OnboardingScreen() {
// 	const { user, isCurrentUser } = useAuth();
// 	const [loadingScreen, setIsLoadingScreen] = useState(true);
// 	const [formValues, setFormValues] = useState(intialValues);
// 	const [step, setStep] = useState(1);
// 	const [formError, setFormError] = useState({});
// 	const [isSubmitting, setIsSubmiting] = useState(false);

// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (user && user.hasCompletedOnboarding) {
// 			navigate('/me');
// 		}
// 	}, [user, navigate]);

// 	function validateForm() {
// 		const newErrors = {};
// 		if (step === 1) {
// 			if (!formValues.fullname.trim())
// 				newErrors.fullname = 'Full name is required.';

// 			if (!formValues.whatsapp_no.trim())
// 				newErrors.whatsapp_no = 'WhatsApp number is required.';
// 			if (!formValues.dob.day || !formValues.dob.month)
// 				newErrors.dob = 'Date of birth  is required.';
// 			if (!formValues.age) newErrors.age = 'Age  is required.';
// 			if (!formValues.education)
// 				newErrors.education = 'Educcation is required.';
// 		}
// 		if (step === 2) {
// 			if (!formValues.previousKnowledge)
// 				newErrors.previousKnowledge = ' Filed is required';
// 			if (!formValues.techProficiency)
// 				newErrors.techProficiency = ' Filed is required';
// 			if (!formValues.bootcampCommitment)
// 				newErrors.bootcampCommitment = ' Filed is required';
// 			if (!formValues.videoConferencingComfort)
// 				newErrors.videoConferencingComfort = ' Filed is required';
// 			if (!formValues.preferredClassTime)
// 				newErrors.preferredClassTime = ' Filed is required';
// 		}

// 		if (step === 3) {
// 			if (!formValues.purpose) newErrors.purpose = ' Filed is required';
// 			if (!formValues.currentProfession)
// 				newErrors.currentProfession = ' Filed is required';
// 			if (!formValues.applicationReason)
// 				newErrors.applicationReason = ' Filed is required';
// 		}

// 		setFormError(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	}

// 	function handleNext(event) {
// 		event.preventDefault();
// 		if (validateForm()) {
// 			setStep((prev) => prev + 1);
// 		}
// 	}
// 	function handleBack(event) {
// 		event.preventDefault();
// 		setStep((prev) => prev - 1);
// 	}
// 	useEffect(() => {
// 		// Simulate loading time
// 		const timer = setTimeout(() => {
// 			setIsLoadingScreen(false);
// 		}, 3000);

// 		return () => clearTimeout(timer);
// 	}, []);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		if (name.includes('dob.')) {
// 			const dobField = name.split('.')[1];
// 			setFormValues((prevValues) => ({
// 				...prevValues,
// 				dob: {
// 					...prevValues.dob,
// 					[dobField]: value,
// 				},
// 			}));
// 		} else {
// 			setFormValues((prevValues) => ({
// 				...prevValues,
// 				[name]: value,
// 			}));
// 		}
// 	};

// 	async function handleSubmit(event) {
// 		event.preventDefault();
// 		setIsSubmiting(true);
// 		// await new Promise((resolve) => setTimeout(() => resolve(), 1500));
// 		if (!isCurrentUser) {
// 			throw new Error('No authenticated user found');
// 		}
// 		if (validateForm()) {
// 			onboardUser(isCurrentUser.uid, formValues)
// 				.then(() => {
// 					console.log(user.userId);
// 					hasCompletedOnboarding(user.userId, true);
// 					toast.success('Onboarding completed !.');
// 				})
// 				.catch((error) => {
// 					console.log('User onboarding failed:', error.message, error);
// 				})
// 				.finally(() => {
// 					setIsSubmiting(false);
// 				});
// 		}
// 	}

// 	if (loadingScreen) {
// 		// Loading screen content
// 		return <RouteLoader />;
// 	}

// 	return (
// 		<main className='py-8 md:w-screen md:flex md:justify-center md:h-screen md:overflow-hidden'>
// 			<div className='hidden md:block md:h-screen md:w-[50%]'>
// 				<motion.img
// 					animate={{ x: [0, -5, 5, -5, 5, 0] }}
// 					transition={{ duration: 0.8, ease: 'easeInOut' }}
// 					src={rb}
// 					alt='Illustration'
// 					className='h-full'
// 				/>
// 			</div>
// 			<div className='w-full md:w-[50%] rounded-lg py-8 px-10 md:overflow-y-auto'>
// 				<header className='mb-8'>
// 					<h1 className='text-2xl text-center text-[#1c1d1d] font-bold'>
// 						Welcome to Digitally Virtual Academy – Your Gateway to Learning 🚀
// 					</h1>
// 					<h2 className='text-sm text-center text-[#1c1d1d] font-medium mt-3'>
// 						Discover, Learn, and Grow – All in one place.
// 					</h2>
// 				</header>
// 				<section>
// 					<p className='text-sm text-center text-[#1c1d1d] font-normal'>
// 						{' '}
// 						Started Let’s get you set up quickly so you can start learning right
// 						away! complet the steps to get started
// 					</p>
// 					<div className='flex items-center gap-4 mt-8 justify-center md:justify-start'>
// 						<div
// 							className={` w-12 h-12 rounded-full ${
// 								step === 1 ? 'bg-sky-900 text-white' : 'bg-slate-200'
// 							}  flex justify-center items-center `}
// 						>
// 							1
// 						</div>
// 						<div
// 							className={` w-12 h-12 rounded-full ${
// 								step === 2 ? 'bg-sky-900  text-white' : 'bg-slate-200'
// 							}  flex justify-center items-center `}
// 						>
// 							2
// 						</div>
// 						<div
// 							className={` w-12 h-12 rounded-full ${
// 								step === 3 ? 'bg-sky-900  text-white' : 'bg-slate-200'
// 							}  flex justify-center items-center `}
// 						>
// 							3
// 						</div>
// 					</div>
// 					<form className='mt-4 flex flex-col gap-6' onSubmit={handleSubmit}>
// 						{/* Section 1: Personal and Contact Information */}
// 						{step === 1 && (
// 							<fieldset className='mt-4 flex flex-col gap-4'>
// 								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
// 									Personal and Contact Information
// 								</legend>
// 								<p className='text-[9px]'>
// 									<span className='bg-yellow-100 px-2 py-1 rounded'>
// 										Recommendation:
// 									</span>{' '}
// 									Our AI Agent will use your information to recommend career and
// 									course for you. We recommend your fill your accurate
// 									information
// 								</p>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Full name (for certificate purposes)
// 										<span className='text-xs font-normal text-red-600'>*</span>
// 									</label>
// 									<input
// 										name='fullname'
// 										type='text'
// 										placeholder='Enter full name'
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										value={formValues.fullname}
// 										onChange={handleChange}
// 									/>
// 									{formError.fullname && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.fullname}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Email (for certificate purposes)
// 										<span className='text-xs font-normal text-red-600'>*</span>
// 									</label>
// 									<input
// 										name='email'
// 										type='text'
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										value={user.email}
// 										// onChange={handleChange}
// 										readOnly
// 									/>
// 									{/* {formError.email && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.email}
// 										</span>
// 									)} */}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										WhatsApp NO{' '}
// 										<span className='text-xs font-normal text-red-600'>*</span>
// 									</label>
// 									<input
// 										name='whatsapp_no'
// 										type='text'
// 										placeholder='Enter WhatsApp number'
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										value={formValues.whatsapp_no}
// 										onChange={handleChange}
// 									/>
// 									{formError.whatsapp_no && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.whatsapp_no}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Date of birth
// 									</label>
// 									<div>
// 										<select
// 											className='w-1/2  h-10 px-3 rounded-md border border-[#CACFD6]'
// 											name='dob.day'
// 											value={formValues.dob.day}
// 											onChange={handleChange}
// 										>
// 											{days.map((day) => (
// 												<option key={day}>{day}</option>
// 											))}
// 										</select>
// 										<select
// 											className='w-1/2 h-10 px-3 rounded-md border border-[#CACFD6]'
// 											name='dob.month'
// 											value={formValues.dob.month}
// 											onChange={handleChange}
// 										>
// 											{months.map((month) => (
// 												<option key={month.month}>{month.label}</option>
// 											))}
// 										</select>
// 										{formError.dob && (
// 											<span className='text-xs font-normal text-red-600'>
// 												{formError.dob}
// 											</span>
// 										)}
// 									</div>
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Select your age range
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='age'
// 										value={formValues.age}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>Below 20</option>
// 										<option>21-29</option>
// 										<option>30-39</option>
// 										<option>40-49</option>
// 										<option>Above 50</option>
// 									</select>
// 									{formError.age && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.age}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Highest Education Level
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='education'
// 										value={formValues.education}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>Secondary School Certificate</option>
// 										<option>Currently an undergraduate</option>
// 										<option>Bachelor's Degree</option>
// 										<option>Masters / Post Graduate Degree</option>
// 									</select>
// 									{formError.education && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.education}
// 										</span>
// 									)}
// 								</div>
// 							</fieldset>
// 						)}

// 						{/* Section 2: Bootcamp Readiness and Preferences */}
// 						{step === 2 && (
// 							<fieldset className='mt-4 flex flex-col gap-4'>
// 								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
// 									Bootcamp Readiness and Preferences
// 								</legend>
// 								<p className='text-[9px]'>
// 									<span className='bg-yellow-100 px-2 py-1 rounded'>
// 										Recommendation:
// 									</span>{' '}
// 									Our AI Agent will use your information to recommend career and
// 									course for you. We recommend your fill your accurate
// 									information
// 								</p>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Do you have any previous knowledge of the course?
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='previousKnowledge'
// 										value={formValues.previousKnowledge}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>Yes</option>
// 										<option>No</option>
// 									</select>
// 									{formError.previousKnowledge && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.previousKnowledge}
// 										</span>
// 									)}
// 								</div>

// 								<div className='flex flex-col gap-2'>
// 									<label className=' text-sm font-semibold text-[#1c1d1d'>
// 										How would you rate your overall tech proficiency?
// 									</label>

// 									<div className='flex items-center gap-2'>
// 										<select
// 											type='text'
// 											placeholder='Enter full name'
// 											className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 											name='techProficiency'
// 											value={formValues.techProficiency}
// 											onChange={handleChange}
// 										>
// 											<option>Select an option</option>
// 											<option>Beginner</option>
// 											<option>Intermediate</option>
// 											<option>Expert</option>
// 										</select>
// 									</div>
// 									{formError.techProficiency && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.techProficiency}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Are you ready to commit to the full bootcamp duration (6
// 										weeks)?
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='bootcampCommitment'
// 										value={formValues.bootcampCommitment}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>Yes</option>
// 										<option>No</option>
// 									</select>
// 									{formError.bootcampCommitment && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.bootcampCommitment}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										How comfortable are you with using video conferencing
// 										platforms?
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='videoConferencingComfort'
// 										value={formValues.videoConferencingComfort}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>Not comfortable</option>
// 										<option>Very comfortable</option>
// 									</select>
// 									{formError.videoConferencingComfort && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.videoConferencingComfort}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Your preferred time for the class?
// 									</label>
// 									<select
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										name='preferredClassTime'
// 										value={formValues.preferredClassTime}
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>7PM WAT - 9PM WAT</option>
// 										<option>8PM WAT - 10PM WAT</option>
// 									</select>
// 									{formError.preferredClassTime && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.preferredClassTime}
// 										</span>
// 									)}
// 								</div>
// 							</fieldset>
// 						)}

// 						{/* Section 3: Additional Insights */}
// 						{step === 3 && (
// 							<fieldset className='mt-4 flex flex-col gap-4'>
// 								<legend className='text-lg font-semibold text-[#1c1d1d] mb-4'>
// 									Additional Insights
// 								</legend>
// 								<p className='text-[9px]'>
// 									<span className='bg-yellow-100 px-2 py-1 rounded'>
// 										Recommendation:
// 									</span>{' '}
// 									Our AI Agent will use your information to recommend career and
// 									course for you. We recommend your fill your accurate
// 									information
// 								</p>
// 								<div className='flex flex-col gap-2'>
// 									<lable className=' text-sm font-semibold text-[#1c1d1d'>
// 										What is your purpose of taking this course?{' '}
// 										<span className='text-xs  font-normal'>
// 											We want to understand your needs
// 											<span className='text-red-600'>*</span>
// 										</span>
// 									</lable>
// 									<select
// 										type='text'
// 										placeholder='Enter full name'
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										value={formValues.purpose}
// 										name='purpose'
// 										onChange={handleChange}
// 									>
// 										<option>Select an option</option>
// 										<option>To transition into Tech</option>
// 										<option>To land a new job</option>
// 										<option>To upkill my what i already know</option>
// 										<option>LinkedIn</option>
// 										<option>Career switch</option>
// 									</select>
// 									{formError.purpose && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.purpose}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										What do you do currently?
// 									</label>
// 									<input
// 										type='text'
// 										placeholder='Enter profession'
// 										className='w-full h-10 px-3 rounded-md border border-[#CACFD6]'
// 										value={formValues.currentProfession}
// 										name='currentProfession'
// 										onChange={handleChange}
// 									/>
// 									{formError.currentProfession && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.currentProfession}
// 										</span>
// 									)}
// 								</div>
// 								<div className='flex flex-col gap-2'>
// 									<label className='text-sm font-semibold text-[#1c1d1d]'>
// 										Why should we accept your application?
// 									</label>
// 									<textarea
// 										className='w-full h-20 px-3 rounded-md border border-[#CACFD6]'
// 										placeholder='Write here'
// 										value={formValues.applicationReason}
// 										name='applicationReason'
// 										onChange={handleChange}
// 									></textarea>
// 									{formError.applicationReason && (
// 										<span className='text-xs font-normal text-red-600'>
// 											{formError.applicationReason}
// 										</span>
// 									)}
// 								</div>
// 							</fieldset>
// 						)}

// 						<div className='flex justify-between mt-4'>
// 							{step > 1 && (
// 								<motion.button
// 									initial={{ scale: 0.9, backgroundColor: '#F4F4F6' }}
// 									whileHover={{ scale: 1, backgroundColor: '#F4F4F6' }}
// 									transition={{ duration: 0.3 }}
// 									className='border border-[#CACFD6] py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
// 									onClick={handleBack}
// 								>
// 									<span className='text-[#1c1d1d] font-bold'>Back</span>
// 								</motion.button>
// 							)}
// 							{step < 3 ? (
// 								<motion.button
// 									disabled={!Object.keys(formError).length === 0}
// 									initial={{ scale: 0.9, backgroundColor: '#1c1d1d' }}
// 									whileHover={{ scale: 1, backgroundColor: '#0B0C11' }}
// 									transition={{ duration: 0.3 }}
// 									className='border border-[#CACFD6] py-2 px-4 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
// 									onClick={handleNext}
// 								>
// 									<span className='text-[#fff] font-bold'>Continue</span>
// 								</motion.button>
// 							) : (
// 								''
// 							)}
// 						</div>

// 						{step === 3 && (
// 							<motion.button
// 								initial={{ scale: 0.9, backgroundColor: '#1c1d1d' }}
// 								whileHover={{ scale: 1, backgroundColor: '#0B0C11' }}
// 								transition={{ duration: 0.3 }}
// 								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-[#F4F4F6]'
// 							>
// 								{isSubmitting ? (
// 									<TailSpin
// 										visible={true}
// 										height='40'
// 										width='40'
// 										color='#4fa94d'
// 										ariaLabel='tail-spin-loading'
// 										radius='1'
// 										wrapperStyle={{}}
// 										wrapperClass=''
// 									/>
// 								) : (
// 									<span className='text-[#fff] font-bold'>Get Started</span>
// 								)}
// 							</motion.button>
// 						)}
// 					</form>
// 				</section>
// 			</div>
// 		</main>
// 	);
// }

// export default OnboardingScreen;

import React, { useEffect, useState, useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';
import rb from '../assets/rb.png';
import RouteLoader from '../components/shared/RouteLoader';
import { days, months } from '../utils/date';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { hasCompletedOnboarding, onboardUser } from '../utils/user';
import { countries } from '../utils/countryList';

const initialValues = {
	fullname: '',
	email: '',
	whatsapp_no: {
		countryCode: '+234', // Default to Nigeria
		number: '',
	},
	dob: { day: '', month: '' },
	age: '',
	education: '',
	previousKnowledge: '',
	techProficiency: '',
	bootcampCommitment: '',
	videoConferencingComfort: '',
	preferredClassTime: '',
	purpose: '',
	currentProfession: '',
	applicationReason: '',
};

function OnboardingScreen() {
	const { user, isCurrentUser } = useAuth();
	const [loadingScreen, setIsLoadingScreen] = useState(true);
	const [formValues, setFormValues] = useState(initialValues);
	const [step, setStep] = useState(1);
	const [formError, setFormError] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	// Redirect if user has already completed onboarding
	useEffect(() => {
		if (user && user.hasCompletedOnboarding) {
			navigate('/me');
		}
	}, [user, navigate]);

	// Simulate loading time
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoadingScreen(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	const validateForm = () => {
		const newErrors = {};

		if (step === 1) {
			if (!formValues.fullname.trim())
				newErrors.fullname = 'Full name is required';

			// WhatsApp validation
			if (!formValues.whatsapp_no.number.trim()) {
				newErrors.whatsapp_no = 'WhatsApp number is required';
			} else {
				// Remove any non-digit characters for validation
				const cleanNumber = formValues.whatsapp_no.number.replace(/\D/g, '');

				// Basic number validation (most WhatsApp numbers are between 7 and 15 digits)
				if (cleanNumber.length < 7 || cleanNumber.length > 15) {
					newErrors.whatsapp_no = 'Please enter a valid WhatsApp number';
				}
			}

			if (!formValues.dob.day || !formValues.dob.month)
				newErrors.dob = 'Date of birth is required';
			if (!formValues.age) newErrors.age = 'Age is required';
			if (!formValues.education) newErrors.education = 'Education is required';
		}

		if (step === 2) {
			if (!formValues.previousKnowledge)
				newErrors.previousKnowledge = 'This field is required';
			if (!formValues.techProficiency)
				newErrors.techProficiency = 'This field is required';
			if (!formValues.bootcampCommitment)
				newErrors.bootcampCommitment = 'This field is required';
			if (!formValues.videoConferencingComfort)
				newErrors.videoConferencingComfort = 'This field is required';
			if (!formValues.preferredClassTime)
				newErrors.preferredClassTime = 'This field is required';
		}

		if (step === 3) {
			if (!formValues.purpose) newErrors.purpose = 'This field is required';
			if (!formValues.currentProfession)
				newErrors.currentProfession = 'This field is required';
			if (!formValues.applicationReason)
				newErrors.applicationReason = 'This field is required';
		}

		setFormError(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = (e) => {
		e.preventDefault();
		if (validateForm()) {
			setStep((prev) => prev + 1);
		}
	};

	const handleBack = (e) => {
		e.preventDefault();
		setStep((prev) => prev - 1);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.includes('dob.')) {
			const dobField = name.split('.')[1];
			setFormValues((prevValues) => ({
				...prevValues,
				dob: {
					...prevValues.dob,
					[dobField]: value,
				},
			}));
		} else if (name === 'countryCode') {
			setFormValues((prevValues) => ({
				...prevValues,
				whatsapp_no: {
					...prevValues.whatsapp_no,
					countryCode: value,
				},
			}));
		} else if (name === 'whatsappNumber') {
			setFormValues((prevValues) => ({
				...prevValues,
				whatsapp_no: {
					...prevValues.whatsapp_no,
					number: value,
				},
			}));
		} else {
			setFormValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!isCurrentUser) {
			throw new Error('No authenticated user found');
		}

		if (validateForm()) {
			try {
				await onboardUser(isCurrentUser.uid, formValues);
				await hasCompletedOnboarding(user.userId, true);
				toast.success('Onboarding completed! Welcome aboard!');
				navigate('/me');
			} catch (error) {
				console.error('User onboarding failed:', error.message, error);
				toast.error('Something went wrong. Please try again.');
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setIsSubmitting(false);
		}
	};

	if (loadingScreen) {
		return <RouteLoader />;
	}

	// Progress calculation
	const progressPercentage = ((step - 1) / 2) * 100;

	return (
		<div className='flex min-h-screen bg-gray-50'>
			{/* Left side - Image */}
			<div className='hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center relative overflow-hidden'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='relative w-4/5 h-4/5'
				>
					<motion.img
						src={rb}
						alt='Digital Learning Illustration'
						className='w-full h-full object-contain'
						animate={{
							y: [0, -10, 0],
							rotate: [0, 1, 0],
						}}
						transition={{
							repeat: Infinity,
							duration: 6,
							ease: 'easeInOut',
						}}
					/>
					<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-50 to-transparent h-20'></div>
				</motion.div>
			</div>

			{/* Right side - Form */}
			<div className='w-full lg:w-1/2 px-6 py-8 md:p-12 overflow-y-auto'>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='max-w-lg mx-auto'
				>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-800'>
							Welcome to Digitally Virtual Academy
						</h1>
						<p className='text-gray-600 mt-2'>Your Gateway to Learning 🚀</p>
					</div>

					{/* Progress bar */}
					<div className='mb-8'>
						<div className='flex justify-between mb-2'>
							<span className='text-sm font-medium text-gray-700'>
								Step {step} of 3
							</span>
							<span className='text-sm font-medium text-gray-700'>
								{Math.round(progressPercentage)}% Complete
							</span>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-2'>
							<div
								className='bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out'
								style={{ width: `${progressPercentage}%` }}
							></div>
						</div>
					</div>

					{/* Steps indicator */}
					<div className='flex items-center justify-center mb-8'>
						{[1, 2, 3].map((stepNumber) => (
							<div key={stepNumber} className='flex items-center'>
								<div
									className={`flex items-center justify-center w-10 h-10 rounded-full ${
										step === stepNumber
											? 'bg-blue-600 text-white'
											: step > stepNumber
											? 'bg-green-500 text-white'
											: 'bg-gray-200 text-gray-600'
									} font-medium transition-all duration-300`}
								>
									{step > stepNumber ? (
										<svg
											className='w-6 h-6'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M5 13l4 4L19 7'
											></path>
										</svg>
									) : (
										stepNumber
									)}
								</div>
								{stepNumber < 3 && (
									<div
										className={`w-12 h-1 ${
											step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
										}`}
									></div>
								)}
							</div>
						))}
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit}>
						{/* Step 1: Personal Information */}
						{step === 1 && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<h2 className='text-xl font-semibold text-gray-800 mb-4'>
									Personal Information
								</h2>

								<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded'>
									<p className='text-sm text-yellow-700'>
										<span className='font-medium'>Recommendation:</span> Our AI
										Agent will use your information to recommend the best career
										path and courses for you. Please provide accurate
										information.
									</p>
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Full Name <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										name='fullname'
										placeholder='Enter your full name'
										value={formValues.fullname}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.fullname ? 'border-red-500' : 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									/>
									{formError.fullname && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.fullname}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Email <span className='text-red-500'>*</span>
									</label>
									<input
										type='email'
										name='email'
										value={user?.email || ''}
										readOnly={true}
										className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
									/>
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										WhatsApp Number <span className='text-red-500'>*</span>
									</label>
									<div className='flex'>
										<div className='w-1/3 mr-2'>
											<select
												name='countryCode'
												value={formValues.whatsapp_no.countryCode}
												onChange={handleChange}
												className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
											>
												{countries.map((country) => (
													<option key={country.code} value={country.code}>
														{country.name} {country.code}
													</option>
												))}
											</select>
										</div>
										<div className='w-2/3'>
											<input
												type='tel'
												name='whatsappNumber'
												placeholder='Enter your WhatsApp number'
												value={formValues.whatsapp_no.number}
												onChange={handleChange}
												className={`w-full px-4 py-2 rounded-lg border ${
													formError.whatsapp_no
														? 'border-red-500'
														: 'border-gray-300'
												} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
											/>
										</div>
									</div>
									{formError.whatsapp_no && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.whatsapp_no}
										</p>
									)}
									<p className='mt-1 text-xs text-gray-500'>
										Please select your country code and enter your WhatsApp
										number without leading zeros
									</p>
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Date of Birth <span className='text-red-500'>*</span>
									</label>
									<div className='grid grid-cols-2 gap-4'>
										<select
											name='dob.day'
											value={formValues.dob.day}
											onChange={handleChange}
											className={`px-4 py-2 rounded-lg border ${
												formError.dob ? 'border-red-500' : 'border-gray-300'
											} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
										>
											<option value=''>Day</option>
											{days.map((day) => (
												<option key={day} value={day}>
													{day}
												</option>
											))}
										</select>
										<select
											name='dob.month'
											value={formValues.dob.month}
											onChange={handleChange}
											className={`px-4 py-2 rounded-lg border ${
												formError.dob ? 'border-red-500' : 'border-gray-300'
											} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
										>
											<option value=''>Month</option>
											{months.map((month) => (
												<option key={month.month} value={month.month}>
													{month.label}
												</option>
											))}
										</select>
									</div>
									{formError.dob && (
										<p className='mt-1 text-sm text-red-500'>{formError.dob}</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Age Range <span className='text-red-500'>*</span>
									</label>
									<select
										name='age'
										value={formValues.age}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.age ? 'border-red-500' : 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Below 20'>Below 20</option>
										<option value='21-29'>21-29</option>
										<option value='30-39'>30-39</option>
										<option value='40-49'>40-49</option>
										<option value='Above 50'>Above 50</option>
									</select>
									{formError.age && (
										<p className='mt-1 text-sm text-red-500'>{formError.age}</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Highest Education Level{' '}
										<span className='text-red-500'>*</span>
									</label>
									<select
										name='education'
										value={formValues.education}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.education ? 'border-red-500' : 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Secondary School Certificate'>
											Secondary School Certificate
										</option>
										<option value='Currently an undergraduate'>
											Currently an undergraduate
										</option>
										<option value="Bachelor's Degree">Bachelor's Degree</option>
										<option value='Masters / Post Graduate Degree'>
											Masters / Post Graduate Degree
										</option>
									</select>
									{formError.education && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.education}
										</p>
									)}
								</div>
							</motion.div>
						)}

						{/* Step 2: Bootcamp Readiness */}
						{step === 2 && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<h2 className='text-xl font-semibold text-gray-800 mb-4'>
									Bootcamp Readiness
								</h2>

								<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded'>
									<p className='text-sm text-yellow-700'>
										<span className='font-medium'>Recommendation:</span> Your
										answers help us tailor the bootcamp experience to your needs
										and create an optimal learning environment.
									</p>
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Do you have any previous knowledge of the course?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<select
										name='previousKnowledge'
										value={formValues.previousKnowledge}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.previousKnowledge
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Yes'>Yes</option>
										<option value='No'>No</option>
									</select>
									{formError.previousKnowledge && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.previousKnowledge}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										How would you rate your overall tech proficiency?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<select
										name='techProficiency'
										value={formValues.techProficiency}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.techProficiency
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Beginner'>Beginner</option>
										<option value='Intermediate'>Intermediate</option>
										<option value='Expert'>Expert</option>
									</select>
									{formError.techProficiency && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.techProficiency}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Are you ready to commit to the full bootcamp duration (6
										weeks)? <span className='text-red-500'>*</span>
									</label>
									<select
										name='bootcampCommitment'
										value={formValues.bootcampCommitment}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.bootcampCommitment
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Yes'>Yes</option>
										<option value='No'>No</option>
									</select>
									{formError.bootcampCommitment && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.bootcampCommitment}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										How comfortable are you with using video conferencing
										platforms? <span className='text-red-500'>*</span>
									</label>
									<select
										name='videoConferencingComfort'
										value={formValues.videoConferencingComfort}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.videoConferencingComfort
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='Not comfortable'>Not comfortable</option>
										<option value='Very comfortable'>Very comfortable</option>
									</select>
									{formError.videoConferencingComfort && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.videoConferencingComfort}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Your preferred time for the class?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<select
										name='preferredClassTime'
										value={formValues.preferredClassTime}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.preferredClassTime
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='7PM WAT - 9PM WAT'>7PM WAT - 9PM WAT</option>
										<option value='8PM WAT - 10PM WAT'>
											8PM WAT - 10PM WAT
										</option>
									</select>
									{formError.preferredClassTime && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.preferredClassTime}
										</p>
									)}
								</div>
							</motion.div>
						)}

						{/* Step 3: Additional Insights */}
						{step === 3 && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								<h2 className='text-xl font-semibold text-gray-800 mb-4'>
									Additional Insights
								</h2>

								<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded'>
									<p className='text-sm text-yellow-700'>
										<span className='font-medium'>Almost there!</span> These
										final questions help us understand your goals and tailor our
										support to your career aspirations.
									</p>
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										What is your purpose of taking this course?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<select
										name='purpose'
										value={formValues.purpose}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.purpose ? 'border-red-500' : 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									>
										<option value=''>Select an option</option>
										<option value='To transition into Tech'>
											To transition into Tech
										</option>
										<option value='To land a new job'>To land a new job</option>
										<option value='To upskill what I already know'>
											To upskill what I already know
										</option>
										<option value='Career switch'>Career switch</option>
									</select>
									{formError.purpose && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.purpose}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										What do you do currently?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										name='currentProfession'
										placeholder='Enter your current profession'
										value={formValues.currentProfession}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.currentProfession
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
									/>
									{formError.currentProfession && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.currentProfession}
										</p>
									)}
								</div>

								<div className='mb-4'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Why should we accept your application?{' '}
										<span className='text-red-500'>*</span>
									</label>
									<textarea
										name='applicationReason'
										placeholder="Tell us why you're a good fit for this program..."
										value={formValues.applicationReason}
										onChange={handleChange}
										className={`w-full px-4 py-2 rounded-lg border ${
											formError.applicationReason
												? 'border-red-500'
												: 'border-gray-300'
										} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px]`}
									/>
									{formError.applicationReason && (
										<p className='mt-1 text-sm text-red-500'>
											{formError.applicationReason}
										</p>
									)}
								</div>
							</motion.div>
						)}

						{/* Navigation buttons */}
						<div className='flex justify-between mt-8'>
							{step > 1 && (
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									type='button'
									onClick={handleBack}
									className='px-6 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
								>
									Back
								</motion.button>
							)}

							{step < 3 ? (
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									type='button'
									onClick={handleNext}
									className='ml-auto px-6 py-2.5 bg-blue-600 rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
								>
									Continue
								</motion.button>
							) : (
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.98 }}
									type='submit'
									disabled={isSubmitting}
									className='ml-auto px-6 py-2.5 bg-blue-600 rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
								>
									{isSubmitting ? (
										<div className='flex items-center'>
											<TailSpin
												height={20}
												width={20}
												color='#ffffff'
												ariaLabel='loading'
												radius={1}
											/>
											<span className='ml-2'>Processing...</span>
										</div>
									) : (
										'Complete Registration'
									)}
								</motion.button>
							)}
						</div>
					</form>

					{/* Footer */}
					<p className='text-center text-gray-500 text-sm mt-8'>
						© {new Date().getFullYear()} Digitally Virtual Academy. All rights
						reserved.
					</p>
				</motion.div>
			</div>
		</div>
	);
}

export default OnboardingScreen;
