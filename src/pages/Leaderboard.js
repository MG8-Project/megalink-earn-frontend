import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';

function Leaderboard () {
	const [option, setOption] = useState('individual');
	const [leaderboard, setLeaderboard] = useState([]);
	const userId = '1'; // 고정된 userId
	const teamCode = 'abcd'; // 고정된 teamCode
	
	const fetchData = useCallback(async () => {
		let endpoint = option === 'individual' ? `/game/personalRnk?userId=${userId}` : `/game/teamRnk?teamCode=${teamCode}`;
		try {
			const response = await API.get(endpoint);
			setLeaderboard(response.data);
		} catch (error) {
		  console.error('Error fetching data: ', error);
		}
	}, [userId, teamCode, option]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	
	const handleOptionChange = (event) => {
		setOption(event.target.value);
	};

	return (
		<div>
			<h3>MG8 24h Leaderboard</h3>
			<p>Check the scores you have earned and compare them with the participants. The ranking changes every 24 hours.</p>
			
			<div>
				<input type="radio" id="individual" name="leaderboard" value="individual" checked={option === 'individual'} onChange={handleOptionChange} />
				<label htmlFor="individual">Individual</label>
				<input type="radio" id="team" name="leaderboard" value="team" checked={option === 'team'} onChange={handleOptionChange} />
				<label htmlFor="team">Team</label>
			</div>
			<table>
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
				{leaderboard.slice(0, option === 'individual' ? 50 : 10).map((item, index) => (
				<tr key={index}>
					<td>{item.ranking}</td>
					<td>{option === 'individual' ? item.Name : item.TeamName}</td>
					<td>{item.Nationality}</td>
					{option === 'individual' && <td>{item.Level}</td>}
					<td>{item.Booster}</td>
					<td>{item.Total}</td>
				</tr>
				))}
			</tbody>
			</table>
		</div>
  );
}

export default Leaderboard;
