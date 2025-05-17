import React, { useContext, useEffect, useState } from 'react';
import RouteLoader from '../../components/shared/RouteLoader';
import {
	BookPlus,
	BookUser,
	GraduationCap,
	House,
	LogOut,
	MenuIcon,
	Rocket,
	SquareChartGantt,
	Settings,
	ChevronDownIcon,
	BookOpenText,
	UsersRound,
} from 'lucide-react';
import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useDeviceType } from '../../hooks/useDeviceType';
import { useAuth } from '../../context/AuthContext';
import dvalogo from '../../assets/dva_logo.svg';
import { useAppSettings } from '../../hooks/useAppSettings';
import { ThemeContext } from '../../context/ThemeContext';

function DashboardLayout() {
	const { appDocData, loading } = useAppSettings();
	const { darkMode, setDarkMode } = useContext(ThemeContext);
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [openMenu, setOpenMenu] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const deviceType = useDeviceType();
	const location = useLocation();
	const navigate = useNavigate();
	const { user, signOutUser } = useAuth();
	useEffect(() => {
		if (user && !user.hasCompletedOnboarding) {
			navigate('/onboarding');
		}
	}, [user, navigate]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingScreen(false);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	if (loadingScreen) {
		return <RouteLoader />;
	}

	if (loading) {
		return <p>Loading app data</p>;
	}

	const handleToggleMenu = (e) => {
		e.stopPropagation();
		setOpenMenu(!openMenu);
	};

	const handleSignOut = async () => {
		try {
			await signOutUser();
			navigate('/signin');
		} catch (error) {
			console.log('Failed to signOut');
		}
	};
	// Navigation Links
	const commonLinks = [
		{ to: '/me', icon: <House size={18} />, label: 'Dashboard' },
		{ to: '/me/launch-pad', icon: <Rocket size={18} />, label: 'Launch Pad' },
		{ to: '/me/courses', icon: <BookUser size={18} />, label: 'Courses' },
		{
			to: '/me/my-courses',
			icon: <BookOpenText size={18} />,
			label: 'My Courses',
		},
		// { to: '/me/lessons', icon: <TvMinimal size={18} />, label: 'Lessons' },
		{
			to: '/me/assessments',
			icon: <SquareChartGantt size={18} />,
			label: 'Assessments',
		},
		{
			to: '/me/certificates',
			icon: <GraduationCap size={18} />,
			label: 'Certificates',
		},
		{
			to: '/me/payment',
			icon: <GraduationCap size={18} />,
			label: 'Payment',
		},
	];

	const adminLinks = [
		{
			to: '/me/app-settings',
			icon: <Settings size={18} />,
			label: 'App Settings',
		},
		{
			to: '/me/create-course',
			icon: <BookPlus size={18} />,
			label: 'Create Courses',
		},
		{ to: '/me/students', icon: <UsersRound size={18} />, label: 'Students' },
	];

	const togglePopup = () => {
		setShowPopup(!showPopup);
	};
	return (
		<div>
			{/* Mobile Navigation */}
			<nav className='h-20 w-full shadow-lg bg-white fixed md:hidden flex justify-between items-center px-4'>
				<MenuIcon
					size={32}
					onClick={handleToggleMenu}
					className='cursor-pointer'
				/>
			</nav>

			<div className='grid grid-cols-1 md:grid md:grid-cols-[2fr_10fr]'>
				{/* Sidebar */}
				<aside
					className={` custom-scrollbar transform pb-6  ${
						openMenu
							? 'translate-y-0 overflow-y-auto h-screen '
							: '-translate-x-full h-screen'
					} transition-transform duration-500 ease-in-out md:translate-x-0 md:block md:w-full md:h-screen bg-black/10 md:bg-white border-r border-r-[#CACFD6] fixed top-0 md:static md:top-0 w-full h-screen shadow-lg overflow-y-auto`}
					onClick={handleToggleMenu}
				>
					<div className='flex  w-full justify-center items-center h-20 flex-col'>
						<img src={dvalogo} alt='DVA Academy' width={48} />
						<strong>{appDocData?.app_name}</strong>
					</div>

					<div
						className={`links flex flex-col justify-between bg-white w-[85%] h-full pl-6 ${
							deviceType === 'iOS' ? 'pt-12 pb-44' : 'pt-8'
						} md:pl-6 pb-32`}
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex flex-col gap-2'>
							{/* Render common links */}
							{commonLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									exact
									onClick={handleToggleMenu}
									className={() =>
										location.pathname === link.to
											? ' text-sm font-semibold flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
											: ' text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
									}
								>
									{link.icon} {link.label}
								</NavLink>
							))}

							{/* Render admin-specific links if role is admin */}
							{user?.role === 'admin' && (
								<>
									<hr></hr>
								</>
							)}
							{user?.role === 'admin' &&
								adminLinks.map((link) => (
									<NavLink
										key={link.to}
										to={link.to}
										onClick={handleToggleMenu}
										className=' text-sm font-semibold flex items-center  gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
									>
										{link.icon} {link.label}
									</NavLink>
								))}
						</div>
						<div className='pt-8'>
							<button
								onClick={handleSignOut}
								className=' text-sm font-semibold flex items-start gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
							>
								<LogOut size={18} /> Logout
							</button>
						</div>
					</div>
				</aside>

				{/* Main Content Area */}
				<section
					className={`w-full bg-white md:h-screen md:overflow-y-scroll    ${
						deviceType === 'iOS' ? 'pt-12 pb-44' : 'pt-8'
					}`}
				>
					{/* <nav className=' hidden md:flex items-center justify-end pr-[300px] space-x-2 border-b border-slate-500 h-20  fixed top-0 z-50 w-full'>
						<div>
							<div className='flex flex-col items-end '>
								<strong>{user?.fullname}</strong>
								<span className='text-xs'>DVA-IT-0451290</span>
							</div>
							<ChevronDownIcon className=' cursor-pointer' />
						</div>
						<div className='hidden w-60 absolute top-0 right-[300px] bg-red-400 rounded-sm'>
							<span>{user?.email}</span>
							<hr />
							<ul>
								<li>
									<Link>Profile</Link>
								</li>
								<li>
									<Link>Certificates</Link>
								</li>
								<li>
									<Link>Courses</Link>
								</li>

								<butt>Logout</butt>
							</ul>
						</div>
					</nav> */}
					<nav className='hidden md:flex items-center justify-end pr-[300px] space-x-2 bg-white border-b border-slate-500 h-20 fixed top-0 z-50 w-full'>
						<div className='flex items-center space-x-4'>
							<div className='flex flex-col items-end'>
								<strong>{user?.fullname}</strong>
								<span className='text-xs'>
									{user?.studentID ? user?.studentID : 'DVA-IT-0451290'}
								</span>
							</div>
							<ChevronDownIcon
								className='cursor-pointer'
								onClick={togglePopup}
							/>
						</div>
						{showPopup && (
							<div className='popup w-80 absolute top-16 right-[324px] bg-white shadow-sm rounded-sm p-6 space-y-3'>
								<span>{user?.email}</span> <hr />
								<ul className='space-y-3'>
									<li>
										<Link to='/me/profile'>Profile</Link>
									</li>
									<li>
										<Link to='/me/certificates'>Certificates</Link>
									</li>
									{/* <li>
										<Link to='/me/courses'>Courses</Link>
									</li> */}
									<li>
										<Link to='/me/my-courses'>My Courses</Link>
									</li>
									<li>
										<button onClick={handleSignOut}>Logout</button>
									</li>
									<li>
										<button onClick={() => setDarkMode(!darkMode)}>
											{darkMode ? 'DarkMod' : 'LightMod'}
										</button>
									</li>
								</ul>
							</div>
						)}
					</nav>
					<div className={`bg-white px-6 md:pr-[64px] pt-14 md:pt-20 pb-20`}>
						<Outlet />
					</div>
				</section>
			</div>
		</div>
	);
}

export default DashboardLayout;
