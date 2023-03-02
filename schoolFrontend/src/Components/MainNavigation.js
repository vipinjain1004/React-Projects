import React from 'react';
import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';
function MainNavigation() {
	const userData = useRouteLoaderData('root');
	const userKey = userData.auth;
	const userName = userData.user_name;

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

						<NavLink to="/" className = {({isActive}) => isActive ? `nav-link  active` : `nav-link `}  end >
							Home</NavLink>
					</li>
					{userKey && <li>
						<NavLink to="/students"  className = {({isActive}) => isActive ? `nav-link  active` : `nav-link `} >Students</NavLink>
					</li>}

					{userKey && (<li class="nav-item"><Form action='/logout' method='post'>
						<button class="btn btn-outline-success">Logout</button>
					</Form></li>)}
					{!userKey && (<li class="nav-item"><NavLink to="/login"  className = {({isActive}) => isActive ? `nav-link  active` : `nav-link `}  >Login</NavLink></li>)}
			
				</ul>
				{userName && <span class="navbar-text">
					Welcome : {userName}
    			</span>}
			</div>
		</nav>
		<nav class="navbar fixed-bottom navbar-light bg-light">
			<a class="navbar-brand" href="#">Fixed bottom</a>
		</nav>
		</>);

}
export default MainNavigation;