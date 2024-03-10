import React, { useState, useEffect } from 'react';
import API from '../services/api';

function DailyMG8() {
  const userAccount = "dljfeasdfoiajefoij";
  const [receivedStatus, setReceivedStatus] = useState([]);

  useEffect(() => {
    const fetchReceivedStatus = async () => {
      try {
        const response = await API.get('/mega8/personal/myTotalLogin', userAccount);
        setReceivedStatus(response.data);
      } catch (error) {
        console.error('Error fetching received status:', error);
      }
    };
    fetchReceivedStatus();
    return () => {
    };
  }, []);

  return (
    <div>
      <h3>Daily dose of $MG8</h3>
      <p>Login 7 days in a row, and your rewards will grow.</p>
      <table>
        <thead>
          <tr>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 받았는지 유무 표시 */}
            {receivedStatus.map((status, index) => (
				// 추후 이미지로 대체
              <td key={index}>{status === '1' ? '출석' : '미출석'}</td>
            ))}
          </tr>
          <tr>
            <td>+100P</td>
            <td>+100P</td>
            <td>+100P</td>
            <td>+100P</td>
            <td>+100P</td>
            <td>+100P</td>
            <td>+100P</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DailyMG8;
