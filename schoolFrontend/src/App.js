import React from 'react';

import HomePage from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentPage, {loader as allStudentLoaderData} from './Pages/Student';
import StudentDetailsPage, { loader as studentLoaderData } from './Pages/StudentDetails';
import EditStudentPage from './Pages/EditStudent';
import NewStudentPage, { action as newEventAction } from './Pages/NewStudent';
import RootLayout from './Pages/Root';
import StudentRootLayout from './Pages/StudentsRoot';



const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, path: '', element: <HomePage /> },
			{
				path: 'students',
				
				element: <StudentRootLayout />,
				children: [
					{ 
						index: true, 
						element: <StudentPage />,
						id : 'all-student-detail',		
						loader : allStudentLoaderData ,
					},
					{ path: 'new', element: <NewStudentPage />, action: newEventAction },
					{
						path: ':studentId',
						id : 'student-detail',		
						loader : studentLoaderData ,	
						children: [
							{
								index: true,
								element: <StudentDetailsPage />
							},
							{ path: 'edit', element: <EditStudentPage />, action: newEventAction }
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