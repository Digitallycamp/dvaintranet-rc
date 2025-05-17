export function useDeviceType() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/windows phone/i.test(userAgent)) {
		return 'Windows Phone';
	}
	if (/android/i.test(userAgent)) {
		return 'Android';
	}
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return 'iOS';
	}
	if (
		/Macintosh/.test(userAgent) &&
		navigator.maxTouchPoints &&
		navigator.maxTouchPoints > 1
	) {
		return 'iPad (M1 or newer)';
	}

	return 'Desktop';
}
