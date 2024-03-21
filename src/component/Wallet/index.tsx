import styled from "styled-components";
import { theme } from "../../styles/theme";
import { loading, Share } from "../../assets/images";
import CoinCard from "./CoinCard";
import Remaining from "./Remaining";
import { coinList } from "../../constants";

const Wallet = () => {
  const allCoinsClaimed = coinList.every((item) => item.have < item.count);
  return (
    <WalletWrapper>
      <WalletTitle>Get $MG8 if you have one of these coins</WalletTitle>
      {/* <Remaining /> */}
      <CoinCard />
      <WalletContainer>Connect Wallet</WalletContainer>
      {/* Claiming 버튼 */}
      {/* <Claiming>
        <Loading src={loading} alt="" />
        Claiming
      </Claiming> */}
      {/* Claim 버튼 */}
      {/* <ClaimContainer>
        {allCoinsClaimed && (
          <WarningText>Deposit more coins above to claim</WarningText>
        )}
        <Claim>Claim</Claim>
      </ClaimContainer>
      <DefaultClaim>Claim </DefaultClaim> */}

      {/* Claimed 버튼 */}
      {/* <ClaimedContainer>
        <Claimed>
          <ClaimedText>Claimed</ClaimedText>
        </Claimed>
        <ShareIcon src={Share} alt="" />
      </ClaimedContainer> */}
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
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 60px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;

const Claiming = styled.button`
  margin-top: 40px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 60px;
  color: ${theme.colors.textGray};
  border-radius: 100px;
  font-size: 20px;
  background-color: #222222;
  border: 1px solid #333333;
  gap: 10px;
`;

const ClaimContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DefaultClaim = styled.button`
  margin-top: 40px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 60px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;

const Claim = styled.button`
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 60px;
  color: ${theme.colors.textGray};
  border-radius: 100px;
  font-size: 20px;
  background-color: #222222;
  border: 1px solid #333333;
  gap: 10px;
`;
const Claimed = styled.button`
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 60px;
  color: transparent;
  background: linear-gradient(90deg, #82e8ff, #379fff);
  border-radius: 100px;
  border: 1px solid transparent;
  border-radius: 100px;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(90deg, #82e8ff, #379fff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  gap: 10px;
`;

const Loading = styled.img`
  width: 24px;
`;

const ClaimedContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 16px;
  align-items: center;
  height: 60px;
`;

const ClaimedText = styled.div`
  color: transparent;
  background: linear-gradient(90deg, #82e8ff, #379fff);
  font-size: 20px;
  background-clip: text;
  -webkit-background-clip: text;
`;

const ShareIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const WarningText = styled.div`
  margin-top: 32px;
  color: red;
  font-size: 16px;
`;
