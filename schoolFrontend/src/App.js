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
import {action as deleteAction} from './Components/DeleteStudent';
import ErrorPage from './Pages/ErrorPage';
import PageNotFound from './Pages/PageNotFound';
import { action as fetchStudentsList} from './Components/FetchStudentList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		id: 'root',
		loader: tokenLoader,

		children: [
			{ index: true, path: '', element: <HomePage /> },
			{ path: 'login', element: <LoginPage />, action: loginAction },
			{path :'*', element :<PageNotFound/>},
			{ path: 'logout', action: logoutAction },
			{ path: 'fetchStudentsList', action: fetchStudentsList },
			{
				path: 'students',
				element: <StudentRootLayout />,
				errorElement :<ErrorPage/>,
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
						errorElement :<ErrorPage/>,
						children: [
							{
								index: true,
								element: <StudentDetailsPage />,
								loader: checkAuthLoader
							},
							{
								path: 'edit',
								element: <EditStudentPage />,
								action: newEventAction,
								loader: checkAuthLoader
							}
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