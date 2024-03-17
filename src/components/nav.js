import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

function Nav () {
	return (
		<nav className='nav'>
			<Link className='navbarMenu' to={'/'}>Home</Link>
			<Link className='navbarMenu' to={'/leaderboard'}>LeaderBoard</Link>
		</nav>
	)
}

export default Nav;