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
		first_name : data.get('first_name'),
		middle_name : data.get('middle_name'),
		last_name : data.get('last_name'),
		f_f_Name : data.get('f_f_Name'),
		f_m_Name : data.get('f_m_Name'),
		f_l_Name : data.get('f_l_Name'),
		dob : data.get('dob')		
	};
	console.log(JSON.stringify(studentData));
	return redirect('/students')
}