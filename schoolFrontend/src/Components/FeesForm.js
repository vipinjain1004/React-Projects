import React from 'react'
import { Form, useActionData, redirect } from "react-router-dom";
function FeesForm() {
    const fees = {
        financialYear: "2022 - 23",
        feesDetail: [
            [{
                id: "212345_1",
                feesFor: "ADMISSION",
                amount: 20.32,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
            },
            {
                id: "212345_2",
                feesFor: "EXAM",
                amount: 100,
                dt: "10-10-23",
                userId: "123456",
                status: "SUBMITTED"
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
    // const lengthOfArray = fees.feesDetail.length;
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
                                            <p class="card-text">Amount : {f.amount}</p>

                                            <input class="form-check-input" type="checkbox" value="" id={f.id} disabled={f.status === 'PENDING' ? false : true} />
                                            <label class="form-check-label" for={f.id}>
                                                {f.status === 'PENDING' ? "Select for Submit Fees" : "Submitted"}
                                            </label>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">{f.dt ? f.dt : 'Pending'}</small>
                                        </div>
                                    </div>

                                )}
                            </div>)}

                    </div>
                </Form>
            </div>
        </div>
        </>
    )

}
export default FeesForm; 