import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';
import { Oval } from 'react-loader-spinner';
import {
	addLessonToCourse,
	createNewCourse,
	getCourses,
} from '../../../utils/course';
import CourseCard from '../../../components/users/CourseCard';
import { Timestamp } from 'firebase/firestore';
import { useAppSettings } from '../../../hooks/useAppSettings';

// function AddCourse() {
// 	return (
// 		<form className='bg-white p-6 rounded-md border border-slate-100 space-y-4 mt-6  w-full max-w-[512px]'>
// 			<div className=' flex flex-col space-y-2'>
// 				<lable>Title</lable>
// 				<input
// 					type='text'
// 					name='title'
// 					placeholder='Enter title'
// 					className='px-3 h-8 border border-slate-100 rounded-md outline-none '
// 				/>
// 			</div>
// 			<div className=' flex flex-col space-y-2 '>
// 				<lable>Title</lable>
// 				<input
// 					type='text'
// 					name='title'
// 					placeholder='Enter title'
// 					className='px-3 h-8 border border-slate-100 rounded-md   outline-none'
// 				/>
// 			</div>
// 			<div className=' flex flex-col space-y-2 '>
// 				<lable>Title</lable>
// 				<input
// 					type='text'
// 					name='title'
// 					placeholder='Enter title'
// 					className='px-3 h-8 border border-slate-100 rounded-md   outline-none'
// 				/>
// 			</div>
// 			<div className='pt-10 flex justify-end'>
// 				<button
// 					type='submit'
// 					className='px-3 h-8 bg-slate-950 text-white  font-bold rounded-md '
// 				>
// 					Create
// 				</button>
// 			</div>
// 		</form>
// 	);
// }

function AddCourse() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [intro, setIntro] = useState('');
	const [prerequisites, setPrerequisites] = useState('');
	const [includes, setIncludes] = useState(['']);
	const [careerPath, setCareerPath] = useState('');
	const [projects, setProjects] = useState(0);
	const [duration, setDuration] = useState('');
	const [skillLevel, setSkillLevel] = useState('');
	const [syllabus, setSyllabus] = useState([{ subject: '', content: [''] }]);
	const [isSubmitting, setIsSubmiting] = useState(false);

	// Handle dynamic includes
	const handleIncludeChange = (index, value) => {
		const updatedIncludes = [...includes];
		updatedIncludes[index] = value;
		setIncludes(updatedIncludes);
	};

	const addInclude = () => {
		setIncludes([...includes, '']);
	};

	const removeInclude = (index) => {
		setIncludes(includes.filter((_, i) => i !== index));
	};

	// Handle dynamic syllabus
	const handleSubjectChange = (index, value) => {
		const updatedSyllabus = [...syllabus];
		updatedSyllabus[index].subject = value;
		setSyllabus(updatedSyllabus);
	};

	const handleContentChange = (syllabusIndex, contentIndex, value) => {
		const updatedSyllabus = [...syllabus];
		updatedSyllabus[syllabusIndex].content[contentIndex] = value;
		setSyllabus(updatedSyllabus);
	};

	const addSyllabusSubject = () => {
		setSyllabus([...syllabus, { subject: '', content: [''] }]);
	};

	const removeSyllabusSubject = (index) => {
		setSyllabus(syllabus.filter((_, i) => i !== index));
	};

	const addContentToSubject = (syllabusIndex) => {
		const updatedSyllabus = [...syllabus];
		updatedSyllabus[syllabusIndex].content.push('');
		setSyllabus(updatedSyllabus);
	};

	const removeContentFromSubject = (syllabusIndex, contentIndex) => {
		const updatedSyllabus = [...syllabus];
		updatedSyllabus[syllabusIndex].content = updatedSyllabus[
			syllabusIndex
		].content.filter((_, i) => i !== contentIndex);
		setSyllabus(updatedSyllabus);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const courseData = {
			title,
			description,
			intro,

			Prerequisites: prerequisites,
			Includes: includes.filter((i) => i), // Remove empty entries
			'career path': careerPath,
			projects,

			Duration: duration,
			'skill level': skillLevel,
			syllabus: syllabus.filter(
				(subj) => subj.subject && subj.content.some((c) => c) // Ensure valid entries
			),
		};

		try {
			setIsSubmiting(true);
			console.log('Course Data:', courseData);
			alert('Course created successfully!');
			await createNewCourse(courseData);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmiting(false);
		}
	};

	return (
		<form
			className='bg-white p-6 rounded-md border border-slate-100 space-y-4 mt-6  w-full max-w-[512px]'
			onSubmit={handleSubmit}
		>
			<div className='flex flex-col space-y-2'>
				<label>Title</label>
				<input
					type='text'
					placeholder='Enter title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Description</label>
				<textarea
					placeholder='Enter description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='px-3 border border-slate-100 rounded-md outline-none'
				></textarea>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Introduction</label>
				<textarea
					placeholder='Enter introduction'
					value={intro}
					onChange={(e) => setIntro(e.target.value)}
					className='px-3 border border-slate-100 rounded-md outline-none'
				></textarea>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Prerequisites</label>
				<input
					type='text'
					placeholder='Enter prerequisites'
					value={prerequisites}
					onChange={(e) => setPrerequisites(e.target.value)}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			{/* Includes Section */}
			<div className='flex flex-col space-y-2'>
				<label>Includes</label>
				{includes.map((include, index) => (
					<div className='flex items-center space-x-2' key={index}>
						<input
							type='text'
							placeholder='Enter include'
							value={include}
							onChange={(e) => handleIncludeChange(index, e.target.value)}
							className='px-3 h-8 border border-slate-100 rounded-md outline-none'
						/>
						<button
							type='button'
							onClick={() => removeInclude(index)}
							className='text-red-500'
						>
							Remove
						</button>
					</div>
				))}
				<button
					type='button'
					onClick={addInclude}
					className='px-3 h-8 bg-slate-500 text-white font-bold rounded-md'
				>
					Add Include
				</button>
			</div>

			{/* Syllabus Section */}
			<div className='flex flex-col space-y-2'>
				<label>Syllabus</label>
				{syllabus.map((subject, syllabusIndex) => (
					<div key={syllabusIndex} className='border p-4 rounded-md'>
						<div className='flex items-center space-x-2 mb-2'>
							<input
								type='text'
								placeholder='Enter subject'
								value={subject.subject}
								onChange={(e) =>
									handleSubjectChange(syllabusIndex, e.target.value)
								}
								className='px-3 h-8 border border-slate-100 rounded-md outline-none'
							/>
							<button
								type='button'
								onClick={() => removeSyllabusSubject(syllabusIndex)}
								className='text-red-500'
							>
								Remove Subject
							</button>
						</div>
						<div className='ml-4'>
							{subject.content.map((content, contentIndex) => (
								<div
									key={contentIndex}
									className='flex items-center space-x-2 mb-2'
								>
									<input
										type='text'
										placeholder='Enter content'
										value={content}
										onChange={(e) =>
											handleContentChange(
												syllabusIndex,
												contentIndex,
												e.target.value
											)
										}
										className='px-3 h-8 border border-slate-100 rounded-md outline-none'
									/>
									<button
										type='button'
										onClick={() =>
											removeContentFromSubject(syllabusIndex, contentIndex)
										}
										className='text-red-500'
									>
										Remove
									</button>
								</div>
							))}
							<button
								type='button'
								onClick={() => addContentToSubject(syllabusIndex)}
								className='text-blue-500'
							>
								Add Content
							</button>
						</div>
					</div>
				))}
				<button
					type='button'
					onClick={addSyllabusSubject}
					className='px-3 h-8 bg-slate-500 text-white font-bold rounded-md'
				>
					Add Subject
				</button>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Career Path</label>
				<input
					type='text'
					placeholder='Enter career path Eg: Front end development'
					value={careerPath}
					onChange={(e) => setCareerPath(e.target.value)}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Number of Projects</label>
				<input
					type='number'
					placeholder='Enter number of projects'
					value={projects}
					onChange={(e) => setProjects(Number(e.target.value))}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Duration</label>
				<input
					type='text'
					placeholder='Enter duration EG: 6 Weeks'
					value={duration}
					onChange={(e) => setDuration(e.target.value)}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			<div className='flex flex-col space-y-2'>
				<label>Skill Level</label>
				<input
					type='text'
					placeholder='Enter skill level EG: Beginner'
					value={skillLevel}
					onChange={(e) => setSkillLevel(e.target.value)}
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
			</div>

			<div className='pt-10 flex justify-end'>
				<button
					disabled={isSubmitting}
					type='submit'
					className='px-3 h-8 bg-slate-950 text-white font-bold rounded-md'
				>
					{isSubmitting ? <Oval width={24} height={24} /> : 'Create Course'}
				</button>
			</div>
		</form>
	);
}

// function AddLessonToCourse() {
// 	return (
// 		<form className='bg-white p-6 rounded-md border border-slate-100  mt-6  w-full max-w-[512px] space-y-6'>
// 			<div className=' flex flex-col space-y-2'>
// 				<lable>Select Batch</lable>
// 				<select className='px-3 h-8 border border-slate-100 rounded-md outline-none '>
// 					<option>batchA2025</option>
// 					<option>batchB2025</option>
// 				</select>
// 			</div>
// 			<div className=' flex flex-col space-y-2'>
// 				<lable>CourseID</lable>
// 				<select className='px-3 h-8 border border-slate-100 rounded-md outline-none '>
// 					<option>--Select Course ID--</option>
// 					<option>ce1DXxxxldlVzT5aAaO5</option>
// 					<option>ce1DXxxxldlVzT5aAaO7</option>
// 				</select>
// 			</div>
// 			<div>
// 				<div className='space-y-6'>
// 					<div className=' flex flex-col space-y-2 '>
// 						<lable>Title</lable>
// 						<input
// 							type='text'
// 							name='lesson-title'
// 							placeholder='Enter lesson title'
// 							className='px-3 h-8 border border-slate-100 rounded-md   outline-none'
// 						/>
// 					</div>
// 					<div className=' dynamic flex flex-col space-y-2 '>
// 						<div className='flex items-end space-x-2 border rounded-md p-4'>
// 							<div className='flex flex-col  gap-2'>
// 								<lable>Lession Link</lable>
// 								<input
// 									size={100}
// 									type='url'
// 									name='lesson-url'
// 									placeholder='Enter url'
// 									className='px-3 h-8 border w-full border-slate-100 rounded-md   outline-none'
// 								/>
// 							</div>
// 							<button className=' px-3 h-8 bg-slate-500 text-white  font-bold rounded-md'>
// 								Remove
// 							</button>
// 						</div>
// 						<button className='Add lesson px-3 h-8 bg-slate-950 text-white  font-bold rounded-md'>
// 							Add Video Url
// 						</button>
// 					</div>
// 					<div className=' dynamic flex flex-col space-y-2 '>
// 						<div className='flex items-end space-x-2 border rounded-md p-4'>
// 							<div className='flex flex-col  gap-2'>
// 								<lable>Resources</lable>
// 								<input
// 									size={100}
// 									type='url'
// 									name='lesson-url'
// 									placeholder='Enter url'
// 									className='px-3 h-8 border w-full border-slate-100 rounded-md   outline-none'
// 								/>
// 							</div>
// 							<button className=' px-3 h-8 bg-slate-500 text-white  font-bold rounded-md'>
// 								Remove
// 							</button>
// 						</div>
// 						<button className='Add lesson px-3 h-8 bg-slate-950 text-white  font-bold rounded-md'>
// 							Add Resources
// 						</button>
// 					</div>
// 					<div className=' flex flex-col space-y-2 '>
// 						<lable>Description</lable>
// 						<textarea
// 							name='lesson-assessment'
// 							placeholder='Enter title'
// 							className='px-3 h-8 border border-slate-100 rounded-md   outline-none'
// 						></textarea>
// 					</div>
// 					<div className=' flex flex-col space-y-2 '>
// 						<lable>Assessment</lable>
// 						<textarea
// 							name='lesson-assessment'
// 							placeholder='Add assessment'
// 							className='px-3 h-8 border border-slate-100 rounded-md   outline-none'
// 						></textarea>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='pt-10 flex justify-end'>
// 				<button
// 					type='submit'
// 					className='px-3 h-8 bg-slate-950 text-white  font-bold rounded-md '
// 				>
// 					Add Lesson
// 				</button>
// 			</div>
// 		</form>
// 	);
// }

function AddLessonToCourse({ courseId, courseTitle }) {
	const { appDocData } = useAppSettings();
	const [batch, setBatch] = useState('');
	const [courseID, setCourseID] = useState(courseId);
	// const [lessonID, setLessonID] = useState('');
	const [title, setTitle] = useState('');
	const [videoUrls, setVideoUrls] = useState([{ id: Date.now(), url: '' }]); // Dynamic video URLs
	const [resources, setResources] = useState([{ id: Date.now(), url: '' }]); // Dynamic resources
	const [description, setDescription] = useState('');
	const [assessment, setAssessment] = useState('');
	const [error, setError] = useState({});
	const [isSubmitting, setIsubmitting] = useState(false);
	// Handle dynamic inputs for video URLs
	const handleVideoUrlChange = (id, value) => {
		setVideoUrls((prev) =>
			prev.map((video) => (video.id === id ? { ...video, url: value } : video))
		);
	};

	const addVideoUrl = () => {
		setVideoUrls([...videoUrls, { id: Date.now(), url: '' }]);
	};

	const removeVideoUrl = (id) => {
		setVideoUrls((prev) => prev.filter((video) => video.id !== id));
	};

	// Handle dynamic inputs for resources
	const handleResourceChange = (id, value) => {
		setResources((prev) =>
			prev.map((resource) =>
				resource.id === id ? { ...resource, url: value } : resource
			)
		);
	};

	const addResource = () => {
		setResources([...resources, { id: Date.now(), url: '' }]);
	};

	const removeResource = (id) => {
		setResources((prev) => prev.filter((resource) => resource.id !== id));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newError = {};

		if (!batch) newError.batch = 'Batch cannot be empty';
		if (!courseID) newError.courseID = 'Course ID cannot be empty';
		// if (!lessonID) newError.lessonID = 'Lesson ID cannot be empty';
		if (!title) newError.title = 'Title cannot be empty';
		if (videoUrls.some((video) => !video.url))
			newError.videoUrls = 'All video URLs must be filled';
		if (resources.some((resource) => !resource.url))
			newError.resources = 'All resource URLs must be filled';
		if (!description) newError.description = 'Description cannot be empty';
		if (!assessment) newError.assessment = 'Assessment cannot be empty';

		if (Object.keys(newError).length > 0) {
			return setError(newError);
		}
		// Gather all form data
		const formData = {
			assessment: { completed: false, assessment },
			batchID: batch,
			courseID,
			completed: false,
			createdAt: Timestamp.now(),
			description,
			resources: resources.map((resource) => resource.url).filter((url) => url),
			title,
			updatedAt: Timestamp.now(),
			videoURL: videoUrls.map((video) => video.url).filter((url) => url), // Filter out empty URLs
		};

		try {
			setIsubmitting(true);
			setError({});
			const startTime = Date.now(); // Record start time
			await addLessonToCourse(formData);
			// Calculate elapsed time and ensure spinner shows for at least 3 seconds
			const elapsedTime = Date.now() - startTime;
			if (elapsedTime < 3000) {
				await new Promise((resolve) => setTimeout(resolve, 3000 - elapsedTime));
			}
			// toast.success('Lesson sucessfully added');
		} catch (error) {
			console.log(error);
		} finally {
			setIsubmitting(false);
		}
	};

	return (
		<form
			className='bg-white p-6 rounded-md border border-slate-100 mt-6 w-full max-w-[512px] space-y-6'
			onSubmit={handleSubmit}
			key={courseId}
		>
			{/* Select Batch */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Select Batch</label>
				<select
					className='px-3 h-8 bg-white border  border-slate-100 rounded-md outline-none'
					value={batch}
					onChange={(e) => setBatch(e.target.value)}
				>
					<option value=''>--Select Batch--</option>
					{/* <option value='batchA2025'>batchA2025</option>
					<option value='batchB2025'>batchB2025</option> */}
					{appDocData.batches.map((b, i) => (
						<option key={i} value={b}>
							{b}
						</option>
					))}
				</select>
				{error.batch && (
					<span className='text-red-500 text-sm'>{error?.batch}</span>
				)}
			</div>

			{/* Course ID */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Course ID</label>
				<select
					className='px-3 h-8 bg-white border  border-slate-100 rounded-md outline-none'
					value={courseID}
					onChange={(e) => setCourseID(e.target.value)}
				>
					<option value={courseID}>{courseID}</option>
				</select>
				{error.courseID && (
					<span className='text-red-500 text-sm'>{error?.courseID}</span>
				)}
			</div>
			{/* LESSON ID */}
			{/* <div className='flex flex-col space-y-2'>
				<label className='text-xs'>Lesson ID</label>
				<select
					className='px-3 h-8 bg-white border border-slate-100 rounded-md outline-none'
					value={lessonID}
					onChange={(e) => setLessonID(e.target.value)}
				>
					<option value=''>--Select Lesson ID--</option>
					<option value='xYWsB2xyVXWpG0YCwPNl '> xYWsB2xyVXWpG0YCwPNl </option>
					<option value='xYWsB2xyVXWpG0YCwPN2'> xYWsB2xyVXWpG0YCwPN2 </option>
				</select>
				{error.lessonID && (
					<span className='text-red-500 text-sm'>{error?.lessonID}</span>
				)}
			</div> */}

			{/* Lesson Title */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Title</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Enter lesson title'
					className='px-3 h-8 border border-slate-100 rounded-md outline-none'
				/>
				{error.title && (
					<span className='text-red-500 text-sm'>{error?.title}</span>
				)}
			</div>

			{/* Dynamic Video URLs */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Video URLs</label>
				{videoUrls.map((video) => (
					<div key={video.id}>
						<div className='flex items-end space-x-2 border rounded-md p-4'>
							<input
								type='url'
								value={video.url}
								onChange={(e) => handleVideoUrlChange(video.id, e.target.value)}
								placeholder='Enter video URL'
								className='px-3 h-8 border w-full border-slate-100 rounded-md outline-none'
							/>
							<button
								type='button'
								onClick={() => removeVideoUrl(video.id)}
								className='px-3 h-8 bg-slate-500 text-white font-bold rounded-md'
							>
								Remove
							</button>
						</div>
						{error.videoUrls && (
							<p className='text-red-500 text-sm'>{error?.videoUrls}</p>
						)}
					</div>
				))}
				<button
					type='button'
					onClick={addVideoUrl}
					className='px-3 h-8 bg-slate-950 text-white font-bold rounded-md'
				>
					Add Video URL
				</button>
			</div>

			{/* Dynamic Resources */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Resources</label>
				{resources.map((resource) => (
					<div key={resource.id}>
						<div className='flex items-end space-x-2 border rounded-md p-4'>
							<input
								type='url'
								value={resource.url}
								onChange={(e) =>
									handleResourceChange(resource.id, e.target.value)
								}
								placeholder='Enter resource URL'
								className='px-3 h-8 border w-full border-slate-100 rounded-md outline-none'
							/>
							<button
								type='button'
								onClick={() => removeResource(resource.id)}
								className='px-3 h-8 bg-slate-500 text-white font-bold rounded-md'
							>
								Remove
							</button>
						</div>
						{error.resources && (
							<p className='text-red-500 text-sm'>{error?.resources}</p>
						)}
					</div>
				))}
				<button
					type='button'
					onClick={addResource}
					className='px-3 h-8 bg-slate-950 text-white font-bold rounded-md'
				>
					Add Resource
				</button>
			</div>

			{/* Lesson Description */}
			<div className='flex flex-col space-y-2'>
				<label className='text-xs'>Description</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Enter lesson description'
					className='px-3 border border-slate-100 rounded-md outline-none'
				></textarea>
				{error.description && (
					<span className='text-red-500 text-sm'>{error?.description}</span>
				)}
			</div>
			{/* Assessment */}
			<div className='flex flex-col space-y-2'>
				<label className='text-sm font-medium'>Assessment (Optional)</label>
				<textarea
					name='assessment'
					value={assessment}
					onChange={(e) => setAssessment(e.target.value)}
					placeholder='Enter assessment details'
					className='px-3 py-2 h-24 border border-slate-200 rounded-md outline-none focus:border-slate-400 transition-colors resize-y'
				/>
				{error.assessment && (
					<span className='text-red-500 text-sm'>{error?.assessment}</span>
				)}
			</div>
			<div className='pt-10 flex justify-end'>
				<button
					disabled={isSubmitting}
					type='submit'
					className='px-3 h-8 bg-slate-950 text-white text-center  font-bold rounded-md '
				>
					{isSubmitting ? <Oval width={24} height={24} /> : 'Add Lesson'}
				</button>
			</div>
		</form>
	);
}
function CreateCourse() {
	const [showModal, setShowModal] = useState(false);
	const [showAddLessonModal, setShowAddLessonModal] = useState(false);
	const [coursesList, setCoursesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [courseId, setCourseId] = useState();
	const [courseTitle, setCourseTitle] = useState();
	console.log(courseId);
	useEffect(() => {
		async function courses() {
			setIsLoading(true);

			try {
				// await Promise((resolve) => setTimeout(resolve, 1000));
				const course = await getCourses();

				setCoursesList(course);
			} catch (error) {
				if (error) {
					setError('Unable to get all courses, contact support');
				}
			} finally {
				setIsLoading(false);
			}
		}
		courses();
	}, []);
	console.log(coursesList);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Oval width={24} height={24} color='#080808' />
			</div>
		);
	}
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<div>
			<h1 className='text-2xl font-bold'>Courses</h1>
			<div className='my-10'>
				<button
					onClick={() => setShowModal(!showModal)}
					className='px-3 h-8 bg-slate-950 text-white font-bold rounded-md '
				>
					Create course
				</button>
			</div>
			<div>
				<div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
					{coursesList.map((courseList) => (
						<React.Fragment key={courseList.id}>
							<CourseCard
								{...courseList}
								handleClick={() => {
									console.log('clicked edit lesson');
									setCourseId(courseList.id);
									setCourseTitle(courseList.title);
									setShowAddLessonModal(!showAddLessonModal);
								}}
							/>
						</React.Fragment>
					))}
				</div>
			</div>
			{showModal && (
				<Modal
					title='Create Course'
					handleModalClick={() => setShowModal(!showModal)}
				>
					<AddCourse />
				</Modal>
			)}
			{showAddLessonModal && (
				<Modal
					title='Add Lesson'
					handleModalClick={() => {
						setShowAddLessonModal(!showAddLessonModal);
					}}
				>
					<AddLessonToCourse courseId={courseId} courseTitle={courseTitle} />
				</Modal>
			)}
		</div>
	);
}

export default CreateCourse;
