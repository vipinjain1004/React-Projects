import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GenericModal(props) {

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {props.body}
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick = {props.actionOnClick}>{props.successButton}</Button>
          <Button variant="secondary" onClick={props.onHide}>
          {props.cancelButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal;