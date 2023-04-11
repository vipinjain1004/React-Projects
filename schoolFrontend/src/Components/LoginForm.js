import React,{useEffect} from 'react';
import { Form, useFormAction, redirect, useActionData } from 'react-router-dom';
import { useNavigate, json } from "react-router";
import {useDispatch} from 'react-redux';
import {authenticationAction} from '../store/ReduxAuthentication';
function LoginForm() {
	const navigate = useNavigate();   	
	const data = useActionData();
	const  dispatch = useDispatch();
	var errData1 = '';
	
	useEffect(()=>{		
		if (data && data.status === 200) {
			let d1 = JSON.parse(JSON.stringify(data));
			console.log("ACtion Data Login" +JSON.stringify(data));
			dispatch(authenticationAction.login({payload : d1.data.userName}));			
			navigate('/');
		}else 	if (data && data.status === 500) {
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
									id="user_name" name="user_name" placeholder="Enter a valid email address" />
								<label class="form-label" for="form3Example3">Email address</label>
							</div>

							<div class="form-outline mb-3">
								<input type="password" class="form-control form-control-lg"
									placeholder="Enter password" id="pwd" name="pwd" />
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
	const data = await request.formData();
	const userName = data.get('user_name');
	const pwd = data.get('pwd');
	if (userName === 'xyz@xyz.com') {
		return json({ message: 'Could not authenticate user.', status: 500 });
	}
	const loginData = {
		user_name: data.get('user_name'),
		pwd: data.get('pwd')
	};
	console.log(JSON.stringify(loginData));
	localStorage.setItem("user_key", loginData.user_name + '-' + loginData.pwd);
	const exp = new Date();
	console.log(exp);
	exp.setHours(exp.getHours() + 1);
	console.log("After update " + exp);
	localStorage.setItem("expiration", exp.toISOString());
	localStorage.setItem('user_name', loginData.user_name);
	return json({ data: {
		userName: data.get('user_name'),
		pwd: data.get('pwd')
	}, status: 200 });
//	return redirect('/');

}