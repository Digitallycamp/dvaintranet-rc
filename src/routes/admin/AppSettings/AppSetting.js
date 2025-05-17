import React, { useEffect, useState } from 'react';

import { useAppSettings } from '../../../hooks/useAppSettings';
import {
	updateCurrentBatchAppSettings,
	updateNewBootcampAppSettings,
} from '../../../utils/appsettings';
import { toast } from 'react-toastify';

function AppSetting() {
	const { appDocData, loading, error } = useAppSettings();

	const [appDoc, setAppDoc] = useState({
		app_name: '',
		currentBatch: '',
		batches: [],
	});

	// Update `appDoc` state when `appDocData` is fetched
	useEffect(() => {
		if (appDocData) {
			setAppDoc({
				app_name: appDocData.app_name,
			});
		}
	}, [appDocData]); // Run whenever appDocData changes

	if (loading) {
		return <p>Loading</p>;
	}
	if (error) {
		return <p>Could not fetch app settings</p>;
	}

	const haddleChange = (e) => {
		const value = e.target.value;
		const formName = e.target.name;
		setAppDoc((data) => ({ ...data, [formName]: value }));
	};

	async function handleSetNewBootcamp(e) {
		e.preventDefault();
		try {
			await updateNewBootcampAppSettings(appDoc.app_name, appDoc.batches);
		} catch (error) {
			console.log(error);
		}
	}
	async function handleSetCurrentBatch(e) {
		e.preventDefault();
		if (
			appDoc.currentBatch === '--Set Current Batch--' ||
			appDoc.currentBatch === ''
		) {
			return toast.info('Filled can not be empty');
		}
		try {
			await updateCurrentBatchAppSettings(appDoc.currentBatch);
		} catch (error) {
			console.log(error);
		}
	}
	console.log('from data', appDocData.batches);
	console.log('DOC data', appDoc);
	return (
		<div className='p-8 max-w-lg mx-auto bg-white border rounded-lg '>
			<h3 className='text-2xl font-bold my-6'>Start New Bootcamp</h3>
			<form className='space-y-4' onSubmit={handleSetNewBootcamp}>
				<div>
					<input
						name='app_name'
						value={appDoc.app_name || ''}
						type='text'
						placeholder='App Name'
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={haddleChange}
					/>
					<span className='text-red-500 text-sm'></span>
				</div>
				<div>
					<label className='block text-gray-700 font-medium mb-2'>
						Enter batch name
					</label>
					<input
						name='batches'
						value={appDoc.batches || ''}
						type='text'
						placeholder='Create new batch name'
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						onChange={haddleChange}
					/>
					<span className='text-red-500 text-sm'></span>
				</div>
				<button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
					Create
				</button>
			</form>

			<hr className='my-8' />

			<form className='space-y-4' onSubmit={handleSetCurrentBatch}>
				<div className='md:flex md:justify-between md:items-center'>
					<h3 className='text-2xl font-bold my-6'>Set current Batch</h3>
					<span className='bg-green-50 p-4 text-xs rounded-full'>
						CURRENT BATCH: {appDocData.currentBatch}
					</span>
				</div>

				<div>
					<select
						name='currentBatch'
						value={appDoc.currentBatch || ''}
						onChange={haddleChange}
						className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					>
						<option>--Set Current Batch--</option>
						{appDocData &&
							appDocData?.batches.map((options, index) => {
								return <option key={index}>{options}</option>;
							})}
					</select>
					<span className='text-red-500 text-sm'></span>
				</div>
				<button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
					Update
				</button>
			</form>
		</div>
	);
}

export default AppSetting;
