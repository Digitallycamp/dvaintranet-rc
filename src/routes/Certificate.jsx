import React, { useEffect, useRef } from 'react';
// import html2pdf from 'html2pdf.js';

import certbg from '../assets/Cert-background.png';
import badgepng from '../assets/badge.png';
import Cert from '../components/Cert';

const Certificate = ({ fullName, courseName, date }) => {
	const certificateRef = useRef(null);

	useEffect(() => {
		if (certificateRef.current) {
			certificateRef.current.style.backgroundImage = `url(${certbg})`;
			certificateRef.current.style.backgroundSize = 'cover';
			certificateRef.current.style.backgroundRepeat = 'no-repeat';
		}
	}, []);

	// const handleDownload = () => {
	// 	const element = certificateRef.current;
	// 	if (element) {
	// 		const opt = {
	// 			margin: 0,
	// 			filename: `Certificate.pdf`,
	// 			image: { type: 'jpeg', quality: 0.98 },
	// 			html2canvas: { scale: 2 },
	// 			jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' },
	// 		};
	// 		html2pdf().from(element).set(opt).save();
	// 	}
	// };

	return (
		<div>
			<Cert />
			{/* <header className='mb-8 text-center'>
				<button
					className='px-3 h-8 bg-slate-950 text-white font-bold rounded-md'
					// onClick={handleDownload}
				>
					Download Certificate
				</button>
			</header>

			<div cert-container className='flex justify-center items-center h-screen'>
				<div
					ref={certificateRef}
					className='certificate-container border-8 border-black p-12 w-[297mm] h-[210mm] flex flex-col justify-between items-center bg-white'
				>
					<div className='certificate-header text-center'>
						<h1 className='certificate-title text-6xl font-bold mb-4'>
							CERTIFICATE
						</h1>
						<h2 className='text-4xl font-medium text-amber-800'>
							OF COMPLETION
						</h2>
					</div>
					<div className='certificate-content text-center'>
						<p className='text-2xl font-medium text-amber-800 mb-2'>
							THIS CERTIFICATE IS AWARDED TO
						</p>
						<p className='text-4xl font-Alex Brush mb-2'>{fullName}</p>
						<hr className='m-auto w-1/2 border-t-2 border-black mb-4' />
						<p className='text-2xl mb-2'>
							For Successfully Completing Digitally Virtual Academy Bootcamp.
							This Certificate
						</p>
						<p className='text-2xl'>
							denotes proficiency{' '}
							<span className='font-bold'>in {courseName}</span>
						</p>
					</div>
					<div className='certificate-signature w-full flex justify-between mt-8 px-16'>
						<div className='signature-line text-center'>
							<p className='text-2xl text-amber-800'>Date</p>
							<p className='text-2xl'>{date}</p>
						</div>
						<div className='text-center'>
							<img className='w-48 h-48 mx-auto' src={badgepng} alt='Badge' />
						</div>
						<div className='signature-line text-center'>
							<p className='text-2xl text-amber-800'>Wisdom Christopher</p>
							<p className='text-2xl'>Lead Instructor</p>
						</div>
					</div>
					<div className='certificate-footer text-center mt-4'>
						<h2 className='text-2xl font-bold'>
							[Bootcamp Organizer Name] Tech Bootcamp
						</h2>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Certificate;
