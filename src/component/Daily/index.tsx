import styled from "styled-components";
import { theme } from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import { loading } from "../../assets/images";
import ButtonBox from "./ButtonBox";

const Daily = () => {
  return (
    <DailyWrapper>
      <TitleContainer>
        <MainTitle>Daily dose of $MG8</MainTitle>
        <SubTitle>Login 7 days in a row, and your rewards will grow.</SubTitle>
      </TitleContainer>
      <ContentWrapper>
        <DayWrapper>
          <Reward />
          <Line />
          <Points />
        </DayWrapper>
        {/* <ButtonWrapper>
          <ButtonBox />
        </ButtonWrapper> */}
      </ContentWrapper>
    </DailyWrapper>
  );
};

export default Daily;

const DailyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const TitleContainer = styled.div`
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
  margin-bottom: 80px;
`;

const DayWrapper = styled.div`
  width: 1200px;
  height: 282px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
  padding: 48px 90px 48px 48px;
  display: flex;
  justify-content: space-between;
`;

const Line = styled.div`
  position: absolute;
  right: 30%;
  top: 30%;
  width: 1px;
  height: 80px;
  border-left: 1px solid #333333;
`;

const ContentWrapper = styled.div`
  display: flex;
  position: relative;
`;
