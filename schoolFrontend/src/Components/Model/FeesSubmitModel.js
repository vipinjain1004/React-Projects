
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StudentDetails from '../StudentDetails';

function FeesSubmitModel(props) {
    console.log("Response on model" + JSON.stringify(props.responseBody));
    return (
        <>
        <Modal
            {...props}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Fees Receipt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StudentDetails />{props.responseBody &&
                    <>

                    <div class="card">
                        <div class="card-header">
                            <span>
                                <span style={{ textAlign: "left" }}> Financial Year : {props.responseBody.financialYear}   </span>
                                <span style={{ float: "right" }}>Total Fees Submitted : {props.responseBody.totalAmout}  </span>
                            </span>
                            <br/>
                            <span>
                                <span>Class : {props.responseBody.stdClass}</span>
                                <span style={{ float: "right" }}> Date : {props.responseBody.feesDetails[0].dt} </span>
                            </span>
                            <br/>
                            <span>
                                <span> Receipt No : {props.responseBody.hardCopyReceiptNo} </span>
                                <span style={{ float: "right" }}></span>
                            </span>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Month</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.responseBody.feesDetails.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.feesFor} </td>
                                        <td>{item.amount} </td>
                                        <td>{item.dt}</td>

                                    </tr>)
                                }
                            </tbody>
                        </table>
                        <div class="card-footer">
                            <small> Ref No : {props.responseBody.id} </small>
                            <small style={{ float: "right" }}> User Id : {props.responseBody.userId} </small>
                        </div>
                    </div>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.actionOnClick}>Print</Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default FeesSubmitModel;