import React from "react";
import styled from "styled-components";
import { headerLogo } from "../../assets/images";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo src={headerLogo} alt="" />
      <div>
        <HeaderUl>
          <li>Home</li>
          <li>Leaderboard</li>
        </HeaderUl>
      </div>

      <WalletContainer>Connect Wallet</WalletContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #000000;
`;

const HeaderLogo = styled.img`
  width: 210px;
  height: 48px;
`;

const HeaderUl = styled.ul`
  display: flex;
  > li {
    margin-right: 20px;
  }
`;

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 140px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 16px;
`;
