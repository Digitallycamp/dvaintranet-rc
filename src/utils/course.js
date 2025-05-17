/****fetch user data **/
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

export async function createNewCourse(courseData) {
	const collectionRef = collection(db, 'courses');
	try {
		const docRef = await addDoc(collectionRef, courseData);
		if (docRef.id) {
			toast.success('Course Created successfully');
		} else {
			toast.errors('Failed to create course');
		}
	} catch (error) {
		console.log(error.message);
		toast.error(error.message);
	}
}
export async function getCourses() {
	let courses = [];
	console.log(courses);
	try {
		/**Get all doc in a colection**/
		const collectionRef = collection(db, 'courses');
		/** This logic is getting all the courses doc  */
		const querysnapshot = await getDocs(collectionRef);
		querysnapshot.forEach((doc) => {
			courses.push({ id: doc.id, ...doc.data() });
		});

		return courses;
	} catch (error) {
		console.log(error);
	}
}

export async function getCoursesByIds(ids) {
	let courses = [];
	try {
		/** Get docs by IDs **/
		const collectionRef = collection(db, 'courses');
		for (let id of ids) {
			const docRef = doc(collectionRef, id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				courses.push({ id: docSnap.id, ...docSnap.data() });
			}
		}
		return courses;
	} catch (error) {
		console.log(error);
		return [];
	}
}

// Fetch Lessons by Course and Batch IDs
//function to fetch lessons by both course and batch IDs:

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

export const studentMarkLessonAsCompleted = async (
	lessonId,
	completedLesson
) => {
	try {
		// reference to the doc you want to
		const userRef = doc(db, 'lessons', lessonId);
		const docData = {
			completed: completedLesson,
		};
		// Fetch the lesson data
		const lessonDoc = await getDoc(userRef);
		console.log(lessonDoc.data());
		if (!lessonDoc.exists()) {
			throw new Error('Lesson not found.');
		}

		// Update the lesson document with the new `completed` value
		await updateDoc(userRef, docData);
		// Show appropriate toast message
		if (completedLesson) {
			toast.success('You marked the lesson as Completed');
		} else {
			toast.success('You marked the lesson as Uncompleted');
		}
	} catch (error) {
		console.error('Error updating lesson completion:', error);
	}
};

export const addLessonToCourse = async (data) => {
	const collectionRef = collection(db, 'lessons');

	try {
		const docRef = await addDoc(collectionRef, data);

		if (docRef.id) {
			toast.success('Lesson sucessfully added');
		}
	} catch (error) {
		console.log(error.message | 'Error ading lesson');
	}
};

export const studentSubmitAssessment = async (assessmentData) => {
	const collectionRef = collection(db, 'students_assessment');
	try {
		const docRef = await addDoc(collectionRef, assessmentData);
		if (docRef.id) {
			toast.success('Assessment submitted successfully');
		} else {
			toast.error('Assessment not submitted ');
		}
	} catch (error) {
		toast.error(error.message | 'Something went wrong ');
	}
};

export const getAssessmentByUser = async (userId) => {
	const collectionRef = collection(db, 'students_assessment');
	try {
		// Create a query to filter documents by userId
		const q = query(collectionRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		// Extract assessments data from the query result
		const assessments = querySnapshot.docs.map((doc) => ({
			id: doc.id, // Include the document ID if needed
			...doc.data(),
		}));

		return assessments; // Return the retrieved assessments
	} catch (error) {
		console.error('Error fetching assessments:', error);
		throw new Error('Could not retrieve assessments');
	}
};
