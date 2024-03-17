import React, { useState, useEffect, useCallback } from 'react';
import leaderboardAPI from '../services/apiLeaderboard';

function Leaderboard () {
	const [option, setOption] = useState('individual');
	const [leaderboard, setLeaderboard] = useState([]);
	const userAccount = 'abcd'; // 고정된 userAccount
	
	const fetchLeaderboard = useCallback(async () => {
		try {
			const response = await leaderboardAPI.leaderboard(option, userAccount);
			setLeaderboard(response.data);
		} catch (error) {
		  console.error('Error fetching Leaderboard: ', error);
		}
	}, [option]);

	useEffect(() => {
		fetchLeaderboard();
	}, [fetchLeaderboard]);
	
	const handleOptionChange = (event) => {
		setOption(event.target.value);
	};

	return (
		<div className='title'>
			<h1>MG8 24h Leaderboard</h1>
			<p>Check the scores you have earned and compare them with the participants. The ranking changes every 24 hours.</p>
			
			<div>
				<input type="radio" id="individual" name="leaderboard" value="individual" checked={option === 'individual'} onChange={handleOptionChange} />
				<label htmlFor="individual">Individual</label>
				<input type="radio" id="team" name="leaderboard" value="team" checked={option === 'team'} onChange={handleOptionChange} />
				<label htmlFor="team">Team</label>
			</div>
			<table className='mainTable mainDiv'>
			<thead>
				<tr>
				<th>Position</th>
				<th>Name</th>
				<th>Nationality</th>
				{option === 'individual' && <th>Level</th>}
				<th>Booster</th>
				<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{leaderboard.length > 0 ?
					(leaderboard.slice(0, option === 'individual' ? 50 : 10).map((item, index) => (
						<tr key={index}>
						<td>{item.ranking}</td>
						<td>{option === 'individual' ? item.Name : item.TeamName}</td>
						<td>{item.Nationality}</td>
						{option === 'individual' && <td>{item.Level}</td>}
						<td>{item.Booster}</td>
						<td>{item.Total}</td>
					</tr>
					))
					):(<tr className='text-center'><td colSpan={option === 'individual' ? 6 : 5}>데이터가 없습니다.</td></tr>
				)}
			</tbody>
			</table>
		</div>
  );
}

export default Leaderboard;
