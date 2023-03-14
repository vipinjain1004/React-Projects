import React, { useState, useEffect } from 'react';
import { Form, useActionData, redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import EditStudentDetails from './Model/EditStudentDetails';
import ClassSelectBox from './ClassSelectBox';
import Alert from 'react-bootstrap/Alert';


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
	const [intialFName, setInitialFirstName] = useState(studentDetails === undefined ? false : true);
	const [intialFatherName, setInitialFatherName] = useState(studentDetails === undefined ? false : true);
	const [intialDob, setInitialDob] = useState(studentDetails === undefined ? false : true);
	const [serverError, setServerError] = useState({});

	useEffect(() => {
		if (responseData != undefined && !editStudentModeShow && (buttonStateOnClick === 'Create' || buttonStateOnClick === 'Update')) {
			setEditStudentModeShow(true);
		}
		setLoading(false);
		if (response != undefined && response.responseMetaData != undefined &&
			response.responseMetaData.errorDetails != undefined &&
			response.responseMetaData.errorDetails.errorCode != 200) {
			setServerError({
				message: response.responseMetaData.errorDetails.clientMessage,
				code: response.responseMetaData.errorDetails.errorCode
			});
		}
	}, [responseData, response]);


	useEffect(() => {
		if (fName && fatherName && dob) {
			setButtonEnabled(true);
		}
		if (!fatherName) {
			setButtonEnabled(false);
		}
	}, [fName, fatherName, dob, buttonEnabled]);

	const validateName = (event) => {
		setFName(event.target.value);
		setInitialFirstName(true);
	}
	const validateFatherName = (event) => {
		setFaterName(event.target.value);
		setButtonStateOnClick(true);
	}
	const validateDOB = (event) => {
		setDOB(event.target.value);
		setInitialDob(true);
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
		if (studentDetails != undefined) {
			setFName(studentDetails.fName);
			setFaterName(studentDetails.fatherName);
			setDOB(studentDetails.dateOfBirth);
			setServerError({});
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
				{Object.keys(serverError).length != 0 &&
					<Alert key="danger" variant="danger">
						{serverError.message}
					</Alert>}

				<Form method="POST" >
					<div class="form-row">
						<div class="row">
							<div class="form-group  col-6" style={{ "width": "51%" }}>
								<label htmlFor="fName">First Name</label>
								<input type="text" id="fName"
									name="fName"
									defaultValue={studentDetails ? studentDetails.fName : ''}
									readOnly={studentDetails ? true : false}
									placeholder="First Name"
									className={`form-control  ${!intialFName ? '' : !fName ? 'is-invalid' : 'is-valid'} `}
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
								className={`form-control ${!intialFatherName ? '' : fatherName ? 'is-valid' : 'is-invalid'}`}
								placeholder="Father Name" onBlur={validateFatherName} required />
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
									className={`form-control ${!intialDob ? '' : dob ? 'is-valid' : 'is-invalid'}`}
									readOnly={studentDetails ? true : false}
									onBlur={validateDOB} required />
								{!dob && <div class="invalid-feedback">
									Please Enter Valid Date
    </div>}
							</div>
							<div class="form-group col-md-2">
								<label htmlFor="dob">Class</label>
								<ClassSelectBox getValue={getClassValue}
									defaultValue={studentDetails ? studentDetails.stdClass : ''}
									required />
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