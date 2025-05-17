import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
	approveStudentCourse,
	getAllUsers,
	suspendUser,
} from '../../../utils/user';
import { Ellipsis, Eye, Trash2, UserCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAppSettings } from '../../../hooks/useAppSettings';

function All() {
	const { appDocData } = useAppSettings();
	const [registeredUsers, setRegisteredUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState(''); // State for search input
	const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
	const [openAction, setOpenAction] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state for initial data fetch
	const [isSearching, setIsSearching] = useState(false); // Loading state for search
	const [isSuspended, setIsSuspended] = useState(false); // Suspends user
	const [error, setError] = useState(null);
	const [sbatch, setSbatch] = useState();
	const batchName = appDocData.currentBatch;
	const { user } = useAuth();

	// Fetch all users on component mount
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await getAllUsers(user.role);

				setRegisteredUsers(users);
				setFilteredUsers(users); // Initialize filteredUsers with all users
			} catch (error) {
				setError('Failed to fetch users. Please try again.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [user.role]);

	// Handle opening/closing the action menu
	const handleOpenAction = (index) => {
		setOpenAction((prevIndex) => (prevIndex === index ? null : index));
	};

	// Handle approving a course for a user
	const handleApproved = async (userId, batchName, courseId) => {
		try {
			await approveStudentCourse(userId, batchName, courseId);
			toast.success('Course approved successfully!');

			// Update the local state to reflect the approval
			setRegisteredUsers((prevUsers) =>
				prevUsers.map((u) =>
					u.userId === userId
						? {
								...u,
								batches: {
									...u.batches,
									[batchName]: u.batches[batchName].map((course) =>
										course.courseID === courseId
											? { ...course, approved: true }
											: course
									),
								},
						  }
						: u
				)
			);
			setFilteredUsers((prevUsers) =>
				prevUsers.map((u) =>
					u.userId === userId
						? {
								...u,
								batches: {
									...u.batches,
									[batchName]: u.batches[batchName].map((course) =>
										course.courseID === courseId
											? { ...course, approved: true }
											: course
									),
								},
						  }
						: u
				)
			);
		} catch (error) {
			toast.error('Failed to approve course. Please try again.');
			console.error(error);
		}
	};

	// Handle search button click
	const handleSearch = async () => {
		setIsSearching(true); // Start searching
		try {
			const query = searchQuery.toLowerCase();
			const filtered = registeredUsers.filter((user) => {
				const fullname = user.fullname || 'Unknown'; // Fallback for missing fullname
				const email = user.email || 'Unknown'; // Fallback for missing email
				return (
					fullname.toLowerCase().includes(query) ||
					email.toLowerCase().includes(query)
				);
			});
			setFilteredUsers(filtered);
		} catch (error) {
			console.error('Error during search:', error);
			toast.error('Failed to perform search. Please try again.');
		} finally {
			setIsSearching(false); // Stop searching
		}
	};
	//GET USERS BY BATCH
	console.log('my', registeredUsers);
	const filteredStudent = registeredUsers.filter((student) => {
		const user = Object.keys(student.batches).includes(sbatch);
		return user;
	});
	console.log('YEEEE', filteredStudent);
	useEffect(() => {
		const handleFilterStudentByBatch = async () => {
			const filteredStudent = registeredUsers.filter((student) => {
				const user = Object.keys(student.batches) || '';
				return user.includes(sbatch);
			});
			setFilteredUsers(filteredStudent);
		};
		handleFilterStudentByBatch();
	}, [sbatch]);
	// Handles suspending user
	const handleSuspendUser = async (userId) => {
		setIsSuspended((prev) => !prev);

		await suspendUser(userId, isSuspended);
	};

	if (loading) {
		return <p>Loading users...</p>;
	}

	if (error) {
		return <p className='text-red-500'>{error}</p>;
	}

	console.log(sbatch);
	return (
		<div className='border border-slate-100 p-8 rounded-lg'>
			<div className='flex items-center mb-10'>
				<div>
					<label>Filter</label>
					<select
						value={sbatch}
						onChange={(e) => setSbatch(e.target.value)}
						className='border border-slate-600 px-4 h-10 rounded-lg focus:outline-0 focus:outline-slate-800'
					>
						<option>--Filter students by batch--</option>
						{appDocData?.batches.map((b, i) => (
							<option key={i}>{b}</option>
						))}
					</select>
				</div>
				<div className='flex justify-end w-full space-x-2'>
					<div>
						<input
							type='search'
							name='searchuser'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder='Search email or name'
							className='border border-slate-600 px-4 h-10 rounded-lg focus:outline-0 focus:outline-slate-800'
						/>
					</div>
					<button
						onClick={handleSearch}
						className='bg-slate-900 text-slate-100 px-3 rounded-lg h-10'
						disabled={isSearching} // Disable button while searching
					>
						{isSearching ? 'Searching...' : 'Search user'}
					</button>
				</div>
			</div>
			{isSearching ? (
				<p>Searching...</p> // Display loading indicator while searching
			) : (
				<table className='w-full table-auto '>
					<thead className='border-b-2 border-b-slate-200 overflow-x-auto'>
						<tr className='text-left py-4'>
							<th>Serial No</th>
							<th>Full Name</th>
							<th>Email</th>
							<th>WhatsApp No</th>
							<th>Role</th>
							<th>Approved</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user, index) => (
							<tr
								key={user.userId}
								className='cursor-pointer text-left py-4 border-b-2 h-12 hover:bg-slate-50'
							>
								<td>{index + 1}</td>
								<td>{user.fullname || 'Unknown'}</td>
								<td>{user.email || 'Unknown'}</td>
								<td>{user.whatsapp_no || 'N/A'}</td>
								<td>{user.role}</td>
								{/* <td>
									{user.batches?.[batchName]?.map((course) => (
										<div key={course.courseID}>
											<p>{course.courseID}</p>
										</div>
									))}
								</td> */}
								<td>
									{user.batches?.[batchName]?.map((course) => (
										<div key={course.courseID} className='space-x-2'>
											<span className='bg-green-200 px-2 py-1 rounded-lg text-xs text-slate-800 font-bold'>
												{course.approved ? 'Approved' : 'Pending'}
											</span>
										</div>
									))}
								</td>
								<td className='relative'>
									<Ellipsis onClick={() => handleOpenAction(index)} />
									{openAction === index && (
										<div className='absolute space-y-6 top-8 right-0 bg-white p-4 rounded-md shadow-sm transition-opacity duration-300 ease-in-out opacity-100 transform z-50'>
											{user.batches?.[batchName]?.map((course) => (
												<button
													key={course.courseID}
													onClick={() =>
														handleApproved(
															user.userId,
															batchName,
															course.courseID
														)
													}
													className='flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded-lg text-white text-xs'
												>
													<UserCheck size={12} />
													<span>Approve</span>
												</button>
											))}
											<Link
												to={`/me/students/${user.userId}`}
												className='flex items-center space-x-2 bg-slate-700 px-2 py-2 rounded-lg text-white text-xs'
											>
												<Eye size={12} /> <span>View More</span>
											</Link>
											<button
												onClick={() => handleSuspendUser(user.userId)}
												className='flex w-full items-center space-x-2 bg-red-700 px-2 py-2 rounded-lg text-white text-xs'
											>
												<Trash2 size={12} />
												<span>Suspend</span>
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default All;
