import React from 'react';
import {Form, useFormAction, redirect} from 'react-router-dom';
import { useNavigate } from "react-router";
function LoginForm(){
    const navigate = useNavigate();

	function cancelHandler(){
		navigate('/');
	}
    return (
        <Form method='post'>
        	<p>
				<label htmlFor="user_name">User Name</label>
                <input type="text" id = "user_name" name="user_name" 
                  />
			</p>
			<p>
				<label htmlFor="pwd">Password</label>
                <input type="Password" id = "pwd"name="pwd" 
                 />
			</p>
			
			<p>
				<button>Login</button>
				<button type="button" onClick ={cancelHandler}>Cancel</button>
			</p>

        </Form>
    );

}
export default LoginForm;


export async function action({request, params}){
	const data = await request.formData();
	const loginData = {
		user_name : data.get('user_name'),
		pwd : data.get('pwd')
	};
    console.log(JSON.stringify(loginData));
    localStorage.setItem("user_key", loginData.user_name+'-'+loginData.pwd);
    const exp = new Date();
    console.log(exp);
    exp.setHours(exp.getHours() + 1);
    console.log("After update " + exp);
    localStorage.setItem("expiration", exp.toISOString());
    return redirect('/');
	
}