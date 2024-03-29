import styled from "styled-components";
import { theme } from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import Popup from "./Popup";
import ReceiptPopup from "./ReceiptPopup";
import FailPopup from "./FailPopup";

const Daily = () => {
  return (
    <>
      <DailyWrapper>
        <TitleContainer>
          <MainTitle>Daily dose of $MG8</MainTitle>
          <SubTitle>
            Login 7 days in a row, and your rewards will grow.
          </SubTitle>
        </TitleContainer>
        <DayWrapper>
          <RewardContainer>
            <Reward />
          </RewardContainer>
          <PointsContainer>
            <Points />
          </PointsContainer>
        </DayWrapper>
      </DailyWrapper>
      <Popup />
      <ReceiptPopup />
      <FailPopup />
    </>
  );
};

export default Daily;

const DailyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 160px;
`;
const TitleContainer = styled.div`
  margin-top: 160px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 48px;
`;

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

const DayWrapper = styled.div`
  width: 1200px;
  height: 266px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
  margin-top: 80px;
  padding: 48px 90px 48px 48px;
  display: flex;
  justify-content: space-between;
`;

const RewardContainer = styled.div``;

const PointsContainer = styled.div``;
