import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles/status.css';

function Status() {
  const [totalTransactions, setTotalTransactions] = useState(null);
  const [transactionsToday, setTransactionsToday] = useState(null);
  const [newWalletsToday, setNewWalletsToday] = useState(null);
  const [totalWallets, setTotalWallets] = useState(null);
  const [spinCount, setSpinCount] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = '/infiniteSpin/mega8/status'
      try {
        const totalTransactionsResponse = await API.get(`${endpoint}/totalTransactions`);
        setTotalTransactions(totalTransactionsResponse.data);

        const transactionsTodayResponse = await API.get(`${endpoint}/totalTransactions`);
        setTransactionsToday(transactionsTodayResponse.data);

        const newWalletsTodayResponse = await API.get(`${endpoint}/newWalletsToday`);
        setNewWalletsToday(newWalletsTodayResponse.data);

        const totalWalletsResponse = await API.get(`${endpoint}/totalWallets`);
        setTotalWallets(totalWalletsResponse.data);

        const spinCountResponse = await API.get(`${endpoint}/spinCount`);
        setSpinCount(spinCountResponse.data);

        const totalPointsResponse = await API.get(`${endpoint}/totalPoints`);
        setTotalPoints(totalPointsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    // <div className="bg-back font-sans leading-normal tracking-normal">
    <div className="container mx-auto bg-back font-sans leading-normal tracking-normal">
        <div className="py-8">
            <div>
                <h2 className="text-3xl font-semibold leading-tight">Status</h2>
            </div>
            <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Total Transactions</div>
                    <div className="text-xl font-bold">{totalTransactions}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Total Wallets</div>
                    <div className="text-xl font-bold">{totalWallets}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Transactions Today</div>
                    <div className="text-xl font-bold">{transactionsToday}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">New Wallets Today</div>
                    <div className="text-xl font-bold">{newWalletsToday}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Spin Count</div>
                    <div className="text-xl font-bold">{spinCount}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Total Points</div>
                    <div className="text-xl font-bold">{totalPoints}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">$MG8 Dropped</div>
                    <div className="text-xl font-bold">678,901,234 MG8(예시)</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">BNB Rewarded</div>
                    <div className="text-xl font-bold">1,234(예시)</div>
                </div>
            </div>
        </div>
    </div>
// </div>
  );
}

export default Status;
