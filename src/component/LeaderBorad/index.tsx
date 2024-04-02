import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import IndividualList from "./Individual";
import TeamList from "./Team";
import { INDIVIDUAL, TEAM } from "../../constants";

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState(INDIVIDUAL);
  const isTabIndividual = activeTab === INDIVIDUAL;
  return (
    <LeaderBoardWrapper id="leaderboard">
      <TitleContainer>
        <MainTitle>MG8 24h Leaderboard</MainTitle>

        <SecondTitle>
          Check the scores you have earned and compare them with the
          participants. The ranking changes every 24 hours.
        </SecondTitle>
      </TitleContainer>
      <PageTitle>
        <TabButton
          onClick={() => setActiveTab(INDIVIDUAL)}
          style={{
            borderBottom: isTabIndividual ? "2px solid white" : "none",
            color: isTabIndividual ? "#FFFFFF" : theme.colors.textGray,
          }}
        >
          Individual
        </TabButton>
        <TabButton
          onClick={() => setActiveTab(TEAM)}
          style={{
            borderBottom: !isTabIndividual ? "2px solid white" : "none",
            color: !isTabIndividual ? "#FFFFFF" : theme.colors.textGray,
          }}
        >
          Team
        </TabButton>
      </PageTitle>
      {isTabIndividual ? <IndividualList /> : <TeamList />}
    </LeaderBoardWrapper>
  );
};

export default LeaderBoard;

const LeaderBoardWrapper = styled.div`
  margin: 160px 0px;
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

const PageTitle = styled.div`
  margin-top: 80px;
  display: flex;
  font-weight: 600;
  font-size: 20px;
  gap: 40px;
`;

// styled component에서 사용자의 custom attribute를 DOM에서 인식하지 못하는 경고문구로 인하여 바꾼 코드입니다.
// button tag의 attribute 중 active가 없기때문에 style attribute를 통하여 css를 동적으로 변경하도록 코드 수정했습니다.
// p.s : styled component에 attr이라는 메서드가 있지만, 해당 메서드는 기존에 존재하는 attribute에 한하여 사용이 가능하기 때문에 사용하지 않았습니다.
const TabButton = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  padding-bottom: 12px;
  font-size: 20px;
  cursor: pointer;
`;
