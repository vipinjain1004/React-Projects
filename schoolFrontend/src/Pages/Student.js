import React, { Suspense, json, useState } from 'react';
import { Link, useRouteLoaderData, defer, Await, useFetcher, useSubmit } from 'react-router-dom';

import StudentFilterForm from '../Components/StudentFilterForm';

function StudentPage() {
	const  {allStudentDetails} = useRouteLoaderData('all-student-detail');
	const [responseData, setResponseData] = useState({});
	const [isShowTable, setIsShowTable] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

 
	const onChangeResponse = async (data)=>{
		setIsShowTable(true);
		setResponseData(data);	
		setIsLoading(false);
		console.log("Response insdie student.js in onchangeResonse"+ JSON.stringify(data));
	}
	const onClickOnFilterButton = ()=>{
		setIsLoading(true);
	}
	
	var count = 1;
	return (
		<>
		<StudentFilterForm onChangeResponse ={onChangeResponse} onClickOnFilterButton ={onClickOnFilterButton} /> 
		{isLoading && <div class="spinner-grow text-primary" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>}
		{!isLoading && 
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
			{responseData.length === 0 ? 'No Data found' : ''}
			{responseData.map(student =>
				<tr key={student.id}>
					<th scope="row">{count++}</th>
					<td>{student.fName === null ? ' ' : student.fName + ' '} {student.mName === null ? ' ' : student.mName + ' '}
						{student.lName === null ? ' ' : student.lName}</td>
					<td>{student.fatherName}</td>
					<td>{student.dateOfBirth}</td>
					<td>{student.stdClass}</td>
					<td><Link to={student.id}>Details</Link></td>
				</tr>)
			}
		</tbody>
	</table>}
	</>
	)
}
export default StudentPage;

async function getAllDetails() {
	const response = await fetch('/student/getAll', {
		method: 'GET',
		// body data type must match "Content-Type" header
	});
	if (!response.ok && response.status != 500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({message : response.message}), {status : response.status });
	} else 	if (!response.ok && response.status === 500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({message : 'Something went wrong'}), {status : 500 });
	} else {
		console.log(response);
		const resdata = await response.json();
		return resdata.responseBody;
	}
	return null;
};
export function loader({ request, params }) {
	return defer({
		allStudentDetails: getAllDetails()
	})

};