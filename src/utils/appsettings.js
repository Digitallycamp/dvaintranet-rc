/***
 * Admin can update `START NEW BOOTCAMP` form with
 * Admin can fetch all app settings
 *
 */

import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';

// SET UP APP FOR NEW BOOCAMP
export const updateNewBootcampAppSettings = async (app_name, new_batch) => {
	try {
		// Reference the specific document in the Firestore collection
		const docRef = doc(db, 'settings', 'SzF7uNtNAmkQFm9h1uNM'); // Replace 'YOUR_DOCUMENT_ID' with the actual ID

		// Prepare the data to update
		const docData = {
			app_name: app_name, // Update app_name field
			batches: arrayUnion(new_batch), // Append new_batch to batches array
		};

		// Update the document
		await updateDoc(docRef, docData);

		// Provide user feedback
		toast.success('App settings updated successfully!');
	} catch (error) {
		// Log and notify of errors
		console.error('Error updating app settings:', error);
		toast.error('Failed to update app settings.');
	}
};

// SET UP APP New Batch
export const updateCurrentBatchAppSettings = async (batchName) => {
	// i need collection, the setDoc method, i need the doc

	try {
		// Reference the specific document in the Firestore collection
		const docRef = doc(db, 'settings', 'SzF7uNtNAmkQFm9h1uNM'); // Replace 'YOUR_DOCUMENT_ID' with the actual ID

		// Prepare the data to update
		const docData = {
			currentBatch: batchName,
		};

		// Update the document
		await updateDoc(docRef, docData);

		// Provide user feedback
		toast.success('New Batch updated successfully!');
	} catch (error) {
		// Log and notify of errors
		console.error('Error updating app settings:', error);
		toast.error('Failed to update aNew Batch.');
	}
};
// FECH APP INFO
export const fetchAppSettings = async () => {
	const docRef = doc(db, 'settings', 'SzF7uNtNAmkQFm9h1uNM');

	const appsettingsDoc = await getDoc(docRef);
	if (!appsettingsDoc.exists()) {
		throw new Error('User not found.');
	}
	return appsettingsDoc;
};
