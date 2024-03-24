import React from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
import Status from "../Status";
import Daily from "../Daily";
import Spin from "../Spin";
import LeaderBoard from "../LeaderBorad";

const Body = () => {
  return (
    <BodyWrapper>
      <Wallet />
      <Status />
      <Daily />
      <Spin />
      <LeaderBoard />
    </BodyWrapper>
  );
};

export default Body;
const BodyWrapper = styled.main``;
