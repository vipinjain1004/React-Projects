import React from 'react';
import {useRouteError} from 'react-router-dom';

function ErrorPage(){
    const error = useRouteError();
    let title  = 'An error occured';
    let message = 'Something went wrong !!!';
    if(error.status != 500){
        message = error.message;
    }
    return  (<> 
    <h1> {title}</h1>
    <h2>{message}</h2>
    </>);
}
export default ErrorPage;