import React, { useRef } from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
import Status from "../Status";
import Daily from "../Daily";
import Spin from "../Spin";
import LeaderBoard from "../LeaderBorad";

const Body = () => {
  const walletRef = useRef(null);
  const scrollToWallet = () => {
    walletRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <BodyWrapper>
      <Spin onLearnMoreClick={scrollToWallet}/>
      <Daily />
      <LeaderBoard />
      <div ref={walletRef}><Wallet /></div>
      <Status />
    </BodyWrapper>
  );
};

export default Body;
const BodyWrapper = styled.main``;
