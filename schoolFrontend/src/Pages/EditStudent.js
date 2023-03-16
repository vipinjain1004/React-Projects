import React, { Suspense } from 'react';
import NewStudentForm from '../Components/NewStudentForm';
import { useRouteLoaderData, Await } from 'react-router-dom';

function EditStudentPage() {
	const { studentDetails } = useRouteLoaderData('student-detail');
	console.log({ studentDetails });
	return (
		<Suspense fallback={<div class="spinner-grow text-primary" style={{ "text-align": "center" }} role="status">
			<span class="visually-hidden">Loading...</span>
		</div>}>
			<Await resolve={studentDetails}>
				{(loadedStudentData) => <>
					<NewStudentForm studentDetails={loadedStudentData} />

					</>}
			</Await>
		</Suspense>

	)
}
export default EditStudentPage;
