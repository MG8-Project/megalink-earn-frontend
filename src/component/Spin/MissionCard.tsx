import { useState, useEffect } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { clock } from "../../assets/images";

const MissionCard = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {}, []);
  useInterval(() => {
    setRemainingTime(getRemainingTime());
  }, 1000);
  function getRemainingTime() {
    const now = new Date();
    const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

    let nextChargeTime: Date;
    if (now.getUTCHours() < 12) {
      nextChargeTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
    } else {
      nextChargeTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    }

    const difference = nextChargeTime.getTime() - nowUTC;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }
  return (
    <CardContainer>
      <CardBox>
        <CardImage src={clock} alt="" />
        <CardTitle>Daily Mission</CardTitle>
        <div>
          <TimeContainer>
            {remainingTime.hours.toString().padStart(2, "0")}
            <p>:</p>
            {remainingTime.minutes.toString().padStart(2, "0")}
            <p>:</p>
            {remainingTime.seconds.toString().padStart(2, "0")}
          </TimeContainer>
          <TimeText>
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
          </TimeText>
        </div>
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
  padding-bottom: 48px;
  text-align: center;
  line-height: 100%;
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
  justify-content: space-between;
  color: ${theme.colors.textGray};
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 48px;
  font-weight: 500;
  align-items: center;

  > p {
    color: ${theme.colors.textGray};
    font-size: 28px;
  }
`;

const CardText = styled.div`
  margin-top: 56px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;
