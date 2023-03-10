import React, { useState } from 'react';
import { useParams, Link, useRouteLoaderData, Form, useNavigate } from 'react-router-dom';
import GenericModel from '../Components/Model/GenericModel';
function StudentDetailsPage() {
	const studentDetails = useRouteLoaderData('student-detail');
	const params = useParams();
	const navigate = useNavigate();
	const [showGenericModel, setShowGenericModel] = useState(false);

	const deleteBtnOnClick = () => {
		setShowGenericModel(true);
	}

	const actionOnClickGenericModel = async () => {
		setShowGenericModel(false);
		const url = '/student/' + params.studentId + '/delete';
		console.log('Delete URL ' + url);
		const response = await fetch(url, {
			method: 'delete'
		});
		console.log('DAta on submit action' + JSON.stringify(response));
		if (!response.ok) {
			console.log('Data coud not be fetched!');
			throw new Error('Data coud not be fetched!')
		} else {
			navigate('/students');
		}
	}
	return (
		<>
		<div className="card text-center">
			<div className="card-header">
				Student Details Page
  </div>
			<div className="card-body">
				<h5 className="card-title">Student Id : {params.studentId}</h5>
				<p className="card-text">Name : {studentDetails.fName}</p>

			</div>
			<div class="card-footer">
	
					<Link to="edit"><button className='btn btn-outline-success'>Edit</button>	</Link>
					<button class="btn btn btn-outline-danger" onClick={deleteBtnOnClick} >Delete</button>
		
			</div>
		</div>


		<GenericModel
			title="Delete"
			body='Are you sure you want to delete this ?'
			successButton='Delete'
			cancelButton='Cancel'
			actionOnClick={actionOnClickGenericModel}
			show={showGenericModel}
			onHide={() => setShowGenericModel(false)}
		/>

		</>
	)
}
export default StudentDetailsPage;

export async function loader({ request, params }) {
	const studentId = params.studentId;
	const url = '/student/' + studentId + '/get';
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