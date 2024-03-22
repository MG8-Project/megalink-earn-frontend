import React, { useState, useEffect } from 'react';
import dailyAPI from '../services/apiDaily';

function DailyMG8() {
  const userAccount = "dljfeasdfoiajefoij";
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const [receivedStatus, setReceivedStatus] = useState([]);
  const [attendanceClicked, setAttendanceClicked] = useState(false);

  useEffect(() => {
    const fetchReceivedStatus = async () => {
      try {
        const response = await dailyAPI.myTotalLogin(userAccount);
        setReceivedStatus(response);
      } catch (error) {
        console.error('Error fetching received status:', error);
      }
    };
    fetchReceivedStatus();
    return () => {
    };
  }, []);
  const attendanceClick = async () => {
    if (!attendanceClicked && receivedStatus[currentDate] === '0') { 
      try {
        await dailyAPI.attend(userAccount);
        const updatedStatus = [...receivedStatus];
        setReceivedStatus(updatedStatus);
        setAttendanceClicked(true);
      } catch (error) {
        console.error('Error marking attendance:', error);
      }
    }
  };
  return (
    <div className='title'>
      <h1>Daily dose of $MG8</h1>
      <p>Login 7 days in a row, and your rewards will grow.</p>
      <table className='mainTable mainDiv'>
        <thead>
          <tr>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
            <th>My Total MG8 Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {receivedStatus.length > 0 ? (
            receivedStatus.map((status, index) => (
              <td key={index}>
                {(index === currentDay) ? (
                  <img
                    src='img/imageA.png'
                    alt='미출석'
                    onClick={status === '1' ? null : attendanceClick}
                    style={{cursor: 'pointer' }}
                    width={50}
                  />
                ) : (
                  <img
                    src={status === '1' ? "img/imageA.png" : "img/imageB.png"}
                    alt={status === '1' ? "출석" : "미출석"}
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                )}
              </td>
            ))
            ) : (
              <>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
                <td><img
                    src="img/imageB.png"
                    alt="미출석"
                    style={{ cursor: 'default' }}
                    width={50}
                  />
                </td>
              </>
            )}
              <td rowSpan={2}><button className='button'>Login</button></td>
            {/* {
              로그인 ? ({
                (상태) ? (
                <td rowSpan={2}><button className='button' style={{ cursor: 'default' }}>Login</button></td>
                ) : (
                <td rowSpan={2}><button className='button' style={{ cursor: 'default' }}>Login</button></td>
                )
              }) : (
                <td rowSpan={2}><button className='button'>Login</button></td>
            )} */}
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
