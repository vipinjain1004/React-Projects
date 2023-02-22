import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './StudentNavigation.module.css'
function StudentsNavigation(){
	return (
<header>
	<nav>
		<ul>
			<li>
				<NavLink to="/students" className = {({isActive}) => isActive ? classes.heading : undefined} end >All Students</NavLink>
			</li>
			<li>
				<NavLink to="/students/new" className = {({isActive}) => isActive ? classes.heading : undefined}>New Student</NavLink>
			</li>
		</ul>
	</nav>
</header>);

}
export default StudentsNavigation;