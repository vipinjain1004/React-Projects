import React from 'react';
import { useParams, Link, useRouteLoaderData } from 'react-router-dom';
function StudentDetailsPage(){
	const data = useRouteLoaderData('student-detail');
	console.log("Student Detail page data "+data);
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
	const url = '/student/'+studentId+'/get';
	const response = await fetch(url, {  // Enter your IP address here
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