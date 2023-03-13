import React, { useState, useEffect } from 'react';
import { Form, useActionData, redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import EditStudentDetails from './Model/EditStudentDetails';
import ClassSelectBox from './ClassSelectBox';



function NewStudentForm({ method, studentDetails }) {
	const response = useActionData();
	const responseData = response === undefined ? undefined : response.responseBody;
	const [editStudentModeShow, setEditStudentModeShow] = useState(false);
	const [buttonStateOnClick, setButtonStateOnClick] = useState('NotClicked');
	const [classValue, setClassValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [isValidate, setIsValidate] = useState(false);
	const [fName, setFName] = useState();
	const [fatherName, setFaterName] = useState();
	const [dob, setDOB] = useState();
	const [buttonEnabled, setButtonEnabled] = useState(studentDetails === undefined ? false : true);

	useEffect(() => {
		if (!editStudentModeShow && (buttonStateOnClick === 'Create' || buttonStateOnClick === 'Update')) {
			setEditStudentModeShow(true);
		}
		setLoading(false);
	}, [responseData]);


	useEffect(() => {
		console.log('Form data use Effect ' + fName + fatherName + dob + buttonEnabled);
		if (fName && fatherName && dob) {
			console.log('Inside COndition Form data use Effect ' + fName + fatherName + dob + buttonEnabled);
			setButtonEnabled(true);
		}
		if (!fatherName) {
			setButtonEnabled(false);
		}

	}, [fName, fatherName, dob, buttonEnabled]);

	const validateName = (event) => {
		setFName(event.target.value);
	}
	const validateFatherName = (event) => {
		setFaterName(event.target.value);
	}
	const validateDOB = (event) => {
		setDOB(event.target.value);
	}
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
	useEffect(() => {
		if (studentDetails === undefined) {

		} else {
			setFName(studentDetails.fName);
			setFaterName(studentDetails.fatherName);
			setDOB(studentDetails.dateOfBirth);
			
		}
	}, []);
	const getClassValue = (value) => {
		setClassValue(value);
	}

	const navigate = useNavigate();
	function cancelHandler() {
		navigate('..');
	}
	const buttonClicked = () => {
		var state = studentDetails ? 'Update' : 'Create';
		if (buttonEnabled && fName && fatherName && dob) {
			setButtonStateOnClick(state);
			setLoading(true);
		}


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
									disabled={studentDetails ? "disabled" : ""}
									placeholder="First Name" className={`form-control ${!fName ? 'is-invalid': 'is-valid' } `}
									aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
									onBlur={validateName}
									required />
								{!fName &&
									<div class="invalid-feedback">
										Please Enter Name
									  </div>
								}
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
								className={`form-control ${fatherName ? 'is-valid' : 'is-invalid'}`} placeholder="Father Name" onBlur={validateFatherName} required />
							{!fatherName &&
								<div class="invalid-feedback">
									Please Enter Father's Name
								</div>
							}
						</div>
						<div className="row">
							<div class="form-group col-md-2">
								<label htmlFor="dob">Date of Birth</label>
								<input type="Date" id="dob" name="dateOfBirth"
									defaultValue={studentDetails ? date : ''}
									className={`form-control ${dob ? 'is-valid' : 'is-invalid'}`} disabled={studentDetails ? "disabled" : ""} onBlur={validateDOB} required />
								{!dob && <div class="invalid-feedback">
									Please Enter Valid Date
    </div>}
							</div>
							<div class="form-group col-md-2">
								<label htmlFor="dob">Class</label>
								<ClassSelectBox getValue={getClassValue} defaultValue={studentDetails ? studentDetails.stdClass : ''} required />
							</div>
						</div>

						<p><button className={`btn btn-outline-primary ${buttonEnabled ? '' : 'disabled'}`} onClick={buttonClicked}>{studentDetails ? 'Update' : 'Create'}</button>
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