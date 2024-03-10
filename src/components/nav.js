import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

function Nav () {
	return (
		<div className="navbar">
			<Link className="navbarMenu" to={'/'}>Home</Link>
			<Link className="navbarMenu" to={'/LeaderBoard'}>LeaderBoard</Link>
		</div>
	)
}

export default Nav;