import React, { useEffect } from 'react';
import { Outlet, useSubmit } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';
import { useLoaderData } from 'react-router';
import { getTokenDuration } from '../utils/LoginUtils';
import { useDispatch} from 'react-redux';
import {authenticationAction} from '../store/ReduxAuthentication';

function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();
	const dispatch = useDispatch();
	useEffect(() => {		
		if (!token.auth) {
			return;
		}
		if (token.auth === 'EXPIRED') {
			dispatch(authenticationAction.logout());
			return;
		}
		const tokenDuration = getTokenDuration();
		dispatch(authenticationAction.login({payload : token.auth}));		
		setTimeout(() => {
			// submit(null, { action: '/logout', method: 'post' })
			dispatch(authenticationAction.logout());
		}, tokenDuration)
	}, [token, submit]);
	return (
		<React.Fragment>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
}
export default RootLayout;