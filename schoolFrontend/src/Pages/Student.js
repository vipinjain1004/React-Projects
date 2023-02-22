import React from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

function StudentPage() {
	const data = useRouteLoaderData('all-student-detail');
	const data1 = JSON.parse(data);
	return (
		<><h1>Student  Page</h1>
		{data1.map(student => <li key={student.id}>
			<Link to={student.id}>{student.first_name}</Link>
		</li>)}
		</>
	)
}
export default StudentPage;

export async function loader({request, params}){
	
	const studentData = await [{
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
	return JSON.stringify(studentData);
};