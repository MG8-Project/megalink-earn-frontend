import React, { useRef } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import styled from "styled-components";
import Body from "../../component/Body";

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const leaderBoardRef = useRef<HTMLDivElement>(null);

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
