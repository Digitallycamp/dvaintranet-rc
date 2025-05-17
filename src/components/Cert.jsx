import React from 'react';
import badge from '../assets/badge.png';
import cttsignature from '../assets/cttsignature.png';

function Cert() {
	return (
		<main className='cert'>
			<div className='cerbg h-[8.3in] w-[11in] bg-[#fdfdfd] p-[0.5in]  '>
				<div className=' w-full h-full rounded-lg p-6'>
					<h1 className='text-2xl font-extrabold text-center mt-10 '>
						Digitall Virtual Academy
					</h1>
					<div>
						<p className='text-2xl text-center mt-12 text-stone-600'>
							Certificate of Completion
						</p>
						<h2 className='text-5xl text-center font-extrabold mt-3'>
							Wisdom C. Onyearizo
						</h2>
						<p className='text-center text-2xl mt-4'>
							Has graduated the Digital Academy
							<span className='font-semibold'> Software Engineering</span>{' '}
							bootcamp
							<br /> with a complete set of career-start skills
						</p>
					</div>
					<div className='flex  items-center justify-between mt-10 px-10'>
						<div className='flex-1 flex  flex-col items-center'>
							<h4 className='font-bold  mb-2'>Skills mastered</h4>
							<div className='flex justify-center gap-2 flex-wrap '>
								<span className='bg-zinc-200 rounded-lg text-xs font-light p-1'>
									HTML
								</span>
								<span className='bg-zinc-200 rounded-lg p-1 text-xs font-light'>
									CSS
								</span>
								<span className='bg-zinc-200 rounded-lg p-1 text-xs font-light'>
									JavaScript
								</span>
								<span className='bg-zinc-200 rounded-lg p-1 text-xs font-light'>
									Figma
								</span>
								<span className='bg-zinc-200 rounded-lg p-1 text-xs font-light'>
									Git & Github
								</span>
							</div>
						</div>
						<div className='flex-1'>
							<img src={badge} alt='dva stamp' width={280} />
						</div>
						<div className='flex flex-1 flex-col items-center relative'>
							<div className='relative -bottom-6'>
								<img src={cttsignature} alt='CTT Signatire' width={110} />
							</div>
							<div>
								<p className='text-2xl font-light'>Wisdom Christoper, CPLP</p>
								<p className='text-center font-light'>
									Digitally Virtual Academy
								</p>
							</div>
						</div>
					</div>
					<div className='px-10'>
						<strong className='text-xs font-light'>ID:68787978</strong>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Cert;
