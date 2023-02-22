import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css'
function MainNavigation(){
	return (
<header>
	<nav>
		<ul>
			<li>
				<NavLink to="/" className = {({isActive}) => isActive ? classes.heading : undefined} end >Home</NavLink>
			</li>
			<li>
				<NavLink to="/students" className = {({isActive}) => isActive ? classes.heading : undefined}>Students</NavLink>
			</li>
		</ul>
	</nav>
</header>);

}
export default MainNavigation;