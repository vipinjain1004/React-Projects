import React from 'react';
import NewStudentForm from '../Components/NewStudentForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditStudentPage(){
	const data = useRouteLoaderData('student-detail');
	console.log(data);
	return (
		<>
	<NewStudentForm student = {data}/>
	</>
	)


}
export default EditStudentPage;
