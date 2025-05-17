import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function useConnection() {
	const [isOnline, setIsOnline] = useState(navigator.onLine); // Initialize with the current connection state

	useEffect(() => {
		// Function to handle online event
		const handleOnline = () => {
			setIsOnline(true);
			toast.info('You are connected');
		};

		// Function to handle offline event
		const handleOffline = () => {
			setIsOnline(false);
			toast.error('You are not connected');
		};

		// Add event listeners for online and offline events
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return isOnline; // Return the current connection state
}

export default useConnection;
