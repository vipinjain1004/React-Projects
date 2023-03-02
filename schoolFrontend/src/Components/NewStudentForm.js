import React from 'react';
import { Form } from "react-router-dom";
import { useNavigate } from "react-router";


function NewStudentForm({ method, student }) {
	console.log('NEw Stude form' + student);
	var studentDetails = false;
	if (student !== undefined) {
		const parseStudentDetails = JSON.parse(student);
		studentDetails = parseStudentDetails[0];
	}
	const navigate = useNavigate();
	function cancelHandler() {
		navigate('..');
	}
	return (
		<>
		<div class="card "  style={{ margin: '2rem' }}>
			<div class="card-header">
				<h3> {studentDetails ? 'Student Details for   ' + studentDetails.id : 'Create Form'} </h3>
			</div>
			<div class="card-body">
				<Form method="POST" >
					<div class="form-row">
						<div class="row">
							<div class="form-group  col-6" style = {{"width": "51%"}}>
								<label htmlFor="first_name">First Name</label>
								<input type="text" id="first_name" name="first_name"
									defaultValue={studentDetails ? studentDetails.first_name : ''}
									class="form-control" id="inputEmail4"
									placeholder="First Name" />
							</div>

							<div class="form-group col ">
								<label htmlFor="middle_name">Middle Name</label>
								<input type="text" id="middle_name" name="middle_name"
									defaultValue={studentDetails ? studentDetails.middle_name : ''}
									class="form-control" placeholder="Middle Name" />
							</div>


							<div class="form-group  col">
								<label htmlFor="last_name">Last Name</label>
								<input type="text" id="last_name" name="last_name"
									defaultValue={studentDetails ? studentDetails.last_name : ''}
									class="form-control" placeholder="Last Name" />
							</div>
						</div>
						<div class="form-group col-md-6">
							<label htmlFor="f_f_Name">Father Name</label>
							<input type="text" id="f_f_Name" name="f_f_Name"
								defaultValue={studentDetails ? studentDetails.f_f_Name : ''}
								class="form-control" placeholder="Father Name" />
						</div>

						<div class="form-group col-md-6">
							<label htmlFor="dob">Date of Birth</label>
							<input type="Date" id="dob" name="dob"
								defaultValue={studentDetails ? studentDetails.dob : ''}
								class="form-control" />
						</div>

						<p><button class="btn btn-outline-primary">{studentDetails ? 'Edit' : 'Create'}</button>
							<button type="button" style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem', margin: '2rem' }} class="btn btn-outline-secondary" onClick={cancelHandler}>Cancel</button>
						</p>

					</div>
				</Form>
				<br />
				<br />
			</div>
		</div>
		</>
	);
}
export default NewStudentForm;