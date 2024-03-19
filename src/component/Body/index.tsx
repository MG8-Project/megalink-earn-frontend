import React from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
const Body = () => {
  return (
    <BodyWrapper>
      <Wallet />
    </BodyWrapper>
  );
};

export default Body;
const BodyWrapper = styled.main``;
