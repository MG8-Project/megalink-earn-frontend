import styled from "styled-components";
import { theme } from "../../styles/theme";
import Mission from "./Mission";

interface SpinProps {
  onLearnMoreClick: () => void;
}
const Spin = ({ onLearnMoreClick }: SpinProps) => {
  return (
    <SpinWrapper>
      <TitleContainer>
        <MainTitle>$MG8 Spin</MainTitle>
        <SubTitleContainer>
          <SecondTitle>
            Rule: Turn the spin and earn rewards. The pool of rewards offered
            every day is limited.
          </SecondTitle>
          <SubTitle>
            Rule: Turn the spin and earn rewards. The pool of rewards offered
            every day is limited.
          </SubTitle>
        </SubTitleContainer>
        <LearnButton onClick={onLearnMoreClick}>Learn more</LearnButton>
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

const SecondTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
`;
const SubTitleContainer = styled.div`
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
  font-weight: 600;
  width: 160px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;
