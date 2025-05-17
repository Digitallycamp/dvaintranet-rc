import { createContext, useContext, useEffect, useState } from 'react';
import {
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { fetchUser } from '../utils/user';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [role] = useState(null);
	const [isCurrentUser, setIsCurrentUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			try {
				if (currentUser) {
					setIsCurrentUser(currentUser);

					const unsubscribeUser = fetchUser(currentUser.uid, (userData) => {
						setUser(userData);
					});

					// Cleanup the user snapshot listener when the component unmounts
					return () => unsubscribeUser();
					// Fetch role from Firestore or a custom claim
				} else {
					setIsCurrentUser(null);

					setUser(null);
				}
			} catch (error) {
				console.error('Error in onAuthStateChanged:', error);
			} finally {
				setAuthLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	const loginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			if (!user) {
				throw new Error('No user returned from Google sign-in');
			}
			return user;
		} catch (error) {
			if (error.code === 'auth/popup-closed-by-user') {
				window.location.href = '/'; // Redirect as intended
			} else {
				console.error('Firebase Error: ', error.code, error.message);
				throw error; // Re-throw the error so the caller can handle it
			}
		}
	};

	// const signUpWithGoogle = async () => {
	// 	try {
	// 		const provider = new GoogleAuthProvider();
	// 		const result = await signInWithPopup(auth, provider);
	// 		const user = result.user;
	// 		return user;
	// 	} catch (error) {
	// 		if (error.code === 'auth/popup-closed-by-user') {
	// 			// Handle the case when the popup is closed by the user
	// 			window.location.href = '/signup'; // Replace with your desired redirect URL
	// 		} else {
	// 			// Handle other errors
	// 			console.error('Firebase Error: ', error);
	// 			console.error('Error during sign-up:', error.message);
	// 		}
	// 	}
	// };
	//grok chnage
	const signUpWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			if (!user) {
				throw new Error('No user returned from Google sign-in');
			}
			return user;
		} catch (error) {
			if (error.code === 'auth/popup-closed-by-user') {
				window.location.href = '/signup'; // Redirect as intended
			} else {
				console.error('Firebase Error: ', error.code, error.message);
				throw error; // Re-throw the error so the caller can handle it
			}
		}
	};

	const signOutUser = async () => {
		await signOut(auth);
	};
	return (
		<AuthContext.Provider
			value={{
				user,
				role,
				loginWithGoogle,
				signUpWithGoogle,
				signOutUser,
				isCurrentUser,
				authLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error('UseAuth not used in a provider');
	}
	return context;
};
