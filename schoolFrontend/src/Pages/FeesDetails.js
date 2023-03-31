import React, { Suspense, useEffect } from 'react';
import { useRouteLoaderData, Await } from 'react-router-dom';
import StudentDetails from '../Components/StudentDetails';
import FeesForm from '../Components/FeesForm';
import SpinnerModel from '../Components/Model/SpinnerModel';
function FeesDetailsPage() {
    const { studentDetails } = useRouteLoaderData('student-detail');
    return (<>
        <div style={{ margin: "2rem" }}>
            <StudentDetails />
        </div>
        <Suspense fallback={
            <SpinnerModel/>}>
            <Await resolve={studentDetails}>
                {(loadedStudentData) => <>
                    <FeesForm studentDetails={loadedStudentData} />
                    </>
                }
            </Await>
        </Suspense>
        </>
    );

}
export default FeesDetailsPage;