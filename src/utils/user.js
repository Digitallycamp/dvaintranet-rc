import {
	setDoc,
	doc,
	Timestamp,
	updateDoc,
	onSnapshot,
	serverTimestamp,
	arrayUnion,
	collection,
	getDocs,
	getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

import toast from 'react-hot-toast';
import { getCoursesByIds, getLessonsByCourseAndBatchIds } from './course';
import { getAuth } from 'firebase/auth';

// const currentBatch = 'batchA2025';
export async function setUser(userId, currentUserEmail) {
	// generate random number for student ID 8 digits
	const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

	const docData = {
		userId: userId,
		email: currentUserEmail,
		isSuspended: false,
		isCertIssued: false,
		hasCompletedOnboarding: false,
		role: 'user',
		registeredDate: Timestamp.now(),
		fullname: '',
		whatsapp_no: '',
		dob: { day: '', month: '' },
		age: '',
		education: '',
		previousKnowledge: '',
		techProficiency: '',
		bootcampCommitment: '',
		videoConferencingComfort: '',
		preferredClassTime: '',
		purpose: '',
		currentProfession: '',
		applicationReason: '',
		batches: {},
		studentID: `DVA-IT-${randomNumber}`,
	};
	const docReference = doc(db, 'users', userId);

	await setDoc(docReference, docData);
}

export async function onboardUser(userId, formValues) {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	if (!currentUser) {
		throw new Error('No authenticated user found');
	}
	if (!currentUser || currentUser.uid !== userId) {
		throw new Error('User not authenticated or UID mismatch');
	}
	const docData = {
		// userId: userId,
		fullname: formValues.fullname,
		// email: currentUserEmail,
		whatsapp_no: `${
			formValues.whatsapp_no.countryCode + formValues.whatsapp_no.number
		}`,
		dob: { day: formValues.dob.day, month: formValues.dob.month },
		age: formValues.age,
		// batches: {},
		education: formValues.education,
		previousKnowledge: formValues.previousKnowledge,
		techProficiency: formValues.techProficiency,
		bootcampCommitment: formValues.bootcampCommitment,
		videoConferencingComfort: formValues.videoConferencingComfort,
		preferredClassTime: formValues.preferredClassTime,
		purpose: formValues.purpose,
		currentProfession: formValues.currentProfession,
		applicationReason: formValues.applicationReason,
		// isSuspended: false,
		// isCertIssued: false,
		// hasCompletedOnboarding: false,

		timestamp: serverTimestamp(),
	};

	try {
		const docReference = doc(db, 'users', userId);
		const updatedData = await updateDoc(docReference, docData);

		return updatedData;
	} catch (error) {
		console.error('User onboarding failed:', error.message);
		throw error;
	}
}

export function hasCompletedOnboarding(userId, setComplete) {
	const docData = {
		hasCompletedOnboarding: setComplete,
	};

	const docReference = doc(db, 'users', userId);
	updateDoc(docReference, docData);
}
export async function fetchUserRole(userId) {
	console.log('0o0o0ikkj');
}

// export async function setUserFiledOnRegistration(userId) {
// 	try {
// 		const docReference = doc(db, 'users', userId);
// 		const unsubscribe = onSnapshot(docReference, (doc) => {
// 			return doc.data();
// 		});

// 		return unsubscribe;
// 	} catch (error) {
// 		console.log('failed to fetch student info', error.message);
// 	}
// }
//grok chanage
export async function setUserFiledOnRegistration(userId) {
	try {
		const docReference = doc(db, 'users', userId);
		const docSnapshot = await getDoc(docReference); // Use getDoc instead of onSnapshot for a one-time fetch
		if (docSnapshot.exists()) {
			return docSnapshot.data();
		} else {
			console.error('No such user exists after creation!');
			return null;
		}
	} catch (error) {
		console.error('Failed to fetch student info:', error.message);
		throw error;
	}
}

export async function fetchUser(userId, callback) {
	try {
		const docReference = doc(db, 'users', userId);
		const unsubscribe = onSnapshot(docReference, (docSnapshot) => {
			if (docSnapshot.exists()) {
				callback(docSnapshot.data());
			} else {
				console.error('No such user exists!');
				callback(null);
			}
		});

		// Return the unsubscribe function for cleanup
		return unsubscribe;
	} catch (error) {
		console.error('Failed to fetch user info:', error.message);
		callback(null);
		return () => {};
	}
}

/***FECT USER */
export async function getUser(userId) {
	try {
		const docReference = doc(db, 'users', userId);
		const docSnapshot = await getDoc(docReference);

		if (docSnapshot.exists()) {
			return docSnapshot.data();
		} else {
			console.error('No such user exists!');
			return null;
		}
	} catch (error) {
		console.error('Failed to fetch user info:', error.message);
		return null;
	}
}

/*****ADD COURSE TO USER BATCH COURSE */
export async function addCourseToBatch(userId, batchName, courseId) {
	// Prepare the course object
	const newCourse = {
		courseID: courseId,
		approved: false,
	};

	// Reference the user document
	const userRef = doc(db, 'users', userId);

	// Update the specific batch with the new course
	await updateDoc(userRef, {
		[`batches.${batchName}`]: arrayUnion(newCourse),
	});

	console.log(`Course ${courseId} added to batch ${batchName} with status `);
}
/*****APPROVE USER COURSE: UPDATE USER COURSE BY ATTEND */
// export async function approveStudentCourse(userId, batchName, courseId) {
// 	try {
// 		// Reference the user document
// 		const userRef = doc(db, 'users', userId);
// 		// Fetch the user's data
// 		const userDoc = await getDoc(userRef);
// 		if (!userDoc.exists()) {
// 			throw new Error('User not found.');
// 		}
// 		if (userDoc.data().role !== 'admin') {
// 			return toast.error('UnAuthorized!');
// 		}
// 		// Find the course in the specified batch
// 		const batch = userDoc.data().batches[batchName];
// 		if (!batch) {
// 			throw new Error('Batch not found.');
// 		}
// 		const courseIndex = batch.findIndex(
// 			(course) => course.courseID === courseId
// 		);
// 		if (courseIndex === -1) {
// 			throw new Error('Course not found.');
// 		}

// 		// Update the course's approved status
// 		const updatedBatch = batch.map((course, index) =>
// 			index === courseIndex ? { ...course, approved: true } : course
// 		);

// 		// Update the Firestore document
// 		await updateDoc(userRef, {
// 			[`batches.${batchName}`]: updatedBatch,
// 		});

// 		console.log(`Course ${courseId} approved for user ${userId}`);
// 		toast.success('Course approved successfully!');
// 	} catch (error) {
// 		console.error('Error approving course:', error);
// 		toast.error(error.message || 'Failed to approve course.');
// 	}
// }

export async function approveStudentCourse(userId, batchName, courseId) {
	const userRef = doc(db, 'users', userId);

	// Fetch the user's data
	const userDoc = await getDoc(userRef);
	if (!userDoc.exists()) {
		throw new Error('User not found.');
	}

	// Find the course in the specified batch
	const batch = userDoc.data().batches[batchName];
	if (!batch) {
		throw new Error('Batch not found.');
	}

	const updatedBatch = batch.map((course) =>
		course.courseID === courseId ? { ...course, approved: true } : course
	);

	// Update the Firestore document
	await updateDoc(userRef, {
		[`batches.${batchName}`]: updatedBatch,
	});
}
/***GET ALL USERS */

// export async function getAllUsers(role) {
// 	let registeredUsers = [];
// 	console.log('USERS LIST', registeredUsers);
// 	try {
// 		// Get all doc in a users colection
// 		const collectionRef = collection(db, 'users');

// 		// Check if currwcnt user has admin role

// 		if (role === 'admin') {
// 			// This logic is getting all users doc
// 			const querysnapshot = await getDocs(collectionRef);
// 			querysnapshot.forEach((doc) => {
// 				registeredUsers.push(doc.data());
// 			});
// 		}

// 		return registeredUsers;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export async function getAllUsers(role) {
	if (role !== 'admin') {
		throw new Error('You do not have permission to view this data.');
	}

	const collectionRef = collection(db, 'users');
	const querySnapshot = await getDocs(collectionRef);
	const users = querySnapshot.docs.map((doc) => ({
		userId: doc.id,
		...doc.data(),
	}));
	return users;
}

/**
 * @function suspendUser updates the user isSuspended property to true and user would be able to login again . They will get erorr , your accound is suspended while trying to login
 *
 **/

export async function suspendUser(userId, setIsSuspended) {
	try {
		const userRef = doc(db, 'users', userId);
		const docData = {
			isSuspended: setIsSuspended,
		};
		// Fetch the user's data
		const userDoc = await getDoc(userRef);
		console.log(userDoc.data());
		if (!userDoc.exists()) {
			throw new Error('User not found.');
		}

		// Update student suspended
		await updateDoc(userRef, docData);
		if (setIsSuspended) {
			toast.success('Student suspended');
		} else {
			toast.success('Student Unsuspended');
		}
	} catch (error) {
		console.error('Error updating student suspention:', error);
	}
}

/**@function showOnlyUserApprovedCourse : allows only user that have been approaved to see their course for each batch*/

// export async function showOnlyUserApprovedCourse(
// 	userId,
// 	selectedBatch,
// 	setApprovedCourses
// ) {
// 	// Get the current user's document
// 	const userRef = doc(db, 'users', userId);
// 	const userDoc = await getDoc(userRef);

// 	if (!userDoc.exists()) {
// 		throw new Error('User not found.');
// 	}

// 	// Get the batches for the user
// 	const batches = userDoc.data().batches;
// 	console.log(userDoc.data());
// 	// Check if the selected batch exists
// 	if (!batches || !batches[selectedBatch]) {
// 		setApprovedCourses([]); // No courses for the selected batch
// 		return;
// 	}

// 	// Filter approved courses for the selected batch
// 	const courses = batches[selectedBatch].filter(
// 		(course) => course.approved === true
// 	);

// 	// Extract course IDs
// 	const courseIds = courses.map((course) => course.courseID);
// 	console.log(courseIds);
// 	// Get the courses matching the course IDs
// 	const approvedCourses = await getCoursesByIds(courseIds);

// 	// Set the approved courses
// 	setApprovedCourses(approvedCourses);

// 	return approvedCourses;
// }

export async function showOnlyUserApprovedCourse(
	userId,
	selectedBatch,
	setApprovedCourses,
	setLessons
) {
	console.log('investigate sledcte batch', selectedBatch);
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
	const lessonsForApprovedCourses = await getLessonsByCourseAndBatchIds(
		courseIds,
		selectedBatch
	);
	console.log('MY LESSONS', lessonsForApprovedCourses);
	// Set the lessons
	setLessons(lessonsForApprovedCourses);

	return { approvedCourses, lessonsForApprovedCourses };
}

// const docData = {
// 	fullname: formValues.fullname,
// 	whatsapp_no: formValues.whatsapp_no,
// 	dob: { day: formValues.dob.day, month: formValues.dob.day },
// 	age: formValues.age,
// 	education: formValues.education,
// 	previousKnowledge: formValues.previousKnowledge,
// 	techProficiency: formValues.techProficiency,
// 	bootcampCommitment: formValues.bootcampCommitment,
// 	videoConferencingComfort: formValues.videoConferencingComfort,
// 	preferredClassTime: formValues.preferredClassTime,
// 	purpose: formValues.purpose,
// 	currentProfession: formValues.currentProfession,
// 	applicationReason: formValues.applicationReason,
// 	isSuspended: false,
// 	isCertIssued: false,
// 	hasCompletedOnboarding: false,
// 	timestamp: serverTimestamp(),
// 	batch1: {
// 		course1: {
// 			courseID456: {
// 				title: 'Firebase for Beginners',
// 				lessons: { lessonID789: { title: 'Introduction to Firebase' } },
// 			},
// 		},
// 		course2: {
// 			courseID101: {
// 				title: 'Advanced Firebase',
// 				lessons: { lessonID202: { title: 'Firebase Security' } },
// 			},
// 		},
// 	},
// 	batch2: {
// 		course1: {
// 			courseID456: {
// 				title: 'Firebase for Beginners',
// 				lessons: { lessonID789: { title: 'Introduction to Firebase' } },
// 			},
// 		},
// 		course2: {
// 			courseID101: {
// 				title: 'Advanced Firebase',
// 				lessons: { lessonID202: { title: 'Firebase Security' } },
// 			},
// 		},
// 	},
// };

// User colections

// {
// 	"users": {
// 	  "userID123": {
// 		"fullname": "John Doe",
// 		"batches": {
// 		  "batchA2025": ["courseID456", "courseID789"],
// 		  "batchB2025": ["courseID101"]
// 		}
// 	  }
// 	}
//   }

// courses collection

// {
// 	"courses": {
// 	  "courseID456": {
// 		"title": "HTML, CSS, JavaScript",
// 		"lessons": ["lessonID1", "lessonID2"]
// 	  },
// 	  "courseID789": {
// 		"title": "Full-Stack Development",
// 		"lessons": ["lessonID3"]
// 	  },
// 	  "courseID101": {
// 		"title": "UI/UX",
// 		"lessons": ["lessonID4"]
// 	  }
// 	}
//   }

// Lessons collections

// {
// 	"lessons": {
// 	  "lessonID1": { "title": "Introduction to HTML" },
// 	  "lessonID2": { "title": "CSS Basics" },
// 	  "lessonID3": { "title": "Backend Development" },
// 	  "lessonID4": { "title": "Introduction to UI/UX" }
// 	}
//   }

// import React, { useState, useEffect } from 'react';
// import db from './firebase';

// const BatchSelector = () => {
//   const [batches, setBatches] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [lessons, setLessons] = useState([]);

//   const userId = 'userID123'; // Replace with actual user ID

//   useEffect(() => {
//     const fetchBatches = async () => {
//       const userDoc = await db.collection('users').doc(userId).get();
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         setBatches(Object.keys(userData.batches));
//       }
//     };
//     fetchBatches();
//   }, [userId]);

//   useEffect(() => {
//     if (selectedBatch) {
//       const fetchCourses = async () => {
//         const userDoc = await db.collection('users').doc(userId).get();
//         if (userDoc.exists) {
//           const userData = userDoc.data();
//           const batchCourses = userData.batches[selectedBatch];

//           const coursePromises = batchCourses.map(courseId =>
//             db.collection('courses').doc(courseId).get()
//           );

//           const courseDocs = await Promise.all(coursePromises);
//           const courseList = courseDocs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setCourses(courseList);
//         }
//       };
//       fetchCourses();
//     }
//   }, [selectedBatch, userId]);

//   const handleBatchChange = (event) => {
//     setSelectedBatch(event.target.value);
//     setLessons([]);
//   };

//   const handleCourseClick = (courseId) => {
//     const selectedCourse = courses.find(course => course.id === courseId);
//     if (selectedCourse) {
//       const fetchLessons = async () => {
//         const lessonPromises = selectedCourse.lessons.map(lessonId =>
//           db.collection('lessons').doc(lessonId).get()
//         );

//         const lessonDocs = await Promise.all(lessonPromises);
//         const lessonList = lessonDocs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setLessons(lessonList);
//       };
//       fetchLessons();
//     }
//   };

//   return (
//     <div>
//       <h2>Select Batch</h2>
//       <select onChange={handleBatchChange} value={selectedBatch}>
//         <option value="">--Select Batch--</option>
//         {batches.map(batch => (
//           <option key={batch} value={batch}>{batch}</option>
//         ))}
//       </select>

//       {courses.length > 0 && (
//         <div>
//           <h3>Courses</h3>
//           <ul>
//             {courses.map(course => (
//               <li key={course.id} onClick={() => handleCourseClick(course.id)}>
//                 {course.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {lessons.length > 0 && (
//         <div>
//           <h3>Lessons</h3>
//           <ul>
//             {lessons.map(lesson => (
//               <li key={lesson.id}>{lesson.title}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatchSelector;

// UPDATE USER COURSE

// import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// const firestore = firebase.firestore(); // Initialize Firestore

// // Update user's registered courses in batch A 2025
// async function updateUserCourses(userID, newCourseID) {
//   const userRef = doc(firestore, 'users', userID);

//   try {
//     await updateDoc(userRef, {
//       'batches.batchA2025': arrayUnion(newCourseID)
//     });
//     console.log("Course registered successfully.");
//   } catch (error) {
//     console.error("Error updating course: ", error);
//   }
// }

// // Usage example
// const userID = "userID123";
// const newCourseID = "courseID112";
// updateUserCourses(userID, newCourseID);

// proper way of UPDATE USER COURSE

// const docData = {
//     'batches.batchA2025': arrayUnion(newCourseID),
// };

// const docReference = doc(db, 'users', userId);

// updateDoc(docReference, docData)
//     .then(() => {
//         console.log("Course registered successfully.");
//     })
//     .catch((error) => {
//         console.error("Error updating course: ", error);
//     });

/****THE DFFERENCE Ah, let me clarify! Using updateDoc with arrayUnion specifically helps to add a new course ID to the existing array without overriding it. The approach you suggested will replace the array with the new newCourseID value, potentially removing existing course IDs in batchA2025.

If you want to make sure you are only adding to the set of courses without overwriting them, here's the correct way: */

// Helper function to validate the fields being update
