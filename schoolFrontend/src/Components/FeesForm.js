import React, { useState, useRef, useEffect } from 'react'
import { Form, useActionData, redirect } from "react-router-dom";
import classes from './FeesForm.module.css';
import SelectBoxFinancialYear from './SelectBoxFinancialYear';
function FeesForm() {


    const fees = {
        financialYear: "2022-23",
        monthlyFees: 100,
        admissionFees: 500,
        examFees: 50,
        feesDetail: [
            [{
                id: "212345_1",
                feesFor: "ADMISSION",
                amount: 20.32,
                dt: "10-10-23",
                userId: "123456",
                status: "PENDING"
            },
            {
                id: "212345_2",
                feesFor: "EXAM",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "PENDING"
            },
            {
                id: "212345_3",
                feesFor: "JULY",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            },
            {
                id: "212345_4",
                feesFor: "AUG",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            }],
            [{
                id: "212345_5",
                feesFor: "SEP",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            },
            {
                id: "212345_6",
                feesFor: "OCT",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            },
            {
                id: "212345_7",
                feesFor: "NOV",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            },
            {
                id: "212345_8",
                feesFor: "DEC",
                amount: 100,
                dt: "",
                userId: "",
                status: "PENDING"
            }],
            [{
                id: "212345_9",
                feesFor: "JAN",
                amount: 100,
                dt: "",
                userId: "",
                status: "PENDING"
            },
            {
                id: "212345_10",
                feesFor: "FEB",
                amount: 100,
                dt: "",
                userId: "",
                status: "PENDING"
            },
            {
                id: "212345_11",
                feesFor: "MAR",
                amount: 100,
                dt: "",
                userId: "",
                status: "PENDING"
            },
            {
                id: "212345_12",
                feesFor: "APR",
                amount: 100,
                dt: "",
                userId: "",
                status: "PENDING"
            }]
        ]

    };
    const [total, setTotal] = useState(0);
    const [monthlyChecked, setMonthlyChecked] = useState(0);
    const [admissionChecked, setAdmissionChecked] = useState(0);
    const [examChecked, setExamChecked] = useState(0);
    const isAdmissionFeesSubmitted = fees.feesDetail.map(arr => arr.findIndex(obj => obj.feesFor === 'ADMISSION' && obj.status === 'SUBMITTED')).findIndex(obj => obj === 0) != -1 ? true : false;
    const [monthyTotal, setMonthlyTotal] = useState(0);
    const [admissionTotal, setAdmissionTotal] = useState(!isAdmissionFeesSubmitted ? fees.admissionFees : 0);
    const [examTotal, setExamTotal] = useState(0);
    const [selectBoxFinancialYearValue, setSelectBoxFinancialYearValue] = useState('');

    

    useEffect(() => {
        setTotal(Number(monthyTotal) + Number(examTotal) + Number(admissionTotal));
    }, [monthyTotal, examTotal, admissionTotal])

    useEffect(() => {
        setMonthlyTotal(fees.monthlyFees * monthlyChecked);
    }, [monthlyChecked]);
    useEffect(() => {
        setExamTotal(fees.examFees * examChecked);
    }, [examChecked]);

    const checkBoxOnChange = (event,value)=>{
        if (value === 'ADMISSION') {
            if (event.target.checked) {
                setAdmissionChecked(monthlyChecked + 1);
            } else {
                setAdmissionChecked(monthlyChecked - 1);
            }
            
        }else if (value === 'EXAM') {
            if (event.target.checked) {
                setExamChecked(examChecked + 1);
            } else {
                setExamChecked(examChecked - 1);
            }
            setExamTotal(examChecked * fees.examFees)
        }else{
            if (event.target.checked) {
                setMonthlyChecked(monthlyChecked + 1);
                
            } else {
                setMonthlyChecked(monthlyChecked - 1);
            }
            setMonthlyTotal(monthlyChecked * fees.monthlyFees);
        }
    }
    const getSelectBoxFinancialYear = (value) => {
        setSelectBoxFinancialYearValue(fees.financialYear);
    }
    return (
        <>
        <div class="card " style={{ margin: '2rem' }}>
            <div class="card-header">
                Fees Form
            </div>
            <div class="card-body">
                <Form method="POST" >

                    <div class="form-check">
                        {fees.feesDetail.map((feesDetails, index) =>
                            <div className={'card-group'}>
                                {feesDetails.map((f, index) =>
                                    <div class="card">
                                        <div className={`card-body  ${f.status === 'PENDING' ? "text-warning" : "text-success"}`}>
                                            <h5 class="card-title">{f.feesFor}</h5>
                                            <p class="cardthis-text">Amount : {f.amount}</p>
                                            <div className={classes.frmCheckbox}>
                                                <input class="form-check-input" type="checkbox" value={f.amount}
                                                    id={f.id}
                                                    disabled={f.status === 'PENDING' ? false : true}
                                                    defaultChecked={f.status === 'PENDING' ? false : true}
                                                    onChange={event => checkBoxOnChange(event,f.feesFor)}
                                                />
                                                <label class="form-check-label" for={f.id}>
                                                    {f.status === 'PENDING' ? "Select for Submit Fees" : "Submitted"}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">{f.dt ? f.dt : 'Pending'}</small>
                                        </div>
                                    </div>

                                )}
                            </div>)}

                    </div>

                    <div class="card " style={{ width: '50rem' }}>
                        <div class="card-body">
                            <div class="form-row">
                            <div class="row">
                            <div class ="col-3">
                            <label htmlFor="financeYr">Finance Year</label>
                            <SelectBoxFinancialYear id = "financeYr" defaultValue = {fees.financialYear} getSelectBoxFinancialYear = {getSelectBoxFinancialYear}/> 
                            </div>
                            </div>
                                {<div class="row">
                                    <div class="form-group  col" >
                                        <label htmlFor="admissionFees">Admission Fees</label>
                                        <input type="number"
                                            pattern="[0-9]*"
                                            id="admissionFees"
                                            name="admissionFees"
                                            readOnly={true}
                                            className={`form-control`}
                                            defaultValue={fees.admissionFees}
                                            aria-describedby="inputGroupPrepend3"
                                        />
                                    </div>


                                    <div class="form-group col-5">
                                        <label htmlFor="totalAdmissionFees">Total Admission Fees</label>
                                        <input type="number"
                                            pattern="[0-9]*"
                                            id="totalAdmissionFees"
                                            name="totalAdmissionFees"
                                            defaultValue={fees.admissionFees}
                                            class="form-control"
                                            readOnly={true}
                                            onChange={(event) => setAdmissionTotal(event.target.value)} />
                                    </div>
                                </div>
                                }
                                <div class="row">
                                    <div class="form-group  col-3" >
                                        <label htmlFor="monthlyFees">Monthly Fees</label>
                                        <input type="number"
                                            pattern="[0-9]*"
                                             id="monthlyFees"
                                            name="monthlyFees"
                                            readOnly={true}
                                            className={`form-control`}
                                            defaultValue={fees.monthlyFees}
                                            aria-describedby="inputGroupPrepend3"
                                        />
                                    </div>
                                    <div class="form-group col ">
                                        <label htmlFor="monthCount">Month Count</label>
                                        <input type="number"
                                            pattern="[0-9]*"
                                             id="monthCount" 
                                             name="monthCount"
                                            class="form-control"
                                            value={monthlyChecked}
                                            />
                                    </div>
                                    <div class="form-group  col">
                                        <label htmlFor="totalMonthlyFees">Total Monthly Fees</label>
                                        <input type="number"
                                            pattern="[0-9]*" id="totalMonthlyFees" name="totalMonthlyFees"
                                            defaultValue={0}
                                            value={monthyTotal}
                                            readOnly={true}
                                            class="form-control" onChange={(event) => setMonthlyTotal(event.target.value)}
                                        />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group  col-3" >
                                        <label htmlFor="examFees">Exam Fees</label>
                                        <input type="text" id="examFees"
                                            name="examFees"
                                            readOnly={true}
                                            className={`form-control`}
                                            aria-describedby="inputGroupPrepend3"
                                            defaultValue={fees.examFees}
                                        />
                                    </div>
                                    <div class="form-group col ">
                                        <label htmlFor="examCount">Exam Count</label>
                                        <input type="number"
                                            pattern="[0-9]*" 
                                        id="examCount"
                                         name="examCount"
                                            class="form-control"
                                            value= {examChecked}
                                           
                                        />
                                    </div>
                                    <div class="form-group  col">
                                        <label htmlFor="totalExamFees">Total Exam Fees</label>
                                        <input type="number"
                                            pattern="[0-9]*"
                                            id="totalExamFees"
                                            name="totalExamFees"
                                            defaultValue={0}
                                            value={examTotal}
                                            class="form-control"
                                            readOnly={true}
                                            onChange={(event) => setExamTotal(event.target.value)}

                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group  col-3" >
                                        <h4> Grand Total </h4>
                                    </div>
                                    <div class="form-group col ">

                                    </div>
                                    <div class="form-group  col">
                                        <h4>  {total} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        </>
    )

}
export default FeesForm; 