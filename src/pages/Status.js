import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Status() {
  const [newWalletsToday, setNewWalletsToday] = useState(null);
  const [totalWallets, setTotalWallets] = useState(null);
  const [spinCount, setSpinCount] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newWalletsTodayResponse = await API.get('/status/newWalletsToday');
        setNewWalletsToday(newWalletsTodayResponse.data);

        const totalWalletsResponse = await API.get('/status/totalWallets');
        setTotalWallets(totalWalletsResponse.data);

        const spinCountResponse = await API.get('/status/spinCount');
        setSpinCount(spinCountResponse.data);

        const totalPointsResponse = await API.get('/status/totalPoints');
        setTotalPoints(totalPointsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Status</h3>
      <table>
        <tbody>
          <tr>
            <th>Total Transactions</th>
            <td>{}</td>
            <th>Total Wallets</th>
            <td>{totalWallets}</td>
          </tr>
          <tr>
            <th>Transactions Today</th>
            <td>{}</td>
            <th>New Wallets Today</th>
            <td>{newWalletsToday}</td>
          </tr>
          <tr>
            <th>Spin Count</th>
            <td>{spinCount}</td>
            <th>Total Points</th>
            <td>{totalPoints}</td>
          </tr>
          <tr>
            <th>$MG8 Dropped</th>
            <td>{}</td>
            <th>BNB Rewarded</th>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Status;
