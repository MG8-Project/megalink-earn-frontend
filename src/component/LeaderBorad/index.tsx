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
  margin-top: 60px;
  display: flex;
  font-weight: 600;
  font-size: 20px;
  gap: 40px;
`;

const TabButton = styled.button`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  padding-bottom: 12px;
  font-size: 20px;
  cursor: pointer;
`;
