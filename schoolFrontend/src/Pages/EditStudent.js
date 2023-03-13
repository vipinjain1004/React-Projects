import React from 'react';
import NewStudentForm from '../Components/NewStudentForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditStudentPage(){
	const data = useRouteLoaderData('student-detail');
	console.log(data.responseBody);
	return (
		<>
	<NewStudentForm studentDetails = {data.responseBody}/>
	</>
	)
}
export default EditStudentPage;
