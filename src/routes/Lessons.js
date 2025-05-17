import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

function Lessons() {
	const [showWeelyLesson, setShowWeelyLesson] = useState(false);

	const handleShowWeeklyLesson = () => {
		setShowWeelyLesson(!showWeelyLesson);
	};
	return (
		<div>
			<header>
				<div className=' border border-zinc-400 bg-zinc-50 px-3 py-2 rounded-lg w-1/4'>
					<select className='border-0 bg-zinc-50 w-full'>
						<option value='batcha'>Batch A</option>
						<option value='batchb'>Batch B</option>
					</select>
				</div>
			</header>
			<main className=' flex flex-col lg:flex lg:flex-row gap-6 mt-10 '>
				<aside className='  lg:w-1/4 bg-zinc-50 p-6 rounded-lg space-y-2 order-2 lg:order-1'>
					<h3 className=' '>Batch A</h3>
					<hr className='border-b border-b-zinc-800' />
					<div>
						{/* // dynamic */}

						<div>
							<div className='flex items-center  justify-between '>
								<strong>WEEK 1</strong>
								<button onClick={handleShowWeeklyLesson}>
									<ChevronDown />
								</button>
							</div>
							<hr className='border-b border-b-zinc-200' />
							<ul>{showWeelyLesson && <li>Lesson 1</li>}</ul>
						</div>
						{/* // dynamic */}
					</div>
				</aside>
				<section className=' w-full lg:w-[75%] bg-zinc-50 p-6 rounded-lg  order-1 lg:order-2'>
					<div className='space-y-4'>
						<h3>Lesson 1: Introduction to HTML,CSS,JavaScript</h3>
						<div className='bg-zinc-800 p-4 rounded-lg w-full max-w-[560px] h-[315px]'>
							{/* <iframe
								width='560'
								height='315'
								src='https://www.youtube.com/embed/F121S44iyk4?si=KTitw_j2VHYySUOK'
								title='YouTube video player'
								frameborder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerpolicy='strict-origin-when-cross-origin'
								allowfullscreen
							></iframe> */}
							{/* <iframe
								className='w-full h-full'
								src='https://drive.google.com/file/d/18B_nHQP0kDSBIt2SXqhWY6hmrbmq7f72/preview'
								// width='560'
								// height='315'
								allow='autoplay'
							></iframe> */}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Lessons;
