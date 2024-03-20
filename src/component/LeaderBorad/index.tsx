import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import IndividualList from "./Individual";
import TeamList from "./Team";

interface TabButtonProps {
  active: boolean;
}

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState("Individual");

  return (
    <LeaderBoardWrapper>
      <TitleContainer>
        <MainTitle>MG8 24h Leaderboard</MainTitle>

        <SecondTitle>
          Check the scores you have earned and compare them with the
          participants. The ranking changes every 24 hours.
        </SecondTitle>
      </TitleContainer>
      <PageTitle>
        <TabButton
          onClick={() => setActiveTab("Individual")}
          active={activeTab === "Individual"}
        >
          Individual
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("Team")}
          active={activeTab === "Team"}
        >
          Team
        </TabButton>
      </PageTitle>
      {activeTab === "Individual" ? <IndividualList /> : <TeamList />}
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

const TabButton = styled.button<TabButtonProps>`
  background: none;
  border: none;
  font-weight: 600;
  padding-bottom: 12px;
  font-size: 20px;
  color: ${(props) => (props.active ? "#FFFFFF" : theme.colors.textGray)};
  border-bottom: ${(props) => (props.active ? "2px solid white" : "none")};
  cursor: pointer;
`;
