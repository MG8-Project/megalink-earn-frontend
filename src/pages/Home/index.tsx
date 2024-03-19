import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Body from "../../component/Body";
import styled from "styled-components";
const Home = () => {
  return (
    <HomeWrapper>
      <Header />
      <Body />
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
