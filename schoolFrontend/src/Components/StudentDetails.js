
import React, { Suspense, useEffect } from 'react';
import { useRouteLoaderData, Await } from 'react-router-dom';
function StudentDetails(props) {
    const { studentDetails } = useRouteLoaderData('student-detail');   

    return (
        <Suspense fallback={<div class="spinner-grow text-primary" style={{ "text-align": "center" }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>}>
            <Await resolve={studentDetails}>
                {(loadedStudentData) => <>
                    <div class="card " >
                        <div class="card-body">
                            <div>Name : {loadedStudentData.fName} {loadedStudentData.mName} {loadedStudentData.lName}</div>
                            <div>Father's Name : {loadedStudentData.fatherName}</div>
                            <div> Class: {loadedStudentData.stdClass}</div>                          
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