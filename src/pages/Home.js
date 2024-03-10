import React from 'react';
import Wallet from './Wallet';
import Status from './Status';
import DailyMG8 from './DailyMG8';
import DailyPool from './DailyPool';
import Leaderboard from './Leaderboard';
import '../styles/Home.css';
import '../styles/footer.css';
import '../styles/header.css';
import '../styles/nav.css';
import '../styles/pages.css';

function Home () {
	return (
		<div className="Home">
			<Wallet />
			<Status />
			<DailyMG8 />
			<DailyPool />
			<Leaderboard />
		</div>
  );
}

export default Home;
