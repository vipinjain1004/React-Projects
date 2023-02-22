import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';

function RootLayout() {
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