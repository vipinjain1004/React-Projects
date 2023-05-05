import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentsNavigation from '../Components/StudentsNavigation';
import { useSelector } from 'react-redux';
function StudentRootLayout() {
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
	return (<>
		{isLoggedIn &&
			<React.Fragment>

				<StudentsNavigation />
				<main>
					<Outlet />
				</main>
			</React.Fragment>
		}
		</>
	);
}
export default StudentRootLayout;