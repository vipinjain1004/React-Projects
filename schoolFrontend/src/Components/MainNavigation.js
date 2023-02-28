import React from 'react';
import { NavLink, Form,useRouteLoaderData } from 'react-router-dom';
import classes from './MainNavigation.module.css';
function MainNavigation(){
	const userKey = useRouteLoaderData('root');
	return (
<header>
	<nav>
		<ul>
			<li>
				<NavLink to="/" className = {({isActive}) => isActive ? classes.heading : undefined} end >Home</NavLink>
			</li>
			{userKey &&<li>
				 <NavLink to="/students" className = {({isActive}) => isActive ? classes.heading : undefined}>Students</NavLink>
			</li>}
			<li>
				{userKey && (<Form action='/logout' method='post'>
				<button>Logout</button>
				</Form> )}
				{!userKey && (<NavLink to="/login">Login</NavLink>)}
				
			</li>
		</ul>
	</nav>
</header>);

}
export default MainNavigation;