
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StudentDetails from '../StudentDetails';
import classes from './SpinnerModel.module.css';

function SpinnerModel(props) {
    return (<>
       {props.show && <div className={classes.loading}>
       
            <div class={classes.spinner}>
                <div class={classes.rect1}></div>
                <div class={classes.rect2}></div>
                <div class={classes.rect3}></div>
                <div class={classes.rect4}></div>
                <div class={classes.rect5}></div>
            </div>
        </div>
       }
        </>
    );
}

export default SpinnerModel;