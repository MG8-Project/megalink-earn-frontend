import styled from "styled-components";
import { theme } from "../../styles/theme";
import { coinList } from "../../constants";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";



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
          <CardAmountBox>{item.balance}/{item.amount}</CardAmountBox>
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
const CardAmountBox = styled.div`
  width: 100px;
  height: 40px;
  border: 1.5px solid gray;
  border-radius: 20px;
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content : center;
  align-items : center;
`;
const CardBoxImg = styled.img`
  width: 64px;
  margin-top: 40px;
`;
