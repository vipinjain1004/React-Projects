import React,{useEffect} from 'react';
import { Form, useFormAction, redirect, useActionData } from 'react-router-dom';
import { useNavigate, json } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import {authenticationAction} from '../store/ReduxAuthentication';
function LoginForm() {
	const navigate = useNavigate();   	
	const isLoggedIn = useSelector(state => state.isLoggedIn);
	const data = useActionData();
	const  dispatch = useDispatch();
	var errData1 = '';

	
	useEffect(()=>{		
		if (data && data.responseMetaData.statusCode === 200) {	
			console.log("ACtion Data Login" +JSON.stringify(data));				
			const exp = new Date();
			console.log(exp);
			exp.setHours(exp.getHours() + 1);
			console.log("After update " + exp);
			localStorage.setItem("expiration", exp.toISOString());
			localStorage.setItem('userName', data.responseBody.userName);
			localStorage.setItem('token',  'Bearer ' + data.responseBody.token);
			dispatch(authenticationAction.login({payload : {'token' : data.responseBody.token, 'userName': data.responseBody.userName}}));			
			navigate('/');
		}else if (data ) {
			errData1 = JSON.parse(JSON.stringify(data));
			console.log("Errore MEsa " + errData1.message);
		}
	},[data])

	

	function cancelHandler() {
		navigate('/');
	}
	return (
		<>
		{data && data.status === 500 && (<p> {errData1.message} </p>)}
		<section class="vh-100">
			<div class="container-fluid h-custom">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="col-md-9 col-lg-6 col-xl-5">
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							class="img-fluid" alt="Sample image" />
					</div>
					<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<Form method='post'>

							<div class="form-outline mb-4">
								<input type="email" class="form-control form-control-lg"
									id="user_name" name="user_name" defaultValue = 'vipin@agm.cm' placeholder="Enter a valid email address" />
								<label class="form-label" for="form3Example3">Email address</label>
							</div>

							<div class="form-outline mb-3">
								<input type="password" class="form-control form-control-lg"
									placeholder="Enter password" defaultValue = 'password' id="pwd" name="pwd" />
								<label class="form-label" for="form3Example4">Password</label>
							</div>

							<div class="d-flex justify-content-between align-items-center">

								<div class="form-check mb-0">
									<input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
									<label class="form-check-label" for="form2Example3">
										Remember me
									</label>
								</div>
								<a href="#!" class="text-body">Forgot password?</a>
							</div>

							<div class="text-center text-lg-start mt-4 pt-2">
								<button class="btn btn-primary btn-lg"
									style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem' }}>Login</button>
								<button type="button" onClick={cancelHandler} class="btn btn-primary btn-lg"
									style={{ 'padding-left': '2.5rem', 'padding-right': '2.5rem', margin: '2rem' }}>Cancel</button>
								<p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
									class="link-danger">Register</a></p>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</section>
		</>
	);

}
export default LoginForm;
export async function action({ request, params }) {
	const data1 = await request.formData();
	const userName = data1.get('user_name');
	const pwd = data1.get('pwd');
	const data2 = {
		'username': userName,
		'password' : pwd		
	}
	const response = await fetch('/authenticate', {  // Enter your IP address here
		method: 'Post',
		headers: {
            'content-type': 'application/json'
        },
		body: JSON.stringify(data2) // body data type must match "Content-Type" header
	})
	console.log('DAta on submit action' +JSON.stringify(response));
	if (!response.ok) {
		console.log('Data coud not be fetched!');
		return json({ message: 'Could not authenticate user.', status: 500 });
	} else {
		console.log(response + '\nRequest Data ' +JSON.stringify(data2));

		return response;
	} 
	
	
}