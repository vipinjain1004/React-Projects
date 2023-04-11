import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './StudentNavigation.module.css'
function StudentsNavigation(){
  
	return (
		<>
<ul class="nav nav-tabs">
  <li class="nav-item">
  <NavLink to="/students"  className = {({isActive}) => isActive ? `nav-link  active` : `nav-link `} end >All Students</NavLink>

  </li>
  <li class="nav-item">
  <NavLink to="/students/new"  className = {({isActive}) => isActive ? `nav-link active`: `nav-link `}>New Student</NavLink>
  </li>
</ul>
</>

);

}
export default StudentsNavigation;