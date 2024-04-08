import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import { useEffect, useState } from "react";
import { IToken } from "./index";
import API from "../../apis/Api";
import { formatUnits } from "ethers";
import { useWallet } from "../../hooks/useWallet";
import {
  LOGIN_FAILED,
  METAMASK_LINK_FAILED,
  METAMASK_LOCKED_OR_UNINSTALL,
} from "../../constants";
import { useAuthStore } from "../../store/authStore";
import Spinner from "../ui/Spinner";
import RemainTime from "./RemainTime";
import ApiPoints from "../../apis/ApiPoints";
import { share } from "../../assets/images";

interface CardBoxProps {
  $highBalance: boolean;
}
interface LoginResponse {
  resultCode: string;
}

interface PartnerTokenProps {
  tokenList: IToken[];
  remainTime: number;
  isClaimAvailable: boolean;
  setIsClaimAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}

interface IBalance {
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  balance: string;
}

interface Response {
  status: number;
  data: {
    resultCode: "string";
    msg: "string";
    address: "string";
    assets: IBalance[];
  };
}

interface AirdropResponse {
  status: number;
  data: { resultCode: string; msg: string; txHash: string };
}

const PartnerToken = (props: PartnerTokenProps) => {
  const {
    isClaimAvailable,
    remainTime,
    tokenList,
    setIsClaimAvailable,
    isLogin,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balaceList, setBalanceList] = useState<IBalance[]>([]);

  const { walletAddress, connectWallet } = useWallet();
  const onWalletConnect = async () => {
    setIsLoading(true);
    const address = await connectWallet();
    if (address === null) {
      alert(METAMASK_LOCKED_OR_UNINSTALL);
      return;
    }
    useAuthStore.getState().setUserAccount(address);
    setIsLoading(false);
  };

  const convertNumber = (data: string) => {
    const numData = Number(data);
    if (numData < 1) return numData;
    return Math.floor(numData);
  };
  const findBalance = (symbol: string) => {
    const find = balaceList?.find((item) => item.symbol === symbol);
    if (find) {
      return find.balance;
    } else {
      return 0;
    }
  };
  const checkBalance = (i: number) => {
    const num =
      Number(findBalance(tokenList[i].symbol)) /
      convertNumber(formatUnits(tokenList[i].minAmount, tokenList[i].decimals));
    if (num < 1) {
      return false;
    } else {
      return true;
    }
  };
  const clickLogin = async () => {
    try {
      let address = walletAddress || (await connectWallet());
      if (address === null) {
        alert(METAMASK_LINK_FAILED);
        return;
      }
      const loginResponse: LoginResponse = await ApiPoints.login(address);
      if (loginResponse.resultCode !== "1") {
        throw new Error(LOGIN_FAILED);
      }
      useAuthStore.getState().login(address);
    } catch (error) {
      console.error("An error occurred during login process:", error);
      alert(LOGIN_FAILED);
    }
  };

  const fetchAirDrop = async () => {
    try {
      const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/claim`;
      const res: AirdropResponse = await API.post(
        API_ENDPOINT,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res && res.data.resultCode === "1") {
        setIsClaimAvailable(true);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const clickAirdrop = () => {
    void fetchAirDrop();
  };
  const fetchBalances = async () => {
    try {
      const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/airdrop/balanceAll`;
      const res: Response = await API.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setBalanceList(res.data.assets);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    void fetchBalances();
  }, [isClaimAvailable, isLogin]);

  return (
    <CardWrapper>
      {/* 피그마의 디자인 부분에는 이 부분이 없어서 일단 주석처리! */}
      {/* {walletAddress !== null && isLogin ? (
        remainTime === 0 ? (
          <RemainWrapper>
            <text>Claim Available!</text>
          </RemainWrapper>
        ) : (
          <RemainWrapper>
            <RemainTime remainTime={remainTime} />
          </RemainWrapper>
        )
      ) : (
        <text>Please Login</text>
      )} */}

      <TokenWrapper>
        {tokenList.map((item, index) => (
          <CardBox key={index}>
            <CardBoxImg src={item.logoUrl} alt="" />
            <div>{item.symbol}</div>
            {isLogin ? (
              <CardTextBox $highBalance={!checkBalance(index)}>
                <CardText $highBalance={!checkBalance(index)}>
                  {parseFloat(
                    parseFloat(
                      formatUnits(findBalance(item.symbol), item.decimals)
                    ).toFixed(2)
                  )}
                  /
                  {parseFloat(
                    parseFloat(
                      formatUnits(item.minAmount, item.decimals)
                    ).toFixed(2)
                  )}
                </CardText>
              </CardTextBox>
            ) : null}
          </CardBox>
        ))}
      </TokenWrapper>
      <ButtonWrapper>
        {!walletAddress ? (
          <WalletContainer onClick={onWalletConnect}>
            {isLoading ? (
              <DefaultButton>
                <Spinner size={15} />
                <div style={{ marginLeft: "10px" }}>Claiming</div>
              </DefaultButton>
            ) : (
              "Connect Wallet"
            )}
          </WalletContainer>
        ) : isLogin ? (
          <ClaimeButtonWrapper>
            <ClaimedButtonContainer
              $highBalance={isClaimAvailable}
              onClick={isClaimAvailable ? clickAirdrop : null}
            >
              <div>
                {/* 보유수량 충족 */}
                {isClaimAvailable ? (
                  "Claim"
                ) : (
                  <DefaultButton>
                    {/* 보유수량 부족 */}
                    <div>Claim</div>
                  </DefaultButton>
                )}
              </div>
            </ClaimedButtonContainer>
          </ClaimeButtonWrapper>
        ) : (
          <WalletContainer onClick={clickLogin}>Login</WalletContainer>
        )}
      </ButtonWrapper>
      {checkBalance ? null : (
        <TokenAlertText>Deposit more coins above to claim</TokenAlertText>
      )}
    </CardWrapper>
  );
};

export default PartnerToken;

const CardWrapper = styled.div`
  margin: 60px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RemainWrapper = styled.div`
  display: flex;
  margin: 20px 2px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WalletContainer = styled.button`
  margin-top: 40px;
  display: flex;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  width: 180px;
  height: 52px;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #006ebe;
  backdrop-filter: blur(4px);
`;

const TokenWrapper = styled.div`
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
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: linear-gradient(90deg, #82e8ff, #379fff);
  border-radius: 100px;
  border: 1px solid transparent;
  background-image: linear-gradient(#000000, #000000),
    linear-gradient(90deg, #82e8ff, #379fff);
  background-origin: border-box;
  background-clip: padding-box,
    border-box
      ${(props) =>
        props.$highBalance &&
        css`
          border: 1px solid transparent;
          background-image: linear-gradient(#000000, #000000),
            linear-gradient(90deg, #333333, #333333);

          background-origin: border-box;
          background-clip: padding-box, border-box;
        `};
`;
const CardText = styled.div<CardBoxProps>`
  z-index: 100;
  height: auto;
  border-radius: 20px;
  background-color: black;
  display: flex;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.$highBalance ? "#999999" : "inherit")};
`;

const CardBoxImg = styled.img`
  width: 64px;
  margin-top: 40px;
`;

const TokenAlertText = styled.div`
  padding: 15px 0;
  width: 100%;
  color: #fa3434;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClaimedButtonContainer = styled.div<CardBoxProps>`
  margin-top: 40px;
  display: flex;
  width: 180px;
  height: 52px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const ClaimedText = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  background: linear-gradient(104deg, #82e8ff 0%, #379fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ClaimeButtonWrapper = styled.div`
  display: flex;
  position: relative;
`;

const DefaultButton = styled.div`
  display: flex;
  width: 180px;
  height: 52px;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid #333;
  background: #222;
  color: #999;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const ShareButton = styled.img`
  position: absolute;
  right: -6px;
`;
