import React, { useState, Suspense, json } from 'react';
import { useParams, Link, useRouteLoaderData, Form, useNavigate, Await, defer } from 'react-router-dom';
import GenericModel from '../Components/Model/GenericModel';
import Alert from 'react-bootstrap/Alert';
import PaginationStudentList from '../Components/PaginationStudentList';
import StudentDetails from '../Components/StudentDetails';

function StudentDetailsPage() {
	const { studentDetails } = useRouteLoaderData('student-detail');
	const params = useParams();
	const navigate = useNavigate();
	const [showGenericModel, setShowGenericModel] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const deleteBtnOnClick = () => {
		setShowGenericModel(true);
	}
	const actionOnClickGenericModel = async () => {
		const url = '/student/' + params.studentId + '/delete';
		const response = await fetch(url, {
			method: 'delete',
			headers: {
				'Authorization': localStorage.getItem('token')
			},
		});
		if (!response.ok) {
			throw new Error('Data coud not be fetched!')
		} else {
			setIsDeleted(true);
			setShowGenericModel(false);
			navigate('/students');
		}
	}
	const getValue = (stu)=>{
		
	}
	return (
		<Suspense fallback={<div class="spinner-grow text-primary" style={{ "text-align": "center" }} role="status">
			<span class="visually-hidden">Loading...</span>
		</div>}>
			<Await resolve={studentDetails}>
				{(loadedStudentData) => <>
					{isDeleted && <Alert key="success" variant="success">
						Successfully Deleted
			</Alert>
					}
					<StudentDetails getValue ={getValue}/>
					<div className="card text-center">
						<div className="card-header">
							Student Details Page
  </div>
						<div className="card-body">
							<h5 className="card-title">Student Id : {params.studentId}</h5>
							<p className="card-text">Name : {loadedStudentData.fName}</p>

						</div>
						<div class="card-footer">
							<Link to='fees' ><button className='btn btn-outline-primary'>Fees</button>	</Link>
							<Link to='edit' state={{ ...loadedStudentData }}><button className='btn btn-outline-success'>Edit</button>	</Link>
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

					</>}

			</Await>
		</Suspense>

	)
}
export default StudentDetailsPage;

async function loadStudentDetail(studentId) {
	const url = '/student/' + studentId + '/get';
	const response = await fetch(url, {  // Enter your IP address here
		method: 'GET',
		  headers: {
            'Authorization': localStorage.getItem('token')
        },
		// body data type must match "Content-Type" header
	});

	if (!response.ok && response.status == !500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({ message: response.message }), { status: response.status });
	} else if (!response.ok && response.status != 500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
	} else {
		console.log(response);
		const resData = await response.json();
		return resData.responseBody;
	}
	return null;
};

export function loader({ request, params }) {
	const studentId = params.studentId;
	return defer({
		studentDetails: loadStudentDetail(studentId)
	})

};
