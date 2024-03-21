import React, { useRef } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Wallet from "../../component/Wallet";
import Status from "../../component/Status";
import styled from "styled-components";
import Daily from "../../component/Daily";
import Spin from "../../component/Spin";
import LeaderBoard from "../../component/LeaderBorad";
import Body from "../../component/Body";

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const leaderBoardRef = useRef<HTMLDivElement>(null);

  // const scrollToMain = () => {
  //   if (mainRef.current) {
  //     mainRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToLeaderBoard = () => {
    if (leaderBoardRef.current) {
      leaderBoardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HomeWrapper>
      <Header
        scrollToMain={scrollToTop}
        scrollToLeaderBoard={scrollToLeaderBoard}
      />
      <Body mainRef={mainRef} leaderBoardRef={leaderBoardRef} />
      <Footer />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
