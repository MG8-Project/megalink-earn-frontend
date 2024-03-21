import styled from "styled-components";
import { theme } from "../../styles/theme";
import { clock } from "../../assets/images";

// 12 hours  countdown

const time = new Date();

const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();

const timeUnits = [
  { value: hours, label: "Hours" },
  { value: minutes, label: "Minutes" },
  { value: seconds, label: "Seconds" },
];

const MissionCard = () => {
  return (
    <CardContainer>
      <CardBox>
        <CardImage src={clock} alt="" />
        <CardTitle>Daily Mission</CardTitle>
        <TimeContainer>
          {timeUnits.map((unit, index) => (
            <TimeBox key={index}>
              <TimeText>
                {unit.value}
                {index !== timeUnits.length - 1 && <p>:</p>}
              </TimeText>
              <TimeUnit>{unit.label}</TimeUnit>
            </TimeBox>
          ))}
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
