import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { coinList } from "../../constants";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";

interface CardBoxProps {
  highBalance: boolean;
}

const CoinCard = () => {
  const userAddress = useAuthStore((state) => state.userAccount);
  const [coins, setCoins] = useState(coinList);

  const fetchBalances = useCallback(async () => {
    if (!userAddress) {
      return;
    }

    const updatedCoins = await Promise.all(
      coins.map(async (item) => {
        const provider = new ethers.JsonRpcProvider(item.url, item.chainId);
        const balance = await provider.getBalance(userAddress);
        const balanceInEther = ethers.formatEther(balance);
        return { ...item, balance: balanceInEther };
      })
    );
    setCoins(updatedCoins);
  }, [userAddress, coins]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return (
    <CardWrapper>
      {coinList.map((item, index) => (
        <CardBox key={index}>
          <CardBoxImg src={item.image} alt="" />
          <div>{item.title}</div>
          <CardTextBox highBalance={parseFloat(item.balance) < item.amount}>
            <CardText highBalance={parseFloat(item.balance) < item.amount}>
              {item.balance}/{item.amount}
            </CardText>
          </CardTextBox>
        </CardBox>
      ))}
    </CardWrapper>
  );
};

export default CoinCard;

const CardWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const CardBox = styled.div`
  width: 384px;
  height: 230px;
  border-radius: 16px;
  background-color: ${theme.colors.bg.box};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const CardTextBox = styled.div<CardBoxProps>`
  background: linear-gradient(90deg, #82e8ff, #379fff);
  border-radius: 100px;
  border: 1px solid transparent;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(90deg, #82e8ff, #379fff);
  background-origin: border-box;
  background-clip: padding-box,
    border-box
      ${(props) =>
        props.highBalance &&
        css`
          border: 1px solid transparent;
          background-image: linear-gradient(#000000, #000000),
            linear-gradient(90deg, #333333, #333333);
          background-origin: border-box;
          background-clip: padding-box, border-box;
        `};
`;
const CardText = styled.div<CardBoxProps>`
  z-index: 1000;
  height: 40px;

  border-radius: 20px;
  display: flex;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.highBalance ? "#999999" : "inherit")};
`;

const CardBoxImg = styled.img`
  width: 64px;
  margin-top: 40px;
`;
