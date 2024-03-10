import React, { useState, useEffect } from 'react';
import { useInterval } from 'react-use';
import API from '../services/api';

function DailyPool() {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [totalTickets, setTotalTickets] = useState(null);

  useEffect(() => {
    fetchTotalTickets();
  }, [])
  useInterval(() => {
    setRemainingTime(getRemainingTime());
  }, 1000);

  async function fetchTotalTickets() {
    try {
      const response = await API.get('/infiniteSpin/mega8/personal/myParticipationTicket');
      setTotalTickets(response.data.reduce((acc, curr) => acc + curr, 0));
    } catch (error) {
      console.error('Error fetching total tickets:', error);
    }
  }
  function getRemainingTime() {
    const now = new Date();
    let targetTime = new Date();
    const targetHour = now.getHours() < 9 ? 9 : 21; // 오전 9시를 지나면 21시로 변경

    targetTime.setHours(targetHour, 0, 0, 0);

    let difference = targetTime - now;
    if (difference < 0) {
      // 시간이 지난 경우 내일 같은 시간으로 설정
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(targetHour, 0, 0, 0);
      difference = tomorrow - now;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <div>
      <div>
        <h3>$MG8 Spin</h3>
        <p>Rule: Turn the spin and earn rewards. The pool of rewards offered every day is limited.</p>
        <p>Hurry up. Please make a bet. Good luck to you.</p>
        <button>Learn more</button>
      </div>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              Daily Mission<br />
              {remainingTime.hours.toString().padStart(2, '0')}:
              {remainingTime.minutes.toString().padStart(2, '0')}:
              {remainingTime.seconds.toString().padStart(2, '0')}
              <br />
              Participate twice a day for 12 hours
            </td>
            <td rowSpan={3}>
              Infinite Spin
            </td>
          </tr>
          <tr>
            <td>
              Your Ticket<br />
              {totalTickets}
            </td>
          </tr>
          <tr>
            <td>
              Daily Pool <br/>
              {}%<br />
              Daily Quota Available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DailyPool;
