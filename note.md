Got it. Given that both batches and lessons change while the courses remain the same, you should include fields to track batch-specific information in both your user and lessons collections. Here's how you can structure it:

improve this code

```js
export async function showOnlyUserApprovedCourse(
	userId,
	selectedBatch,
	setApprovedCourses,
	setLessons
) {
	// Get the current user's document
	const userRef = doc(db, 'users', userId);
	const userDoc = await getDoc(userRef);

	if (!userDoc.exists()) {
		throw new Error('User not found.');
	}

	// Get the batches for the user
	const batches = userDoc.data().batches;

	// Check if the selected batch exists
	if (!batches || !batches[selectedBatch]) {
		setApprovedCourses([]); // No courses for the selected batch
		setLessons([]); // No lessons for the selected batch
		return;
	}

	// Filter approved courses for the selected batch
	const courses = batches[selectedBatch].filter(
		(course) => course.approved === true
	);

	// Extract course IDs
	const courseIds = courses.map((course) => course.courseID);
	console.log(courseIds);

	// Get the courses matching the course IDs
	const approvedCourses = await getCoursesByIds(courseIds);

	// Set the approved courses
	setApprovedCourses(approvedCourses);

	// Get the lessons for the approved courses and the selected batch
	const lessons = await getLessonsByCourseAndBatchIds(courseIds, selectedBatch);

	// Set the lessons
	setLessons(lessons);

	return { approvedCourses, lessons };
}
```

Fetch Lessons by Course and Batch IDs
You will need a function to fetch lessons by both course and batch IDs:

```js
export async function getLessonsByCourseAndBatchIds(courseIds, batchId) {
	let lessons = [];
	try {
		/** Get lessons by course IDs and batch ID **/
		const collectionRef = collection(db, 'lessons');
		for (let courseId of courseIds) {
			const q = query(
				collectionRef,
				where('courseID', '==', courseId),
				where('batchID', '==', batchId)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				lessons.push({ id: doc.id, ...doc.data() });
			});
		}
		return lessons;
	} catch (error) {
		console.log(error);
		return [];
	}
}
```

Update the UI to Display Lessons
Ensure your RegisteredCourseCard component handles the lessons appropriately:

```js
function RegisteredCourseCard(props) {
	const {
		id,
		title,
		Duration: duration,
		'career path': careerPath,
		'skill level': skillLevel,
		approved,
		lessons, // Add lessons prop
	} = props;

	const slug = createSlug(title);

	if (!approved) {
		return null; // Don't render the component if the course is not approved
	}

	return (
		<div className='border border-zinc-100 rounded-lg hover:bg-zinc-50 shadow-zinc-100 p-6 flex flex-col space-y-6 h-full'>
			<div className='flex-grow'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p className='text-zinc-500 text-sm'>({careerPath})</p>
			</div>
			<div className='flex justify-between items-center text-zinc-500'>
				<div className='flex space-x-2'>
					<Clock size={18} />
					<span className='text-xs'>Duration :{duration}</span>
				</div>
				<span>{skillLevel}</span>
			</div>
			<div>
				<h3 className='text-lg font-semibold'>Lessons</h3>
				<ul>
					{lessons.map((lesson) => (
						<li key={lesson.id}>
							<Link to={`/me/lessons/${lesson.id}`} className='text-blue-500'>
								{lesson.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div>
				<Link
					to={`/me/lessons/${slug}?msockid=${id}`}
					className='bg-zinc-900 text-zinc-300 font-semibold px-3 py-2 rounded-md mt-auto cursor-pointer'
					state={props}
				>
					Go to lessons
				</Link>
			</div>
		</div>
	);
}
```

LESSION COLLECTION
lessons (collection)
|
├── lessonId (document)
| ├── title: string // Title of the lesson
| ├── description: string // Description of the lesson
| ├── assessment: map // lesson assessment
| ├── courseID: string // ID of the course this lesson belongs to
| ├── batchID: string // ID of the batch this lesson is associated with
| ├── duration: string // Duration of the lesson (e.g., "1 hour")
| ├── videoURL: Array // URL(2) to the lesson video
| ├── resources: Array // URL to the lesson resource
| ├── order: number // Order of the lesson in the course
| ├── createdAt: timestamp // Timestamp of lesson creation
| └── updatedAt: timestamp // Timestamp of the last update
|
├── lessonId (document)
| ├── ... // Fields for another lesson
|
└── ...
