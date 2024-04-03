import styled from "styled-components";
import { theme } from "../../styles/theme";
import Reward from "./Reward";
import Points from "./Points";
import { useCallback, useEffect, useState } from "react";
import API from "../../apis/Api";

import { formatUnits } from "ethers";
import ApiDaily from "../../apis/ApiDaily";
import { useAuthStore } from "../../store/authStore";

interface CurrentClaimResponse {
  status: number;
  data: {
    resultCode: string;
    msg: string;
    exchangeRatio: number;
    currentPoints: number;
    mg8Amount: number;
    decimals: number;
  };
}

interface MinClaimResponse {
  status: number;
  data: {
    resultCode: string;
    msg: string;
    minAmount: bigint;
    maxAmount: bigint;
  };
}

interface IsClaimAvailableResponse {
  status: number;
  data: {
    resultCode: string;
    msg: string;
    claimable: boolean;
  };
}

interface MyPointsResponse {
  totalPoints: number | null;
  resultCode: string;
  msg: string;
}

export const addCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Daily = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const walletAddress = useAuthStore((state) => state.userAccount);

  const [doRender, setDoRender] = useState(false);
  const [minAmount, setMinAmount] = useState<bigint>(BigInt(0));
  const [maxAmount, setMaxAmount] = useState<bigint>(BigInt(0));
  const [decimal, setDecimal] = useState(0);
  const [exChangeRatioAPI, setExchangeRatioAPI] = useState(0);
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [myPointsAPI, setMyPointsAPI] = useState(0);

  const doRerender = () => {
    setDoRender(!doRender);
  };

  const convertNumber = (data: string) => {
    const numData = Number(data);
    if (numData < 1) return addCommas(numData);
    return addCommas(Math.floor(numData));
  };

  const fetchCurrentClaim = async () => {
    try {
      const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/info`;
      const res: CurrentClaimResponse = await API.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.data.resultCode === "40") throw new Error(res.data.resultCode);
      setExchangeRatioAPI(res.data.exchangeRatio);
      setDecimal(res.data.decimals);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMinClaim = async () => {
    try {
      const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/minMaxAmount`;
      const res: MinClaimResponse = await API.get(API_ENDPOINT);
      setMinAmount(res.data.minAmount);
      setMaxAmount(res.data.maxAmount);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyPoints = useCallback(async () => {
    try {
      const res: MyPointsResponse = await ApiDaily.myPoint(walletAddress);
      if (res.resultCode !== "1") {
        return;
      }
      setMyPointsAPI(res.totalPoints);
    } catch (error) {
      console.error("Error fetching total points:", error);
    }
  }, [walletAddress]);

  useEffect(() => {
    void fetchCurrentClaim();
    void fetchMinClaim();
    const fetchIsClaimAvailable = async () => {
      try {
        const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/infiniteSpin/mega8/claim/available`;
        const res: IsClaimAvailableResponse = await API.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(isClaimable, "전");
        setIsClaimable(res.data.claimable);
      } catch (err) {
        console.error(err);
      }
    };
    void fetchIsClaimAvailable();
  }, [doRender, fetchCurrentClaim, fetchMinClaim]);

  useEffect(() => {
    void fetchMyPoints();
    if (isLoggedIn) {
      const interval = setInterval(fetchMyPoints, 5000);
      return () => clearInterval(interval);
    }
  }, [walletAddress, fetchMyPoints, isLoggedIn]);

  return (
    <DailyWrapper>
      <TitleContainer>
        <MainTitle>Daily dose of $MG8</MainTitle>
        <SubTitle>Login 7 days in a row, and your rewards will grow.</SubTitle>
      </TitleContainer>
      <DayWrapper>
        <ContentWrapper>
          <Reward />
          <Points
            doRerender={doRerender}
            myPointsAPI={myPointsAPI}
            exChangeRatioAPI={exChangeRatioAPI}
            isClaimable={isClaimable}
            minAmount={minAmount}
            maxAmount={maxAmount}
            decimal={decimal}
          />
        </ContentWrapper>
        {isClaimable ? (
          myPointsAPI / exChangeRatioAPI > minAmount ? (
            <ContentAlertText style={{ color: "#b81414" }}>
              Insufficient POINT to claim.
            </ContentAlertText>
          ) : (
            <ContentAlertText>
              *CLAIM NOTICE : You can claim up to&nbsp;
              <strong style={{ fontWeight: "bold" }}>
                {convertNumber(formatUnits(maxAmount, decimal))}
              </strong>
              MG8 at once.
            </ContentAlertText>
          )
        ) : null}
      </DayWrapper>
      <ContentAlertText>
        You can claim your points after the events ends.
      </ContentAlertText>
    </DailyWrapper>
  );
};

export default Daily;

const DailyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 48px;
`;

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
`;

const DayWrapper = styled.div`
  width: 1200px;
  height: 310px;
  background-color: ${theme.colors.bg.box};
  border-radius: 16px;
  margin-top: 80px;
  padding: 48px 90px 48px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.section`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  //align-items: center;
`;
const ContentAlertText = styled.h2`
  margin-top: 20px;
  padding: 10px;
  font-weight: 400;
  font-size: 20px;
`;
