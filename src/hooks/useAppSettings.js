import { useEffect, useState } from 'react';
import { fetchAppSettings } from '../utils/appsettings';
import { toast } from 'react-toastify';

export function useAppSettings() {
	const [appDocData, setAppDocData] = useState({
		// Add default structure to prevent undefined issues
		app_name: '',
		currentBatch: '',
		batches: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const appData = await fetchAppSettings();

				if (appData?.data()) {
					setAppDocData(appData.data());
				}
			} catch (err) {
				console.log(err);
				console.log(err.message);
				if (
					err.message ===
					'Failed to get document because the client is offline.'
				) {
					toast.info('You are not connected to internet', {
						position: 'bottom-right',
					});
				}
				setError(err.mesage);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { appDocData, loading, error };
}
