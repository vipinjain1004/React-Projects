import React from 'react';
import { Form } from "react-router-dom";
import { useNavigate } from "react-router";


function NewStudentForm({method, student}){
    console.log('NEw Stude form' +student);
    var studentDetails = false;
    if(student !== undefined){
      const parseStudentDetails = JSON.parse(student);
      studentDetails = parseStudentDetails[0];
    }
    const navigate = useNavigate();

	function cancelHandler(){
		navigate('..');
	}
    return (
    <>
   <h1> {studentDetails ? 'Student Details for   '+ studentDetails.id : ''}</h1>
		<Form method="POST" >

			<p>
				<label htmlFor="first_name">First Name</label>
                <input type="text" id = "first_name" name="first_name" 
                 defaultValue={studentDetails ? studentDetails.first_name:''} />
			</p>
			<p>
				<label htmlFor="middle_name">Middle Name</label>
                <input type="text" id = "middle_name"name="middle_name" 
                 defaultValue={studentDetails ? studentDetails.middle_name:''} />
			</p>
			<p>
				<label htmlFor="last_name">Last Name</label>
				<input type="text" id = "last_name" name="last_name" 
                 defaultValue={studentDetails ? studentDetails.last_name:''} />
			</p>
			<p>
				<label htmlFor="f_f_Name">Father First Name</label>
				<input type="text" id = "f_f_Name" name="f_f_Name" 
                 defaultValue={studentDetails ? studentDetails.f_f_Name:''} />
			</p>
			<p>
				<label htmlFor="f_m_Name">Father middle Name</label>
				<input type="text" id = "f_m_Name" name="f_m_Name" 
                 defaultValue={studentDetails ? studentDetails.f_m_Name:''} />
			</p>
			<p>
				<label htmlFor="f_l_Name">First Name</label>
				<input type="text" id = "f_l_Name" name="f_l_Name"
                 defaultValue={studentDetails ? studentDetails.f_l_Name:''} />
			</p>
			<p>
				<label htmlFor="dob">Date of Birth</label>
				<input type="Date" id = "dob" name="dob" 
                 defaultValue={studentDetails ? studentDetails.dob:''} />
			</p>
			<p>
				<button>{studentDetails ? 'Edit' :'Create'}</button>
				<button type="button" onClick ={cancelHandler}>Cancel</button>
							</p>
		</Form>
        </>
	);
}
export default NewStudentForm;