import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [option, setOption] = useState('individual');
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = '1';
  const teamCode = 'abcd';

  useEffect(() => {
    fetchData();
  }, [option]);

  const fetchData = async () => {
    let endpoint = option === 'individual' ? `${apiUrl}/game/personalRnk?userId=${userId}` : `${apiUrl}/game/teamRnk?teamCode=${teamCode}`;
    try {
      const response = await axios.get(endpoint);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="App">
      <h1>Leaderboard</h1>
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

export default App;
