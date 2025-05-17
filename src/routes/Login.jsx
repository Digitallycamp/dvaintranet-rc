import React from 'react';
import { motion } from 'motion/react';
import google from '../assets/google.svg';
import github from '../assets/github.svg';

import illust from '../assets/side-view-man-using-personal-computer-home.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../utils/user';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function Login() {
	const { loginWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleSubmitWithGoogle = async () => {
		const user = await loginWithGoogle();

		if (!user) {
			console.error('User not found');
			return;
		}

		// Check if user exists
		const isUserExist = await getUser(user.uid);

		if (!isUserExist) {
			toast.error('You don’t have an account yet!, Register Account First');
			console.error('User does not exist');

			// Sign the user out immediately
			await signOut(auth);

			// Redirect to sign-up page
			navigate('/signup');
			return;
		}

		// Proceed if user exists
		navigate('/me');
	};
	return (
		<main className=' w-screen h-screen overflow-hidden  bg-white '>
			<div className=' w-full md:flex'>
				<div className=' h-[40vh] md:h-screen md:w-[45.3%] p-4 md:p-6  rounded-2xl'>
					<img
						src={illust}
						alt='Illustration'
						className='h-full w-full rounded-2xl'
					/>
				</div>
				<div className='md:px-4 mt-6 md:flex-1 md:flex md:flex-col md:justify-center'>
					{/* <div className='flex justify-center mt-6 mb-6'>
						<img src={brandLogo} alt='Digitally Virtual Academy' />
					</div> */}
					<div className='w-full max-w-[512px] mx-auto  rounded-lg md:p-8'>
						<h1 className=' text-center font-bold text-4xl text-[#1c1d1d]'>
							Welcome Back
						</h1>
						<p className='text-center mt-6'>
							Login into your account using your email
						</p>
						<div className='flex flex-col space-y-6 mt-12'>
							<motion.button
								initial={{ scale: 0.9 }}
								whileHover={{ scale: 1 }}
								className='border border-[#CACFD6] py-2 rounded-lg flex justify-center items-center gap-2 bg-white'
								onClick={handleSubmitWithGoogle}
							>
								<img src={google} alt='google logo' width={32} height={32} />{' '}
								<span className=' text-[#1c1d1d] font-bold '>
									Continue with Google
								</span>
							</motion.button>
							<motion.button
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
							<span>Dont you have an account?</span>
							<Link to='/signup' className='text-blue-900'>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Login;
