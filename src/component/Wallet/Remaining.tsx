import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";

const Remaining = () => {
  const [time, setTime] = useState(172800); // 초로 전체시간을 줌
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RemainWrapper>
      <div>Remaining until Airdrop</div>
      <TimeContainer>
        <TimeBox>
          <TimeText>
            {days}
            <TimeUnit>Days</TimeUnit>
          </TimeText>
        </TimeBox>
        <Colon>:</Colon>
        <TimeBox>
          <TimeText>
            {hours} <TimeUnit>Hours</TimeUnit>
          </TimeText>
        </TimeBox>
        <Colon>:</Colon>
        <TimeBox>
          <TimeText>
            {minutes} <TimeUnit>Minutes</TimeUnit>
          </TimeText>
        </TimeBox>
        <Colon>:</Colon>
        <TimeBox>
          <TimeText>{seconds}</TimeText>
          <TimeUnit>Seconds</TimeUnit>
        </TimeBox>
      </TimeContainer>
    </RemainWrapper>
  );
};

export default Remaining;

const RemainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 56px;
`;

const TimeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeContainer = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  font-size: 48px;
  font-weight: 600;
`;

const TimeBox = styled.div`
  font-size: 48px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > span {
    color: ${theme.colors.textGray};
    font-weight: 400;
    font-size: 16px;
    margin-top: 12px;
  }
`;

const TimeUnit = styled.div`
  color: ${theme.colors.textGray};
  font-weight: 400;
  font-size: 14px;
  margin-top: 12px;
`;

const Colon = styled.p`
  position: relative;
  top: 10px;
  color: ${theme.colors.textGray};
  font-size: 28px;
  font-weight: 600;
`;
