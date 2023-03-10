import React, { useState, useEffect } from 'react';
import { Form, useActionData, redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import EditStudentDetails from './Model/EditStudentDetails';
import ClassSelectBox from './ClassSelectBox';



function NewStudentForm({ method, studentDetails }) {
	var responseData = useActionData();
	const [editStudentModeShow, setEditStudentModeShow] = useState(false);
	const [buttonStateOnClick, setButtonStateOnClick] = useState('NotClicked');
	const [classValue, setClassValue] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!editStudentModeShow && (buttonStateOnClick === 'Create' || buttonStateOnClick === 'Update')) {
			setEditStudentModeShow(true);
		}
		setLoading(false);
	}, [responseData])

	const onHideEditModel = () => {
		setEditStudentModeShow(false);
		return redirect('/');
	};

	var date = new Date();
	if (studentDetails === undefined) {
		studentDetails = false;
	} else {
		const parsedDate = new Date(studentDetails.dateOfBirth);
		date = parsedDate.toISOString().substring(0, 10);
	}
	const getClassValue = (value) => {
		setClassValue(value);
	}
	const navigate = useNavigate();
	function cancelHandler() {
		navigate('..');
	}
	const buttonClicked = () => {
		var state = studentDetails ? 'Update' : 'Create';
		setButtonStateOnClick(state);
		setLoading(true);
	}
	return (
		<>
		<div class="card " style={{ margin: '2rem' }}>
			<div class="card-header">
				<h3> {studentDetails ? 'Student Details for   ' + studentDetails.id : 'Admission Form'} </h3>
			</div>
			<div class="card-body">
				<Form method="POST" >
					<div class="form-row">
						<div class="row">
							<div class="form-group  col-6" style={{ "width": "51%" }}>
								<label htmlFor="first_name">First Name</label>
								<input type="text" id="first_name" name="fName"
									defaultValue={studentDetails ? studentDetails.fName : ''}
									id="inputEmail4"
									disabled={studentDetails ? "disabled" : ""}
									placeholder="First Name" className={`form-control ${studentDetails ? 'disabled' : ''} `} />
							</div>

							<div class="form-group col ">
								<label htmlFor="middle_name">Middle Name</label>
								<input type="text" id="middle_name" name="mName"
									defaultValue={studentDetails ? studentDetails.mName : ''}
									class="form-control" placeholder="Middle Name" />
							</div>


							<div class="form-group  col">
								<label htmlFor="last_name">Last Name</label>
								<input type="text" id="last_name" name="lName"
									defaultValue={studentDetails ? studentDetails.lName : ''}
									class="form-control" placeholder="Last Name" />
							</div>
						</div>
						<div class="form-group col-md-6">
							<label htmlFor="f_f_Name">Father Name</label>
							<input type="text" id="f_f_Name" name="fatherName"
								defaultValue={studentDetails ? studentDetails.fatherName : ''}
								class="form-control" placeholder="Father Name" />
						</div>
						<div className="row">
							<div class="form-group col-md-2">
								<label htmlFor="dob">Date of Birth</label>
								<input type="Date" id="dob" name="dateOfBirth"
									defaultValue={studentDetails ? date : ''}
									className={`form-control`} disabled={studentDetails ? "disabled" : ""} />
							</div>
							<div class="form-group col-md-2">
								<label htmlFor="dob">Class</label>
								<ClassSelectBox getValue={getClassValue} defaultValue={studentDetails ? studentDetails.stdClass : ''} />
							</div>
						</div>
						
						<p><button class="btn btn-outline-primary" onClick={buttonClicked}>{studentDetails ? 'Update' : 'Create'}</button>
							<button type="button" style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem', margin: '2rem' }} class="btn btn-outline-secondary" onClick={cancelHandler}>Cancel</button>
							{loading &&
							<div class="spinner-grow text-primary" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						}						
						</p>			

					</div>
				</Form>
				<EditStudentDetails
					id={responseData ? responseData.id : studentDetails.id}
					value={responseData ? responseData : studentDetails}
					title="title"
					body='body'
					show={editStudentModeShow}
					state={buttonStateOnClick}
					onHide={() => onHideEditModel()}
				/>
				<br />
				<br />
			</div>
		</div>
		</>
	);
}
export default NewStudentForm;