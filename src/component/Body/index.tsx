import React from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
import Status from "../Status";
import Daily from "../Daily";
import Spin from "../Spin";
import LeaderBoard from "../LeaderBorad";

interface BodyProps {
  mainRef: React.RefObject<HTMLDivElement>;
  leaderBoardRef: React.RefObject<HTMLDivElement>;
}

const Body: React.FC<BodyProps> = ({ mainRef, leaderBoardRef }) => {
  return (
    <BodyWrapper>
      <div ref={mainRef}>
        <Wallet />
      </div>
      <Status />
      <Daily />
      <Spin />
      <div ref={leaderBoardRef}>
        <LeaderBoard />
      </div>
    </BodyWrapper>
  );
};

export default Body;

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 320px;
  padding-top: 80px;
`;
