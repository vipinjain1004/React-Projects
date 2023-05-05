import React from 'react';

import Form from 'react-bootstrap/Form';

function SelectBoxFinancialYear(props) {
    const onChange = (event) => {
        const value = event.target.value;
        props.getSelectBoxFinancialYear(value);
        props.onChange(value);
    };

    return (
        <>
        <Form.Select aria-label="Default select example" 
            onChange={onChange} name='financeYr' defaultValue = {props.defaultValue}>
            <option value="" >Select Financial Year</option>
            <option value="2021-22">2021-22</option>
            <option value="2022-23">2022-23</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
            
        </Form.Select>
        </>
    );
}
export default SelectBoxFinancialYear;