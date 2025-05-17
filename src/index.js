import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import OnboardingScreen from './routes/OnboardingScreen';
import { AuthProvider } from './context/AuthContext';
import StudentsList from './routes/admin/StudentsList/StudentsList';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import Courses from './routes/Courses';
import CourseDetails from './routes/CourseDetails';

import MyCourses from './routes/MyCourses';
import All from './routes/admin/StudentsList/All';
import Approved from './routes/admin/StudentsList/Approved';
import NotApproved from './routes/admin/StudentsList/NotApproved';
import CourseLessons from './routes/CourseLessons';
import Profile from './routes/Profile';
import Certificate from './routes/Certificate';
import Payments from './routes/Payments';
import Assessments from './routes/Assessments';
import LaunchPad from './routes/admin/LaunchPad/LaunchPad';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import EditCourse from './routes/admin/CreateCourse/EditCourse';
const Login = lazy(() => import('./routes/Login'));
const SignUp = lazy(() => import('./routes/SignUp'));
const UserDashboardLayout = lazy(() =>
	import('./layout/shared/DashboardLayout')
);

const UserDashboard = lazy(() => import('./routes/UserDashboard'));
const AppSettings = lazy(() => import('./routes/admin/AppSettings/AppSetting'));
const CreateCourse = lazy(() =>
	import('./routes/admin/CreateCourse/CreateCourse')
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<Routes>
						{/* public route for both user and admin */}

						<Route
							index
							element={
								<Suspense fallback={<div>Loading...</div>}>
									{/* Ideally, wrap each lazy-loaded route separately: */}
									<Login />
								</Suspense>
							}
						/>
						<Route path='/signup' element={<SignUp />} />
						<Route path='/signin' element={<Login />} />
						<Route path='onboarding' element={<OnboardingScreen />} />
						{/* User routes */}
						<Route
							path='/me'
							element={
								<ProtectedRoute>
									<UserDashboardLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<UserDashboard />} />
							<Route path='settings' element={<h1>Setings</h1>} />
							<Route path='launch-pad' element={<LaunchPad />} />
							<Route path='courses' element={<Courses />} />
							<Route path='courses/edit/:id' element={<EditCourse />} />
							<Route path='my-courses' element={<MyCourses />} />
							<Route path='courses/:id' element={<CourseDetails />} />
							<Route path='profile' element={<Profile />} />
							<Route path='certificates' element={<Certificate />} />
							<Route path='certificates' element={<Certificate />} />
							<Route path='payment' element={<Payments />} />
							<Route path='assessments' element={<Assessments />} />
							{/* <Route path='lessons' element={<Lessons />} /> */}
							<Route
								path='my-courses/lessons/:id'
								element={<CourseLessons />}
							/>

							<Route
								path='app-settings'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<AppSettings />
									</ProtectedRoute>
								}
							/>
							<Route
								path='create-course'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<CreateCourse />
									</ProtectedRoute>
								}
							/>
							<Route
								path='students'
								element={
									<ProtectedRoute allowedRoles={['admin']}>
										<StudentsList />
									</ProtectedRoute>
								}
							>
								<Route
									index
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<All />
										</ProtectedRoute>
									}
								/>
								<Route
									path='approved'
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<Approved />
										</ProtectedRoute>
									}
								/>
								<Route
									path='not-approved'
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<NotApproved />
										</ProtectedRoute>
									}
								/>
								<Route
									path=':id'
									element={
										<ProtectedRoute allowedRoles={['admin']}>
											<h1>Student details</h1>
										</ProtectedRoute>
									}
								/>
							</Route>
						</Route>
						<Route
							path='*'
							element={<h1 className='text-center'>Not Found</h1>}
						/>
					</Routes>
				</AuthProvider>
			</ThemeProvider>

			<Toaster position='top-center' />
			<ToastContainer />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
