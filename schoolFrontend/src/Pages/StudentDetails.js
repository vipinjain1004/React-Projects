import React from 'react';
import { useParams, Link, useRouteLoaderData } from 'react-router-dom';
function StudentDetailsPage(){
	const data = useRouteLoaderData('student-detail');
	console.log(data);
	const params = useParams();
	return (
		<>
	<h1> Student Details Page</h1>
		<p>Student Id : {params.studentId}</p>
		<Link to="edit">Edit</Link>
	</>
	)
}
export default StudentDetailsPage;

export async function loader({request, params}){
	const studentId = params.studentId;
	const studentData = await [
		{
		"id": "s1",
		"first_name": "Vipin1",
		"middle_name": "Kumar",
		"last_name": "Jain",
		"f_f_Name": "Vinay",
		"f_m_Name": "Kumar",
		"f_l_Name": "Jain",
		"dob": "2023-02-21"
	},
	{
		"id": "s2",
		"first_name": "Vikalp",
		"middle_name": "Kumar",
		"last_name": "Jain",
		"f_f_Name": "Vinay",
		"f_m_Name": "Kumar",
		"f_l_Name": "Jain",
		"dob": "2023-02-21"
	},
	{
		"id": "s3",
		"first_name": "Vivek",
		"middle_name": "Kumar",
		"last_name": "Jain",
		"f_f_Name": "Vinay",
		"f_m_Name": "Kumar",
		"f_l_Name": "Jain",
		"dob": "2023-02-21"
	}
];
const student = studentData.filter(student=> student.id==studentId)
	return JSON.stringify(student);
};