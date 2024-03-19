import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wallet = () => {
  return <WalletWrapper></WalletWrapper>;
};

export default Wallet;

const WalletWrapper = styled.div`
  width: 1200px;
  height: 266px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
  margin-top: 80px;
  margin-bottom: 80px;
`;
