import React, { useState, useEffect } from 'react';
import ClassSelectBox from './ClassSelectBox';
import { useFetcher, useSubmit } from 'react-router-dom';
function StudentFilterForm(props) {
    const submit = useSubmit();
    const [classValue, setClassValue] = useState('');
    const fetcher = useFetcher();
    let allStudentDetails = {};
    useEffect(() => {
        fetcher.submit(null, { method: "post", action: "/fetchStudentsList" });

    }, []);

    const getClassValue = (value) => {
        setClassValue(value);
    }
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data) {
            console.log("Data inside StudentFilterForm using fatcher" + JSON.stringify(data));
            props.onChangeResponse(data);
        }
        if (state === 'submitting') {
            props.onClickOnFilterButton();
        }
    }, [data, state]);

    return (
        <>
        <div class="card " style={{ margin: '2rem' }}>

            <div class="card-body">
                <fetcher.Form method="POST" action='/fetchStudentsList'  >
                    <div class="form-row">
                        <div class="row">
                            <div class="form-group col ">
                                <label htmlFor="fName">Name</label>
                                <input type="text" id="fName" name="fName"
                                    class="form-control" placeholder="Name" />
                            </div>

                            <div class="form-group  col">
                                <label htmlFor="dob">Class</label>
                                <ClassSelectBox getValue={getClassValue} />
                            </div>
                            <div class="form-group  col">
                                <br />
                                <button className={`btn btn-outline-primary`}>Filter</button>
                            </div>
                        </div>
                    </div>
                </fetcher.Form>
            </div>
        </div>
        </>
    )
}

export default StudentFilterForm;