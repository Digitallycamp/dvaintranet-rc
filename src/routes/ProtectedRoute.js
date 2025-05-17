import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLoader from '../components/shared/AuthLoader';

function ProtectedRoute({ children, allowedRoles }) {
	const { user, isCurrentUser, authLoading } = useAuth();

	if (authLoading) {
		return <AuthLoader />; // Show a loading indicator
	}
	if (!isCurrentUser) {
		return <Navigate to='/' replace={true} />;
	}

	if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
		return <Navigate to='/me' replace />;
	}

	return <>{children}</>;
}

export default ProtectedRoute;
