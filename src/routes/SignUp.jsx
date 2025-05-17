import React, { useState } from 'react';
import { motion } from 'motion/react';
import google from '../assets/google.svg';
import github from '../assets/github.svg';

import illust from '../assets/side-view-man-using-personal-computer-home.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setUserFiledOnRegistration, setUser } from '../utils/user';

function SignUp() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const { signUpWithGoogle } = useAuth();

	// const handleSignUp = async () => {
	// 	try {
	// 		setIsSubmitting(true);

	// 		// await new Promise((resolve) => setTimeout(resolve(), 500));
	// 		const user = await signUpWithGoogle();

	// 		//

	// 		// const provider = new GoogleAuthProvider();
	// 		// const result = await signInWithPopup(auth, provider);
	// 		// const user = result.user;

	// 		// const docReference = doc(db, 'users', user.uid);
	// 		// await setDoc(docReference, {
	// 		// 	userId: user.uid,
	// 		// 	fullname: '',
	// 		// 	email: user.email,
	// 		// 	whatsapp_no: '',
	// 		// 	dob: { day: '', month: '' },
	// 		// 	age: '',
	// 		// 	education: '',
	// 		// 	previousKnowledge: '',
	// 		// 	techProficiency: '',
	// 		// 	bootcampCommitment: '',
	// 		// 	videoConferencingComfort: '',
	// 		// 	preferredClassTime: '',
	// 		// 	purpose: '',
	// 		// 	currentProfession: '',
	// 		// 	applicationReason: '',
	// 		// 	isSuspended: false,
	// 		// 	isCertIssued: false,
	// 		// 	hasCompletedOnboarding: false,
	// 		// 	role: 'user',
	// 		// 	registeredDate: Timestamp.now(),
	// 		// });
	// 		await setUser(user.uid, user.email);
	// 		const student = setUserFiledOnRegistration(user.uid);
	// 		if (student.hasCompletedOnboarding) {
	// 			navigate('/me');
	// 		}
	// 		navigate('/onboarding');
	// 	} catch (error) {
	// 		console.error('Error during sign-up:', error.message);
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };
	// grok chnage
	const handleSignUp = async () => {
		try {
			setIsSubmitting(true);
			const user = await signUpWithGoogle();
			if (!user) {
				throw new Error('Sign-up failed: No user returned');
			}

			// Create user document in Firestore
			await setUser(user.uid, user.email);

			// Fetch user data
			const student = await setUserFiledOnRegistration(user.uid);
			if (!student) {
				throw new Error('Failed to fetch user data after creation');
			}

			if (student.hasCompletedOnboarding) {
				navigate('/me');
			} else {
				navigate('/onboarding');
			}
		} catch (error) {
			console.error('Error during sign-up:', error.message);
			alert('Sign-up failed: ' + error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<main className=' w-screen h-screen overflow-hidden  bg-white '>
			<div className=' w-full md:flex'>
				<div className=' h-[40vh] md:h-screen md:w-[45.3%] p-4 md:p-6 rounded-2xl'>
					<img
						src={illust}
						alt='Illustration'
						className='h-full w-full rounded-2xl'
					/>
				</div>
				<div className='md:px-4 mt-6 md:flex-1 md:flex md:flex-col md:justify-center'>
					{/* <div className='flex justify-center  mt-6 mb-6'>
						<img src={brandLogo} alt='Digitally Virtual Academy' />
					</div> */}
					<div className='w-full max-w-[512px] mx-auto  rounded-lg md:p-8'>
						<h1 className=' text-center font-bold text-4xl text-[#1c1d1d]'>
							Register
						</h1>
						<p className='text-center mt-6'>
							Register with an account using your email
						</p>
						<div className='flex flex-col space-y-6 mt-12'>
							<motion.button
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-white'
								onClick={handleSignUp}
							>
								<img src={google} alt='google logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									{isSubmitting ? 'Submitting..' : 'Continue with Google'}
								</span>
							</motion.button>
							<motion.button
								disabled={isSubmitting}
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-white'
							>
								<img src={github} alt='github logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									Continue with Github
								</span>
							</motion.button>
						</div>

						<p className='text-center mt-8 font-bold space-x-2'>
							<span>Already have an account?</span>

							<Link to='/signin' className='text-blue-900'>
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default SignUp;
