import React, {useState} from 'react';
import { Form } from "react-router-dom";
import { useNavigate } from "react-router";
import EditStudentDetails from './Model/EditStudentDetails';


function NewStudentForm({ method, studentDetails }) {
	const [editStudentModeShow, setEditStudentModeShow ] = useState(false);



	if (studentDetails === undefined) {
		studentDetails = false;
	}
	const navigate = useNavigate();
	function cancelHandler() {
		navigate('..');
	}
	return (
		<>
		<div class="card " style={{ margin: '2rem' }}>
			<div class="card-header">
				<h3> {studentDetails ? 'Student Details for   ' + studentDetails.id : 'Create Form'} </h3>
			</div>
			<div class="card-body">
				<Form method="POST" >
					<div class="form-row">
						<div class="row">
							<div class="form-group  col-6" style={{ "width": "51%" }}>
								<label htmlFor="first_name">First Name</label>
								<input type="text" id="first_name" name="fName"
									defaultValue={studentDetails ? studentDetails.fName : ''}
									class="form-control" id="inputEmail4"
									placeholder="First Name" />
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

						<div class="form-group col-md-6">
							<label htmlFor="dob">Date of Birth</label>
							<input type="Date" id="dob" name="dateOfBirth"
								defaultValue={studentDetails ? studentDetails.dateOfBirth : ''}
								class="form-control" />
						</div>

						<p><button class="btn btn-outline-primary">{studentDetails ? 'Update' : 'Create'}</button>
							<button type="button" style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem', margin: '2rem' }} class="btn btn-outline-secondary" onClick={cancelHandler}>Cancel</button>
											
						</p>

					</div>
				</Form>
				{!studentDetails && <button type = 'button' variant="primary" class='btn btn-outline-primary' onClick={() => setEditStudentModeShow(true)}>
        Launch vertically centered modal
      </button>}
				<EditStudentDetails
							 id = 's1' 
							 title = "title"
							  body = 'body' 						
							 show={editStudentModeShow}
							 onHide={() => setEditStudentModeShow(false)}
						   />
				<br />
				<br />
			</div>
		</div>
		</>
	);
}
export default NewStudentForm;