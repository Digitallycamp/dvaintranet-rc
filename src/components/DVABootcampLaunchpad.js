import React from 'react';
import { Link } from 'react-router-dom';

const DVABootcampLaunchpad = () => {
	return (
		<div className='min-h-screen'>
			<div className='container mx-auto px-4 py-12 space-y-20'>
				{/* Header/Welcome Section */}
				<section className='text-center space-y-6' id='welcome'>
					<div className='mx-auto max-w-2xl'>
						<span className='inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-4'>
							PREVIEW COURSE
						</span>
						<h1 className='text-5xl md:text-6xl font-bold text-blue-600 mb-4'>
							Welcome to DVA Bootcamp!
						</h1>
						<p className='text-xl md:text-2xl text-gray-700 mb-2'>
							Your Journey into Tech Starts Here
						</p>
						<p className='text-gray-500 flex items-center justify-center'>
							<span className='inline-block w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2'>
								W
							</span>
							Instructor: Wisdom
						</p>
					</div>
				</section>

				{/* What is Tech Section */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='what-is-tech'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<h2 className='text-3xl md:text-4xl font-semibold text-purple-600'>
							What is Tech?
						</h2>
						<p className='text-xl text-gray-700'>
							Tech is all around you—apps, websites, AI, cloud services. If it
							runs on software, it's tech.
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
							<div className='bg-purple-50 p-6 rounded-xl'>
								<div className='text-purple-600 text-2xl mb-3'>🌐</div>
								<h3 className='font-medium text-xl mb-2'>Digital Platforms</h3>
								<ul className='text-gray-600 space-y-1'>
									<li>Instagram, Uber, YouTube</li>
									<li>Netflix, Amazon</li>
								</ul>
							</div>
							<div className='bg-purple-50 p-6 rounded-xl'>
								<div className='text-purple-600 text-2xl mb-3'>💻</div>
								<h3 className='font-medium text-xl mb-2'>
									Software & Services
								</h3>
								<ul className='text-gray-600 space-y-1'>
									<li>Cloud Computing</li>
									<li>Web Applications</li>
								</ul>
							</div>
							<div className='bg-purple-50 p-6 rounded-xl'>
								<div className='text-purple-600 text-2xl mb-3'>🤖</div>
								<h3 className='font-medium text-xl mb-2'>Emerging Tech</h3>
								<ul className='text-gray-600 space-y-1'>
									<li>Smart devices, AI</li>
									<li>Robotics, VR/AR</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Tech Jargon Section */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='tech-jargon'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<h2 className='text-3xl md:text-4xl font-semibold text-green-600'>
							Common Tech Jargon
						</h2>
						<p className='text-xl text-gray-700'>
							Understanding the language of tech is your first step toward
							mastery.
						</p>
						<div className='overflow-x-auto mt-6'>
							<table className='table-auto w-full text-left border-collapse'>
								<thead>
									<tr className='bg-green-50'>
										<th className='p-4 border border-green-100 rounded-tl-lg'>
											Term
										</th>
										<th className='p-4 border border-green-100 rounded-tr-lg'>
											Meaning
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='p-4 border border-green-100 font-medium'>
											Frontend
										</td>
										<td className='p-4 border border-green-100'>
											What users see & interact with
										</td>
									</tr>
									<tr className='bg-green-50'>
										<td className='p-4 border border-green-100 font-medium'>
											Backend
										</td>
										<td className='p-4 border border-green-100'>
											Behind-the-scenes logic & databases
										</td>
									</tr>
									<tr>
										<td className='p-4 border border-green-100 font-medium'>
											Full Stack
										</td>
										<td className='p-4 border border-green-100'>
											Both frontend and backend
										</td>
									</tr>
									<tr className='bg-green-50'>
										<td className='p-4 border border-green-100 font-medium'>
											API
										</td>
										<td className='p-4 border border-green-100'>
											Messenger between apps & services
										</td>
									</tr>
									<tr>
										<td className='p-4 border border-green-100 font-medium'>
											Cloud
										</td>
										<td className='p-4 border border-green-100'>
											Online data storage & services
										</td>
									</tr>
									<tr className='bg-green-50'>
										<td className='p-4 border border-green-100 font-medium'>
											Git
										</td>
										<td className='p-4 border border-green-100'>
											Tool to manage and track code changes
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>

				{/* Tech Ecosystem Section - Now Linking to Resources */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='tech-ecosystem'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-3xl md:text-4xl font-semibold text-blue-700'>
								The Tech Ecosystem
							</h2>
							<a
								href='#resources'
								className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200'
							>
								View Resources
							</a>
						</div>
						<p className='text-xl text-gray-700'>
							Discover the different roles that make up the tech industry and
							explore our curated learning resources for each path.
						</p>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
							{[
								{ role: 'Frontend/Backend Devs', icon: '👨‍💻', color: 'blue' },
								{ role: 'UI/UX Designers', icon: '🎨', color: 'pink' },
								{ role: 'QA Testers', icon: '🔍', color: 'yellow' },
								{ role: 'Product Managers', icon: '📊', color: 'indigo' },
								{ role: 'Data Analysts', icon: '📈', color: 'green' },
								{ role: 'Cybersecurity Experts', icon: '🔒', color: 'red' },
							].map((item, index) => (
								<div
									key={index}
									className={`bg-${item.color}-50 p-6 rounded-xl hover:shadow-md transition duration-200 cursor-pointer`}
								>
									<div className='text-2xl mb-2'>{item.icon}</div>
									<h3 className='font-medium text-lg'>{item.role}</h3>
									<p className='text-sm text-gray-500 mt-2'>
										Click to explore resources
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Skills You Can Learn Section */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='tech-skills'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<h2 className='text-3xl md:text-4xl font-semibold text-orange-600'>
							Skills You Can Learn
						</h2>
						<p className='text-xl text-gray-700'>
							Our bootcamp equips you with in-demand skills that employers are
							actively seeking.
						</p>
						<div className='overflow-x-auto mt-6'>
							<table className='table-auto w-full text-left border-collapse'>
								<thead>
									<tr className='bg-orange-50'>
										<th className='p-4 border border-orange-100 rounded-tl-lg'>
											Skill
										</th>
										<th className='p-4 border border-orange-100 rounded-tr-lg'>
											Tools/Tech Examples
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='p-4 border border-orange-100 font-medium'>
											Web Development
										</td>
										<td className='p-4 border border-orange-100'>
											HTML, CSS, JavaScript
										</td>
									</tr>
									<tr className='bg-orange-50'>
										<td className='p-4 border border-orange-100 font-medium'>
											UI/UX Design
										</td>
										<td className='p-4 border border-orange-100'>
											Figma, Adobe XD
										</td>
									</tr>
									<tr>
										<td className='p-4 border border-orange-100 font-medium'>
											Data Analytics
										</td>
										<td className='p-4 border border-orange-100'>
											Excel, SQL, Python
										</td>
									</tr>
									<tr className='bg-orange-50'>
										<td className='p-4 border border-orange-100 font-medium'>
											QA Testing
										</td>
										<td className='p-4 border border-orange-100'>
											Manual & Automated Tools
										</td>
									</tr>
									<tr>
										<td className='p-4 border border-orange-100 font-medium'>
											Digital Marketing
										</td>
										<td className='p-4 border border-orange-100'>
											SEO, Google Analytics
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<blockquote className='italic text-xl text-gray-600 border-l-4 border-orange-300 pl-6 py-2 mt-8'>
							"You don't need a degree. You need consistency."
						</blockquote>
					</div>
				</section>

				{/* Why Join Tech Section */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='why-join-tech'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<h2 className='text-3xl md:text-4xl font-semibold text-indigo-600'>
							What Makes Tech Amazing
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
							<div>
								<ul className='space-y-4'>
									{[
										{
											title: 'Remote Opportunities',
											desc: 'Work from anywhere in the world',
											icon: '🌎',
										},
										{
											title: 'High Demand',
											desc: 'Tech skills are sought after globally',
											icon: '📈',
										},
										{
											title: 'Good Compensation',
											desc: 'Competitive salaries and benefits',
											icon: '💰',
										},
									].map((item, index) => (
										<li key={index} className='flex items-start'>
											<span className='text-2xl mr-4'>{item.icon}</span>
											<div>
												<h3 className='font-medium text-lg'>{item.title}</h3>
												<p className='text-gray-600'>{item.desc}</p>
											</div>
										</li>
									))}
								</ul>
							</div>
							<div>
								<ul className='space-y-4'>
									{[
										{
											title: 'Global Community',
											desc: 'Connect with peers worldwide',
											icon: '👥',
										},
										{
											title: 'Creativity',
											desc: 'Express yourself through innovation',
											icon: '🎭',
										},
										{
											title: 'Accessibility',
											desc: 'Start from anywhere, at any age',
											icon: '🚪',
										},
									].map((item, index) => (
										<li key={index} className='flex items-start'>
											<span className='text-2xl mr-4'>{item.icon}</span>
											<div>
												<h3 className='font-medium text-lg'>{item.title}</h3>
												<p className='text-gray-600'>{item.desc}</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Your Mission Section */}
				<section
					className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
					id='mission'
				>
					<div className='max-w-4xl mx-auto space-y-6'>
						<h2 className='text-3xl md:text-4xl font-semibold text-pink-600'>
							Your Mission at DVA
						</h2>
						<p className='text-xl text-gray-700'>
							Our approach is designed to make you job-ready through practical
							experience.
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
							{[
								{
									title: 'Learn by Doing',
									icon: '🔨',
									desc: 'Hands-on projects from day one',
								},
								{
									title: 'Collaborate',
									icon: '🤝',
									desc: 'Work with peers on real challenges',
								},
								{
									title: 'Stay Curious',
									icon: '🔍',
									desc: 'Ask questions and explore',
								},
								{
									title: 'Build Portfolio',
									icon: '📁',
									desc: 'Create projects employers want',
								},
								{
									title: 'Network',
									icon: '🔗',
									desc: 'Connect with industry professionals',
								},
								{
									title: 'Become Job-Ready',
									icon: '🚀',
									desc: 'Develop skills that matter',
								},
							].map((item, index) => (
								<div
									key={index}
									className='bg-pink-50 p-6 rounded-xl text-center'
								>
									<div className='text-3xl mb-3'>{item.icon}</div>
									<h3 className='font-medium text-lg mb-2'>{item.title}</h3>
									<p className='text-gray-600 text-sm'>{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final Call to Action */}
				<section
					className='text-center space-y-6 bg-gradient-to-r from-green-500 to-blue-500 text-white p-10 rounded-2xl shadow-xl'
					id='final-note'
				>
					<div className='max-w-2xl mx-auto'>
						<h2 className='text-4xl md:text-5xl font-bold mb-4'>
							Let's Go! 🚀
						</h2>
						<p className='text-xl mb-6'>
							Tech isn't about being perfect. It's about learning fast, failing
							forward, and building boldly.
						</p>
						<p className='text-lg mb-8'>
							We're here to guide you every step of the way. Welcome to DVA!
						</p>
						<button className='px-8 py-3 bg-white text-blue-600 rounded-full font-medium text-lg hover:bg-blue-50 transition duration-200 shadow-lg'>
							Start Your Preview
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DVABootcampLaunchpad;
