import React from 'react';
import { redirect } from 'react-router-dom';
import NewStudentForm from '../Components/NewStudentForm';
function NewStudentPage() {
	return <NewStudentForm/>
	
}
export default NewStudentPage;

export async function action({request, params}){
	
	const data = await request.formData();
	const studentData = {
		fName : data.get('fName'),
		mName : data.get('mName'),
		lName : data.get('lName'),
		fatherName : data.get('fatherName'),
		dateOfBirth : data.get('dateOfBirth')		
	};
	
	

	const response = await fetch('/student/add', {  // Enter your IP address here
	method: 'Post', 	
	headers :{
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(studentData) // body data type must match "Content-Type" header
  })
  console.log(JSON.stringify(response.json()));
  return response.json();
  

	
	//return redirect('/students')
}