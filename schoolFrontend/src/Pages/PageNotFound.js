import React from 'react';
import { Link } from 'react-router-dom';
function PageNotfoundPage(){

    return (
        <>
        <h1> Page or resource not Found </h1>
        <Link to="/"> Go to Home Page </Link>
        </>
    )
}
export default PageNotfoundPage;