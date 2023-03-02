import React from 'react';

import HomePage from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentPage, { loader as allStudentLoaderData } from './Pages/Student';
import StudentDetailsPage, { loader as studentLoaderData } from './Pages/StudentDetails';
import EditStudentPage from './Pages/EditStudent';
import NewStudentPage, { action as newEventAction } from './Pages/NewStudent';
import RootLayout from './Pages/Root';
import StudentRootLayout from './Pages/StudentsRoot';
import LoginPage from './Pages/Login';
import { action as loginAction } from './Components/LoginForm';
import { action as logoutAction } from './Components/logout';
import { tokenLoader, checkAuthLoader } from './utils/LoginUtils';
import StartupPage from './Pages/Startup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		id: 'root',
		loader: tokenLoader,
		children: [
			{ index: true, path: '', element: <HomePage /> },
			{ path: 'startup', element: <StartupPage /> },
			{ path: 'login', element: <LoginPage />, action: loginAction },
			{ path: 'logout', action: logoutAction },
			{
				path: 'students',
				element: <StudentRootLayout />,
				children: [
					{
						index: true,
						element: <StudentPage />,
						id: 'all-student-detail',
						loader: allStudentLoaderData,
					},
					{
						path: 'new',
						element: <NewStudentPage />,
						action: newEventAction,
						loader: checkAuthLoader
					},

					{
						path: ':studentId',
						id: 'student-detail',
						loader: studentLoaderData,
						children: [
							{
								index: true,
								element: <StudentDetailsPage />,
								loader: checkAuthLoader
							},
							{ path: 'edit', element: <EditStudentPage />, action: newEventAction, loader: checkAuthLoader }
						]
					},

				]
			}
		]
	}]
);
function App() {
	return <RouterProvider router={router} />;

}

export default App;