import styled from "styled-components";
import { theme } from "../../styles/theme";
import Mission from "./Mission";
import { Link } from "react-router-dom";
import { LEARN_URL } from "../../constants";

const Spin = () => {
  return (
    <SpinWrapper id={"1"}>
      <TitleContainer>
        <MainTitle>$MG8 Spin</MainTitle>
        <Subtitle>Play Slots to Win 10 BNB & $MG8 Airdrop! </Subtitle>
        <SubTitleContainer>
          <SecondTitle>
            Rule: Turn the spin and earn rewards. The pool of rewards offered
            every day is limited.
          </SecondTitle>
          <SubTitle>Hurry up. Please make a bet. Good luck to you.</SubTitle>
        </SubTitleContainer>
        <LearnButton>
          <Link to={LEARN_URL} target="_blank">
            How to play
          </Link>
        </LearnButton>
      </TitleContainer>
      <Mission />
    </SpinWrapper>
  );
};

export default Spin;

const SpinWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 48px;
`;

const Subtitle = styled.div`
  padding-top: 40px;
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
  background: linear-gradient(104deg, #82e8ff 0%, #379fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SecondTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
`;
const SubTitleContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;
const SubTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.textGray};
`;
const LearnButton = styled.button`
  display: flex;
  width: 160px;
  height: 52px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 18px;
  width: 160px;
  height: 52px;
  border-radius: 100px;
  background: #006ebe;
  backdrop-filter: blur(4px);
  border-radius: 100px;
`;
