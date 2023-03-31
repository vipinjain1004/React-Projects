import React, { Suspense, json, useState } from 'react';
import { Link, useRouteLoaderData, defer, Await, useFetcher, useSubmit } from 'react-router-dom';

import StudentFilterForm from '../Components/StudentFilterForm';
import PaginationStudentList from '../Components/PaginationStudentList';

function StudentPage() {
	//const  {allStudentDetails} = useRouteLoaderData('all-student-detail');
	const [responseData, setResponseData] = useState({});
	const [isShowTable, setIsShowTable] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [limit, setLimit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [activePage, setActivePage] = useState(1);
	//	const [count, setCount] = useState(1);
	let count = 1

	const onChangeResponse = async (data) => {
		setIsShowTable(true);
		setResponseData(data);
		setIsLoading(false);

	//	console.log("Response insdie student.js in onchangeResonse" + JSON.stringify(data));
	}
	const onClickOnFilterButton = () => {
		setIsLoading(true);
		setActivePage(1);
	}

	const onClickPageNumber = (limit, offset) => {
		setIsLoading(true);
		setLimit(limit);
		setOffset(offset);

		console.log("onClickPageNumber" + limit + ' ' + offset);
	};
	if (responseData.pagination && responseData.pagination.length !== 0) {
		count = responseData.pagination.offset + 1;
	}

	return (
		<>
		<StudentFilterForm onChangeResponse={onChangeResponse} onClickOnFilterButton={onClickOnFilterButton} limit={limit} offset={offset} />
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
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{responseData.responseBody.length === 0 ? <tr key='NO-DATA'>No Data found </tr> : ''}
					{responseData.responseBody.map(student =>
						<tr key={student.id}>
							<th scope="row">{count++}</th>
							<td>{student.fName === null ? ' ' : student.fName + ' '} {student.mName === null ? ' ' : student.mName + ' '}
								{student.lName === null ? ' ' : student.lName}</td>
							<td>{student.fatherName}</td>
							<td>{student.dateOfBirth}</td>
							<td>{student.stdClass}</td>
							<td><Link to={student.id+'/fees'}>Fees</Link></td>
							<td><Link to={student.id}>Detaiils</Link></td>
							
						</tr>)
					}
				</tbody>
			</table>}
		{responseData.pagination && responseData.pagination.length !== 0 && <PaginationStudentList pageInfo={responseData.pagination} activePageCount = {activePage} onClickPageNumber={onClickPageNumber} />}
		<br />
		<br />

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
		throw new Response(JSON.stringify({ message: response.message }), { status: response.status });
	} else if (!response.ok && response.status === 500) {
		throw new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
	} else {
	//	console.log(response);
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