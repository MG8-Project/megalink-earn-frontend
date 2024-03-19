import styled from "styled-components";
import { theme } from "../../styles/theme";
import { binance, ace, wemix } from "../../assets/images";
import CoinCard from "./CoinCard";

const coinImages = [binance, ace, wemix];

const Wallet = () => {
  return (
    <WalletWrapper>
      <WalletTitle>Get $MG8 if you have one of these coins</WalletTitle>
      <CoinCard />
      <WalletContainer>Connect Wallet</WalletContainer>
    </WalletWrapper>
  );
};

export default Wallet;

const WalletWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
  margin-bottom: 160px;
`;

const WalletTitle = styled.h3`
  font-size: 28px;
  font-weight: 600px;
  margin-bottom: 56px;
`;

const WalletContainer = styled.button`
  margin-top: 40px;
  display: flex;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 140px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 16px;
`;
