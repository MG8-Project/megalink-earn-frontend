import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { binance, ace, wemix } from "../../assets/images";

const coinImages = [binance, ace, wemix];

const Wallet = () => {
  return (
    <WalletWrapper>
      <WalltetContentBox>
        <WalletTitle>Get $MG8 if you have one of these coins</WalletTitle>
        <WalletBottomContainer>
          <CoinImgBox>
            {coinImages.map((coin, index) => (
              <CoinImg key={index} src={coin} alt="" />
            ))}
          </CoinImgBox>
          <WalletContainer>Connect Wallet</WalletContainer>
        </WalletBottomContainer>
      </WalltetContentBox>
    </WalletWrapper>
  );
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
const WalltetContentBox = styled.div`
  padding: 48px 64px 68px 64px;
`;

const WalletTitle = styled.h3`
  font-size: 28px;
  font-weight: 600px;
`;
const CoinImgBox = styled.div`
  display: flex;
  gap: 48px;
`;

const CoinImg = styled.img`
  width: 80px;
`;
const WalletBottomContainer = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const WalletContainer = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 140px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 16px;
`;
