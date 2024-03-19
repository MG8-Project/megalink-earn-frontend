import styled from "styled-components";
import { theme } from "../../styles/theme";
import { spinFrame, gift, clock, ticket } from "../../assets/images";

const time = new Date();

const hours = time.getHours();
const minutes = time.getMinutes();
const seconds = time.getSeconds();

const MissionCard = () => {
  return (
    <CardContainer>
      <CardBox>
        <CardImage src={clock} alt="" />
        <CardTitle>Daily Mission</CardTitle>
        <div>
          <TimeContainer>
            {hours} <p>:</p> {minutes} <p>:</p>
            {seconds}
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
  justify-content: space-between;
  color: ${theme.colors.textGray};
  font-weight: 400;
  font-size: 16px;
  margin-top: 12px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 48px;
  font-weight: 600;
  align-items: center;

  > p {
    color: ${theme.colors.textGray};
    font-size: 28px;
  }
`;

const CardText = styled.div`
  margin-top: 56px;
  font-size: 18px;
  font-weight: 400;
`;
