import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { clock } from "../../assets/images";

const MissionCard = () => {
  const [time, setTime] = useState(43200); // 초로 12시간을 줌
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CardContainer>
      <CardBox>
        <CardImage src={clock} alt="" />
        <CardTitle>Daily Mission</CardTitle>
        <TimeContainer>
          <TimeBox>
            <TimeText>
              {hours} <p>:</p>
            </TimeText>
            <TimeUnit>Hours</TimeUnit>
          </TimeBox>
          <TimeBox>
            <TimeText>
              {minutes} <p>:</p>
            </TimeText>
            <TimeUnit>Minutes</TimeUnit>
          </TimeBox>
          <TimeBox>
            <TimeText>{seconds}</TimeText>
            <TimeUnit>Seconds</TimeUnit>
          </TimeBox>
        </TimeContainer>
        <CardText>Participate twice a day for 12 hours</CardText>
      </CardBox>
    </CardContainer>
  );
};
export default MissionCard;

const CardContainer = styled.div`
  width: 588px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 48px;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px 48px 0px;
`;

const CardImage = styled.img`
  margin-bottom: 16px;
`;

const TimeText = styled.div`
  display: flex;
  align-items: center;
  > p {
    color: ${theme.colors.textGray};
    font-size: 28px;
    font-weight: 600;
    margin-left: 18px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 20px;
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
  font-size: 16px;
  margin-top: 12px;
`;

const CardText = styled.div`
  margin-top: 56px;
  font-size: 18px;
  font-weight: 400;
`;
