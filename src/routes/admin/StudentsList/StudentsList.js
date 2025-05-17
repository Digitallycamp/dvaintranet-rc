import { NavLink, Outlet } from 'react-router-dom';

function StudentsList() {
	return (
		<div>
			<nav className='w-full h-20 flex items-center space-x-20  border-b-2 border-b-slate-50'>
				<NavLink
					to='/me/students'
					exact
					className={({ isActive }) =>
						isActive
							? ' text-sm font-semibold flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
							: ' text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
					}
				>
					All
				</NavLink>
				<NavLink
					to='/me/students/approved'
					exact
					className={({ isActive }) =>
						isActive
							? ' text-sm font-semibold flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
							: ' text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
					}
				>
					Approved
				</NavLink>
				<NavLink
					to='/me/students/not-approved'
					exact
					className={({ isActive }) =>
						isActive
							? ' text-sm font-semibold flex items-center gap-2 bg-slate-100 px-3 py-2 rounded'
							: ' text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition px-3 py-2 rounded'
					}
				>
					Not Approved
				</NavLink>
			</nav>

			<Outlet />
		</div>
	);
}

export default StudentsList;
