import React, { useState, useRef, useEffect, Suspense } from 'react'
import { Form, useActionData, redirect, useFetcher, useNavigate, Await } from "react-router-dom";
import classes from './FeesForm.module.css';
import SelectBoxFinancialYear from './SelectBoxFinancialYear';
import FeesSubmitModel from './Model/FeesSubmitModel'
import SpinnerModel from './Model/SpinnerModel';
import StudentDetails from './StudentDetails';

function FeesForm(props) {


    /*  
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
  
      };*/
    const [fees, setFees] = useState({});
    const [total, setTotal] = useState(0);
    const [monthlyChecked, setMonthlyChecked] = useState(0);
    const [admissionChecked, setAdmissionChecked] = useState(0);
    const [examChecked, setExamChecked] = useState(0);
    const [isAdmissionFeesSubmitted, setIsAdmissionFeesSubmitted] = useState(false);
    const [monthyTotal, setMonthlyTotal] = useState(0);
    const [admissionTotal, setAdmissionTotal] = useState(0);
    const [examTotal, setExamTotal] = useState(0);
    const [selectBoxFinancialYearValue, setSelectBoxFinancialYearValue] = useState('2023-24');
    const [response, setResponse] = useState({});
    const [feeDetailsResponse, setFeeDetailsResponse] = useState({});
    const [showReceiptModel, setShowReceiptModel] = useState(false);
    const [hardCopyNo, setHardCopyNo] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const { data, state, formAction } = fetcher;

    const callGetFeesDetails = async (stdId, financialYear) => {
        const response = await fetch(`/fees/getDetails?id=${stdId ? stdId : ''}&financialYear=${financialYear ? financialYear : ''}`,
            {
                method: 'GET',
            });
        if (!response.ok && response.status != 500) {
            throw new Response(JSON.stringify({ message: response.message }), { status: response.status });
        } else if (!response.ok && response.status === 500) {
            throw new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
        } else {
            console.log(response);
            const resdata = await response.json();
            setFees(resdata.responseBody);
            setIsLoading(false);

            if (resdata.responseBody) {
                setAdmissionTotal(0);
                setExamTotal(0);
                setMonthlyTotal(0);
                setSelectBoxFinancialYearValue(resdata.responseBody.financialYear);
            }


            return null;
        }
        return null;
    }

    useEffect(() => {
        //fetcher.submit({ id: props.studentDetails.id, financialYear: selectBoxFinancialYearValue }, { method: "post", action: "getFeesDetails" });
        callGetFeesDetails(props.studentDetails.id, selectBoxFinancialYearValue);
        console.log('Total Value' + monthyTotal + ' ' + examTotal + ' ' + admissionTotal);
        setTotal(0);
    }, [])
    useEffect(() => {
        console.log("data " + JSON.stringify(state));
        console.log("Fetcher " + JSON.stringify(fetcher));
        if (state === 'idle' && data) {
            setShowSpinner(false)
            console.log("Idle Statye" + JSON.stringify(data));
            setResponse(data);
            setShowReceiptModel(true);
            console.log("Idle Statye" + JSON.stringify(response));

        }
        if (state === 'submitting') {
            console.log("sUBMITTING Statye");

        }
    }, [data, state])


    useEffect(() => {
        console.log('Total Value' + monthyTotal + ' ' + examTotal + ' ' + admissionTotal);
        console.log('Total Fees DEtail' + JSON.stringify(fees));
        setTotal(Number(monthyTotal) + Number(examTotal) + Number(admissionTotal));
    }, [monthyTotal, examTotal, admissionTotal])

    useEffect(() => {
        setMonthlyTotal(fees.monthlyFees * monthlyChecked);
    }, [monthlyChecked]);

    useEffect(() => {
        setExamTotal(fees.examFees * examChecked);
    }, [examChecked]);

    useEffect(() => {
        if (admissionChecked > 0)
            setAdmissionTotal(fees.admissionFees);
        else
            setAdmissionTotal(0)
    }, [admissionChecked]);


    const checkBoxOnChange = (event, value) => {
        if (value === 'ADMISSION') {
            if (event.target.checked) {
                setAdmissionChecked(monthlyChecked + 1);
            } else {
                setAdmissionChecked(monthlyChecked - 1);
            }

        } else if (value === 'EXAM') {
            if (event.target.checked) {
                setExamChecked(examChecked + 1);
            } else {
                setExamChecked(examChecked - 1);
            }
            setExamTotal(examChecked * fees.examFees)
        } else {
            if (event.target.checked) {
                setMonthlyChecked(monthlyChecked + 1);

            } else {
                setMonthlyChecked(monthlyChecked - 1);
            }
            setMonthlyTotal(monthlyChecked * fees.monthlyFees);
        }
    }
    const getSelectBoxFinancialYear = (value) => {
        setSelectBoxFinancialYearValue(value);
    }
    const cancelHandler = () => {
        navigate('../');
    }
    const onChangeFinancialYear = (selectBoxValue) => {
        console.log("onChangeFinancialYear");
        // fetcher.submit({ id: props.studentDetails.id, financialYear: selectBoxFinancialYearValue }, { method: "post", action: "getFeesDetails" });

        setIsLoading(true);
        // setSelectBoxFinancialYearValue(selectBoxValue);
        callGetFeesDetails(props.studentDetails.id, selectBoxValue);

    }

    const onClickSubmitHandler = (event) => {
        setShowSpinner(true);
        console.log("Student Details" + props.studentDetails);
        event.preventDefault();
        const submittedFeesDetail = {
            studentId: props.studentDetails.id,
            name: props.studentDetails.fName,
            stdClass: props.studentDetails.stdClass,
            createdDate: "",
            userId: "vipinjain",
            token: "45454",
            totalAmout: total,
            financialYear: selectBoxFinancialYearValue,
            hardCopyNo: hardCopyNo,
            feesDetails: [
                {
                    feesFor: "ADMISSION",
                    amount: admissionTotal,
                },
                {
                    feesFor: "MONTHLY",
                    amount: monthyTotal,
                    count: monthlyChecked
                },
                {
                    feesFor: "EXAM",
                    amount: examTotal,
                    count: examChecked
                }
            ]
        }
        console.log("Submit details" + JSON.stringify(submittedFeesDetail));

        fetcher.submit({ feesDetails: JSON.stringify(submittedFeesDetail) }, { method: "post", action: "/submitFeesDetails" });
    }
    const submitModelOnClick = () => {
        console.log("Print Button Pressed");
    }
    const feeSubmitCloseButtonHander = () => {
        setShowReceiptModel(false)
        navigate('../');
    }

    return (
        <>

        <div class="card " style={{ margin: '2rem' }}>

            <div class="card-header">
                Fees Form
            </div>
            <div class="card-body">

                <fetcher.Form method="POST" >
                    <div class="form-row">

                        <div class="form-check">
                            <div class="row">
                                <div class="col-3">
                                    <label htmlFor="financeYr">Finance Year</label>
                                    <SelectBoxFinancialYear id="financeYr" defaultValue={selectBoxFinancialYearValue} getSelectBoxFinancialYear={getSelectBoxFinancialYear} onChange={onChangeFinancialYear} />
                                </div>
                            </div>
                            {isLoading && <div class="spinner-grow text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>}
                            {!isLoading && fees.feesDetail.map((feesDetails, index) =>
                                <div className={'card-group'}>
                                    {feesDetails.map((f, index) =>
                                        <div class="card" >
                                            <label class="form-check-label" htmlFor={f.id}>
                                                <div className={`card-body  ${f.status === 'PENDING' ? "text-warning" : "text-success"}`}>
                                                    <h5 class="card-title">{f.feesFor}</h5>
                                                    <p class="cardthis-text">Amount : {f.amount}</p>
                                                    <div className={classes.frmCheckbox}>
                                                        <input class="form-check-input" type="checkbox" value={f.amount}
                                                            id={f.id}
                                                            disabled={f.status === 'PENDING' ? false : true}
                                                            defaultChecked={f.status === 'PENDING' ? false : true}
                                                            onChange={event => checkBoxOnChange(event, f.feesFor)}
                                                        />

                                                        {f.status === 'PENDING' ? "Select for Submit Fees" : "Submitted"}

                                                    </div>
                                                </div>
                                            </label>
                                            <div class="card-footer">
                                                <small class="text-muted">{f.dt ? f.dt : 'Pending'}</small>
                                            </div>
                                        </div>

                                    )}
                                </div>)
                            }

                        </div>
                        {!isLoading &&
                            <div class="card" style={{ margin: '2rem 0rem 2rem 1.5rem' }}>
                                <div class="card-body">

                                    {admissionChecked > 0 && <div class="row">
                                        <div class="form-group  col-3" >
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
                                        <div class="form-group  col" >
                                            <label htmlFor="admissionFees">Count</label>
                                            <input type="text"
                                                readOnly={true}
                                                className={`form-control`}
                                                defaultValue='1'
                                                aria-describedby="inputGroupPrepend3"
                                            />
                                        </div>


                                        <div class="form-group col">
                                            <label htmlFor="totalAdmissionFees">Total Admission Fees</label>
                                            <input type="number"
                                                pattern="[0-9]*"
                                                id="totalAdmissionFees"
                                                name="totalAdmissionFees"
                                                defaultValue={admissionChecked > 0 ? fees.admissionFees : 0}
                                                class="form-control"
                                                readOnly={true}
                                                onChange={(event) => setAdmissionTotal(event.target.value)} />
                                        </div>
                                    </div>
                                    }
                                    {monthlyChecked > 0 && <div class="row">
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
                                    }
                                    {examChecked > 0 && <div class="row">
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
                                                value={examChecked}

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
                                    </div>}
                                    <div class="row">
                                        <div class="form-group  col-3" >
                                            <h4> Grand Total </h4>
                                        </div>
                                        <div class="form-group col ">

                                        </div>
                                        <div class="form-group  col">
                                            <h4> {total} </h4>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="form-group  col">
                                            <label htmlFor="hardCopyNo">Receipt Number (HardCopy)</label>
                                            <input type="number"
                                                pattern="[0-9]*" id="hardCopyNo" name="hardCopyNo"
                                                placeHolder="Receipt Number"

                                                class="form-control" onChange={(event) => setHardCopyNo(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col" style={{ marginTop: "1rem" }}>
                                            <button class="btn btn-outline-primary" type="button" style={{ marginRight: "1rem" }} onClick={onClickSubmitHandler} readOnly={(admissionChecked === 0 && monthlyChecked === 0 && examChecked === 0) || showSpinner}>
                                                {showSpinner && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                                {showSpinner ? '  Submitting' : 'Submit'}
                                            </button>
                                            <button type="button" className={`btn btn-outline-secondary`} onClick={cancelHandler}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </fetcher.Form>

            </div>
        </div>

        {!isLoading && <FeesSubmitModel
            onHide={feeSubmitCloseButtonHander}
            show={showReceiptModel}
            actionOnClick={submitModelOnClick}
            responseBody={response.responseBody} />}
        <SpinnerModel show={showSpinner} />

        </>

    )
}
export default FeesForm;
export async function action({ request, params }) {
    const data = await request.formData();
    const feeData = data.get('feesDetails');
    console.log("Fees Detailws" + JSON.parse(feeData));
    const response = await fetch(`/fees/add`, {  // Enter your IP address here
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: feeData// body data type must match "Content-Type" header
    })
    console.log('DAta on submit action' + JSON.stringify(response));
    if (!response.ok) {
        console.log('Data coud not be fetched!');
        throw new Error('Data coud not be fetched!')
    } else {
        console.log(response + '\nRequest Data ' + JSON.stringify(data));
        return response;
    }
    return null;


    //return redirect('/students')
}
