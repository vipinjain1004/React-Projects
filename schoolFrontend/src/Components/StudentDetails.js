
import React, {  Suspense } from 'react';
import {  useRouteLoaderData, Await } from 'react-router-dom';
function StudentDetails(props) {
    const { studentDetails } = useRouteLoaderData('student-detail');

  //  const studentDetail = props.studentDetail;

    return (
        <Suspense fallback={<div class="spinner-grow text-primary" style={{ "text-align": "center" }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>}>
            <Await resolve={studentDetails}>
            {(loadedStudentData) => <>
                <div class="card " style={{ margin: '2rem' }}>
                    <div class="card-body">
                        <div>Name : {loadedStudentData.fName} {loadedStudentData.mName} {loadedStudentData.lName}</div>
                        <div>Father's Name : {loadedStudentData.fatherName}</div>
                        <div> Class: {loadedStudentData.stdClass}</div>
                        <div> Date Of Birth: {loadedStudentData.dob}</div>
                        <div> Admission Year : {loadedStudentData.admsnYr}</div>
                    </div>
                </div>
                </>
            }
            </Await>
        </Suspense>
    );
}
export default StudentDetails;