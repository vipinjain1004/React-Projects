import React, { useState, useEffect } from 'react';
import ClassSelectBox from './ClassSelectBox';
import { useFetcher, useSubmit } from 'react-router-dom';
import {useSelector} from 'react-redux';
function StudentFilterForm(props) {
    const authenticationData = useSelector(state => state.authentication);
    const submit = useSubmit();
    const [classValue, setClassValue] = useState('');
    const [enterFName, setEnterFName] = useState('');    
    const fetcher = useFetcher();
    let allStudentDetails = {};
    const onChangeFName = (event)=> {
        setEnterFName(event.target.value);    }
  
    useEffect(() => {
        fetcher.submit({fName : enterFName, stdClass : classValue, limit:props.limit, offset:props.offset,token: authenticationData.token}, { method: "post", action: "/fetchStudentsList" });        
    }, [props.offset, props.limit]);

    const getClassValue = (value) => {
        setClassValue(value);
    }
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data) {           
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
                <fetcher.Form method="POST" action='/fetchStudentsList'   >
                    <div class="form-row">
                        <div class="row">
                            <div class="form-group col ">
                                <label htmlFor="fName">Name</label>
                                <input type="text" id="fName" name="fName"
                                    class="form-control" placeholder="Name" onChange={onChangeFName} />
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