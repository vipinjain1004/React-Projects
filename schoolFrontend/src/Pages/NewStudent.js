import React from 'react';
import { redirect, useParams } from 'react-router-dom';
import NewStudentForm from '../Components/NewStudentForm';

function NewStudentPage() {
	return <NewStudentForm />

}
export default NewStudentPage;
export async function action({ request, params }) {
	//const paramData = useParams();
	const id  = params === undefined ? null : params.studentId;
	const data = await request.formData();
	const studentData = {
		id : id,
		fName: data.get('fName'),
		mName: data.get('mName'),
		lName: data.get('lName'),		
		fatherName: data.get('fatherName'),
		dateOfBirth: data.get('dateOfBirth'),
		stdClass: data.get('stdClass')
	};
	const response = await fetch('/student/add', {  // Enter your IP address here
		method: 'Post',
		headers: {
			'Content-Type': 'application/json',
		    'Authorization': localStorage.getItem('token')
        },
		body: JSON.stringify(studentData) // body data type must match "Content-Type" header
	})
	console.log('DAta on submit action' +JSON.stringify(response));
	if (!response.ok) {
		console.log('Data coud not be fetched!');
		throw new Error('Data coud not be fetched!')
	} else {
		console.log(response + '\nRequest Data ' +JSON.stringify(data));
		return response;
	}
	return null;


	//return redirect('/students')
}