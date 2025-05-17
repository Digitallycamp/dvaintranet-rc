import React, { useEffect, useState } from 'react';

import { getCourses } from '../utils/course';
import { Oval } from 'react-loader-spinner';
import CourseCard from '../components/users/CourseCard';

function Courses() {
	const [coursesList, setCoursesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		async function courses() {
			setIsLoading(true);

			try {
				// await Promise((resolve) => setTimeout(resolve, 1000));
				const course = await getCourses();

				setCoursesList(course);
			} catch (error) {
				if (error) {
					setError('Unable to get all courses, contact support');
				}
			} finally {
				setIsLoading(false);
			}
		}
		courses();
	}, []);
	console.log(coursesList);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Oval width={24} height={24} color='#080808' />
			</div>
		);
	}
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<div className='space-y-6'>
			<h1>DVA Courses</h1>
			<div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
				{coursesList.map((courseList) => (
					<React.Fragment key={courseList.id}>
						<CourseCard {...courseList} />
					</React.Fragment>
				))}

				{/* <div className=' border border-zinc-100 rounded-lg  hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full '>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>HTML, CSS, JavaScript</h2>
						<p className='text-zinc-500 text-sm'>(Front-End Development)</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/1'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div>

				<div className=' border border-zinc-100 rounded-lg  hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full '>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>Reactjs</h2>
						<p className='text-zinc-500 text-sm'>(Front-End Development)</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/2'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div>
				<div className=' border border-zinc-100 rounded-lg  hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full'>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>Full Stack Web Development</h2>
						<p className='text-zinc-500 text-sm'>
							(Front-End Development & Back-end)
						</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/3'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div>
				<div className=' border border-zinc-100 rounded-lg hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full'>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>Product Design </h2>
						<p className='text-zinc-500 text-sm'>(UIUX)</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/4'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div>
				<div className=' border border-zinc-100 rounded-lg hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full'>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>Data Analysis</h2>
						<p className='text-zinc-500 text-sm'>(Business Analyst)</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/5'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div>
				<div className=' border border-zinc-100 rounded-lg hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full '>
					<div className='flex-grow'>
						<h2 className='text-2xl font-bold'>SQL</h2>
						<p className='text-zinc-500 text-sm'>
							(SQL for Business Analyst & Database management)
						</p>
					</div>
					<div className='flex justify-between items-center text-zinc-500'>
						<div className='flex space-x-2'>
							<Clock size={18} />
							<span className='text-xs'>Duration : 6 Weeks</span>
						</div>
						<span>Beginer</span>
					</div>
					<div>
						<Link
							to='/me/courses/6'
							className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto'
						>
							Register
						</Link>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default Courses;
