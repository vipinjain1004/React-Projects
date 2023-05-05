import React from 'react';

import Form from 'react-bootstrap/Form';

function ClassSelectBox(props) {
    const onChange = (event) => {
        const value = event.target.value;
        props.getValue(value);
    };

    return (
        <>
        <Form.Select aria-label="Default select example"
            onChange={onChange} name='stdClass' defaultValue = {props.defaultValue}>
            <option value="" >Select Class</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </Form.Select>
        </>
    );
}
export default ClassSelectBox;