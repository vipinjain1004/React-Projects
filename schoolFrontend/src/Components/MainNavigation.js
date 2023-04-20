import React from 'react';
import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {authenticationAction} from '../store/ReduxAuthentication';
import { useNavigate } from 'react-router';
function MainNavigation() {
	const userData = useRouteLoaderData('root');
	const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
	const authenticationData = useSelector(state => state.authentication);
	const dispatch = useDispatch();
	const navigate = useNavigate();
  
	const userKey = userData.auth;
	const userName = userData.user_name;
	const onClickLogOutHandler = (event)=>{
		event.preventDefault();	
		dispatch(authenticationAction.logout());
		navigate('/');

	}

	return (<>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">School</a>
			<button class="navbar-toggler" type="button"
				data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
				aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" >
				<ul class="navbar-nav mr-auto">

					<li class="nav-item active">

						<NavLink to="/" className={({ isActive }) => isActive ? `nav-link  active` : `nav-link `} end >
							Home</NavLink>
					</li>
					{isLoggedIn && <li class="nav-item"> 
						<NavLink to="/students" className={({ isActive }) => isActive ? `nav-link  active` : `nav-link `} >Students</NavLink>
					</li>}

					{isLoggedIn && (<li class="nav-item">
						<button class="btn btn-outline-success" onClick = {onClickLogOutHandler}>Logout</button>
					</li>)}
					{!isLoggedIn && (<li class="nav-item"><NavLink to="/login" className={({ isActive }) => isActive ? `nav-link  active` : `nav-link `}  >Login</NavLink></li>)}

				</ul>
				{isLoggedIn && <span class="navbar-text" style = {{"position": "absolute",
  "right": "3rem"}}>
					Welcome : {authenticationData.userName}
				</span>}
			</div>
		</nav>
		<nav class="navbar fixed-bottom navbar-light bg-light">
			<a class="navbar-brand" href="#">Fixed bottom</a>
		</nav>
		</>);

}
export default MainNavigation;