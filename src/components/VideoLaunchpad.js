// Video Grid Component with 3 columns on desktop, 1 on mobile
import React from 'react';
import ReactPlayer from 'react-player';

const VideoLaunchpad = ({ content }) => {
	return (
		<div className='w-full py-12 px-4 sm:px-6 lg:px-8' id='resources'>
			{/* Main Heading */}
			<div className='max-w-7xl mx-auto text-center mb-12'>
				<h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
					Learning Resources Launchpad
				</h2>
				{/* <p className='mt-4 text-xl text-gray-600 max-w-3xl mx-auto'>
					Access all your course videos and materials in one place. Browse the
					collection below to continue your learning journey.
				</p> */}
			</div>

			{/* Video Section */}
			<div className='max-w-7xl mx-auto'>
				{/* Grid - 1 column on mobile, 3 columns on desktop */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{content.map((video, index) => (
						<div
							key={index}
							className='w-full bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg'
						>
							<div className='aspect-w-16 aspect-h-9'>
								<ReactPlayer
									url={video.link}
									width='100%'
									height='100%'
									controls
								/>
							</div>
							<div className='p-6'>
								<h4 className='text-xl font-medium text-gray-900 mb-2'>
									{video.title}
								</h4>
								{video.description && (
									<p className='text-gray-600'>{video.description}</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default VideoLaunchpad;
