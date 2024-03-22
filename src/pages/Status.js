import React, { useState, useEffect } from 'react';
import statusAPI from '../services/apiStatus';
import '../styles/status.css';

function Status() {
  const [status, setStatus] = useState({
    totalTransactions: 0,
    totalWallets: 0,
    transactionsToday: 0,
    newWalletsToday: 0,
    spinCount: 0,
    totalPoints: 0,
    MG8Dropped: 0,
    BNBRewarded: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statusAPI.status();
        setStatus({
            totalTransactions: response.totalTransactions,
            totalWallets: response.totalWallets,
            transactionsToday: response.transactionsToday,
            newWalletsToday: response.newWalletsToday,
            spinCount: response.spinCount,
            totalPoints: response.totalPoints,
            MG8Dropped: response.MG8Dropped,
            BNBRewarded: response.BNBRewarded
          });
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
                    <div className="text-xl font-bold">{status.totalTransactions}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Total Wallets</div>
                    <div className="text-xl font-bold">{status.totalWallets}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Transactions Today</div>
                    <div className="text-xl font-bold">{status.transactionsToday}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">New Wallets Today</div>
                    <div className="text-xl font-bold">{status.newWalletsToday}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Spin Count</div>
                    <div className="text-xl font-bold">{status.spinCount}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">Total Points</div>
                    <div className="text-xl font-bold">{status.totalPoints}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">$MG8 Dropped</div>
                    <div className="text-xl font-bold">{status.MG8Dropped}</div>
                </div>

                <div className="bg-white p-5 rounded-lg stat-card">
                    <div className="text-gray-600">BNB Rewarded</div>
                    <div className="text-xl font-bold">{status.BNBRewarded}</div>
                </div>
            </div>
        </div>
    </div>
// </div>
  );
}

export default Status;
