import React from 'react';
import NewStudentForm from '../Components/NewStudentForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditStudentPage(){
	const data = useRouteLoaderData('student-detail');
	console.log(data);
	return (
		<>
	<h1>Edit Page</h1>
	<NewStudentForm student = {data}/>
	</>
	)


}
export default EditStudentPage;
