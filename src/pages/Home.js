import React from 'react';
import Header from '../components/header';
import Wallet from './Wallet';
import Status from './Status';
import DailyMG8 from './DailyMG8';
import DailyPool from './DailyPool';
import Leaderboard from './Leaderboard';

function Home () {
	return (
		<div className="App">
			<Header />
			<Wallet />
			<Status />
			<DailyMG8 />
			<DailyPool />
			<Leaderboard />
		</div>
  );
}

export default Home;
