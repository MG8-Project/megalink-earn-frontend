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
        <CardMiddleBox>
          <CardImageBox>
            <CardImage src={clock} alt="" />
            <CardTitle>Daily Mission</CardTitle>
          </CardImageBox>
          <TimeContainer>
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
        </CardMiddleBox>
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
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px 48px 0px;
  gap: 56px;
`;

const CardImage = styled.img`
  width: 64px;
`;

const TimeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 18px;
  font-weight: 400;
`;
const CardImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;
const CardMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;
const Colon = styled.p`
  position: relative;
  top: 10px;
  color: ${theme.colors.textGray};
  font-size: 28px;
  font-weight: 600;
`;
