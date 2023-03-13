import React from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

function StudentPage() {
	const data = useRouteLoaderData('all-student-detail');
	var count = 1;
	console.log("student detials for student.js" +data);
	//const data1 = JSON.parse(data);
	return (
		<><h1>Student  Page</h1>
		{data.length === 0 && <p>No Data Found</p>}
		<table class="table table-striped">
			<thead>			
				<tr>
					<th scope="col">#</th>
					<th scope="col">Name</th>
					<th scope="col">Father Name</th>
					<th scope="col">Dob</th>
					<th scope="col">Class</th>
					<th scope="col">Details</th>
				</tr>
			</thead>
			<tbody>				
				{data.responseBody.map(student =>						
					<tr key={student.id}>
					<th scope="row">{count++}</th>
					<td>{student.fName===null ? ' ' : student.fName + ' ' } {student.mName === null ? ' ': student.mName + ' '  }
					{  student.lName === null ? ' ':  student.lName }</td>
					<td>{student.fatherName}</td>
					<td>{student.dateOfBirth}</td>
					<td>{student.stdClass}</td>
					<td><Link to={student.id}>Details</Link></td>
				</tr>)
				}
			</tbody>
		</table>
		</>
	)
}
export default StudentPage;

export async function loader({ request, params }) {
		const response = await fetch('/student/getAll', {  // Enter your IP address here
			method: 'GET', 	
			// body data type must match "Content-Type" header
		  });	
		if (!response.ok) {
			console.log('Data coud not be fetched!');
		  throw new Error('Data coud not be fetched!')
		} else {
			console.log(response);
		  return response;
		}	  
	  return null;
};