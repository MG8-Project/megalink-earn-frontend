import styled from "styled-components";
import { theme } from "../../styles/theme";

const time = new Date();
const days = time.getDay();
const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();

const timeUnits = [
  { value: days, label: "Days" },
  { value: hours, label: "Hours" },
  { value: minutes, label: "Minutes" },
  { value: seconds, label: "Seconds" },
];

const Remaining = () => {
  return (
    <RemainWrapper>
      <div>Remaining until Airdrop</div>
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
  font-size: 16px;
  margin-top: 12px;
`;
