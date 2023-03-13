import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
function EditStudentDetailsModel(props) {
  const link = '../' + props.id + '/edit';
  console.log("property in edit model" + JSON.stringify(props));
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop='static'
      className = 'success'     
    >
      <Modal.Header  variant="success"  >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.id && <p>Successfully Submit the Form</p>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Successfully sumbitted the form for {props.value.fName}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {props.state === 'Create' && 
          <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit' }}><Button type='button' class='btn btn-primary' >Add More Details</Button></Link>}
        <Link to='/students' style={{ color: 'inherit', textDecoration: 'inherit' }}><Button onClick={props.onHide}>Close</Button></Link>
      </Modal.Footer>
    </Modal>
  );
}
export default EditStudentDetailsModel;