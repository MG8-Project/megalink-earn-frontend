import styled from "styled-components";
import { useEffect, useState } from "react";

interface RemainTimeProps {
  remainTime: number;
}

const RemainTime = (props: RemainTimeProps) => {
  const { remainTime } = props;
  const [timestamp, setTimestamp] = useState<number>(0);
  const convertTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedDays = days < 10 ? `0${days}` : `${days}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return (
      <div>
        <TimeContainer>
          <TimeWidth>{formattedDays}</TimeWidth>
          <p>:</p>
          <TimeWidth>{formattedHours}</TimeWidth>
          <p>:</p>
          <TimeWidth>{formattedMinutes}</TimeWidth>
          <p>:</p>
          <TimeWidth>{formattedSeconds}</TimeWidth>
        </TimeContainer>
        <TimeText>
          <TimeWidth>Days</TimeWidth>
          <TimeWidth>Hours</TimeWidth>
          <TimeWidth>Minutes</TimeWidth>
          <TimeWidth>Seconds</TimeWidth>
        </TimeText>
      </div>
    );
  };

  useEffect(() => {
    setTimestamp(remainTime);
    const intervalId = setInterval(() => {
      setTimestamp((prevTimestamp) => {
        const newTimestamp = prevTimestamp - 1000;
        return newTimestamp <= 0 ? 0 : newTimestamp;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainTime]);

  return (
    <RemainWrapper>
      <StyledTitle>Remaining until Airdrop</StyledTitle>
      <TimeWrapper>{convertTime(timestamp)}</TimeWrapper>
    </RemainWrapper>
  );
};
export default RemainTime;

const RemainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  gap: 16px;
  padding-bottom: 56px;
`;
const StyledTitle = styled.div``;
const TimeWrapper = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 48px;
  font-weight: 500;
  align-items: center;

  > p {
    color: #999;
    font-size: 28px;
  }
`;
const TimeWidth = styled.div`
  width: 64px;
  text-align: center;
`;
const TimeText = styled.div`
  display: flex;
  justify-content: space-between;
  color: #999;
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
  font-weight: 400;
  line-height: 20px;
`;
