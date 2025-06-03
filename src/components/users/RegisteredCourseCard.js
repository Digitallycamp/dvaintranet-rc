import { Clock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { createSlug } from '../../utils/createSlug';

function RegisteredCourseCard(props) {
	const {
		id,
		title,
		Duration: duration,
		'career path': careerPath,
		'skill level': skillLevel,
	} = props;

	const slug = createSlug(title);

	return (
		<div className=' border border-zinc-100 rounded-lg  hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full '>
			<div className='flex-grow'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p className='text-zinc-500 text-sm'>({careerPath})</p>
			</div>
			<div className='flex justify-between items-center text-zinc-500'>
				<div className='flex space-x-2'>
					<Clock size={18} />
					<span className='text-xs'>Duration :{duration}</span>
				</div>
				<span>{skillLevel}</span>
			</div>
			<div className='flex items-center justify-between'>
				<Link
					to={`/me/my-courses/lessons/${slug}?msockid=${id}`}
					className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto cursor-pointer'
					state={props}
				>
					Go to lessions
				</Link>
				<a
					href={`${props.class_link}`}
					className='text-blue-200 underline-none'
				>
					Join class
				</a>
			</div>
		</div>
	);
}

export default RegisteredCourseCard;
