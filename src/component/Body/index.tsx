import React from "react";
import styled from "styled-components";
import Wallet from "../Wallet";
import Status from "../Status";
const Body = () => {
  return (
    <BodyWrapper>
      <Wallet />
      <Status />
    </BodyWrapper>
  );
};

export default Body;
const BodyWrapper = styled.main``;
