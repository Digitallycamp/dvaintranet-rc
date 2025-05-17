import React, { useEffect, useState } from 'react';
import RouteLoader from './components/shared/RouteLoader';
import { MenuIcon } from 'lucide-react';

function DashboardTemplate() {
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingScreen(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	if (loadingScreen) {
		return <RouteLoader />;
	}

	const handleToggleMenue = () => {
		setOpenMenu(!openMenu);
	};
	return (
		<div>
			<nav className='h-32 w-full shadow-lg bg-white fixed z-50 md:hidden flex justify-between items-center px-4'>
				<MenuIcon
					size={32}
					onClick={handleToggleMenue}
					className=' cursor-pointer'
				/>
			</nav>
			<div className=' grid grid-cols-1 md:grid md:grid-cols-[2fr_10fr]'>
				<aside
					className={` transform ${
						openMenu ? 'translate-y-0' : '-translate-x-full'
					} transition-transform duration-500 ease-in-out md:translate-x-0  md:block md:w-full md:h-screen  bg-black/10 md:bg-white border-r border-r-[#CACFD6] fixed top-[128px]  md:static md:top-0 w-full  h-screen shadow-lg`}
				>
					<div className='flex flex-col bg-white w-[90%] h-full'>
						<a href='#'>Dashboard</a>
						<a href='#'>Dashboard</a>
						<a href='#'>Dashboard</a>
						<a href='#'>Dashboard</a>
						<a href='#'>Dashboard</a>
					</div>
				</aside>
				<section className='w-full bg-white  md:h-screen md:overflow-y-scroll pb-9 px-6  pt-40 md:pt-4   '>
					<div className='bg-white   '>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along.
						</p>
						<p>
							Welcome to the tutorial! We'll be building a small, but
							feature-rich app that lets you keep track of your contacts. We
							expect it to take between 30-60m if you're following along. 1900
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}

export default DashboardTemplate;
