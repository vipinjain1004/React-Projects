import React, { useEffect } from 'react';
import { Outlet, useSubmit } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';
import { useLoaderData } from 'react-router';
import { getTokenDuration } from '../utils/LoginUtils';

function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}
		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'post' });
			return;
		}
		const tokenDuration = getTokenDuration();
		setTimeout(() => {
			submit(null, { action: '/logout', method: 'post' })
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