import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../Components/MainNavigation';
import StudentsNavigation from '../Components/StudentsNavigation';

function StudentRootLayout() {
	return (
		<React.Fragment>
			<StudentsNavigation />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
}
export default StudentRootLayout;