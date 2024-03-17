import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav';

function Header() {
	return (
		<header className='header'>
			<div className='header_contents'>
				<Link className='header_title' to={'/'}>Megalink Earn</Link>
				<Nav />
				<button className='button'>Connect Wallet</button>
			</div>
		</header>
	)
}

export default Header;