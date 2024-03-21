import styled from "styled-components";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import { useState } from "react";

const Points = () => {
  const { connectWallet } = useWallet();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const walletAddress = useAuthStore((state) => state.userAccount);
  const userId = useAuthStore((state) => state.userId);
  const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);

  const clickLogin = async () => {
    setLoginAttemptFailed(false);
    let address: string = null;
    if (!walletAddress) {
      address = await connectWallet();
      if (address === null) {
        alert("메타 마스크를 설치해주세요.");
        return;
      }
      console.log("연결된 주소:", address);
      useAuthStore.getState().setUserAccount(address);
    }
    let getUserId: string = null;
    if (!userId) {
      getUserId = await ApiPoints.getUserId(address);
    }
    try {
      address = address || walletAddress;
      getUserId = userId || getUserId;

      const success = await ApiPoints.login(address);
      useAuthStore.getState().login(address, getUserId);
      if (success.resultCode === 1) {
        console.log("로그인 성공!", success.resultCode);
      } else {
        console.error("로그인 실패.");
        setLoginAttemptFailed(true);
      }
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };
  return (
    <PointsWrapper>
      <TextWrapper>
        <div>My Total MG8 Points</div>
        <PointText>-P</PointText>
      </TextWrapper>
      {(!isLoggedIn || loginAttemptFailed) && (
        <LoginButton onClick={clickLogin}>Login</LoginButton>
      )}
    </PointsWrapper>
  );
};
export default Points;

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
`;
const PointText = styled.div`
  font-size: 40px;
`;

const LoginButton = styled.button`
  margin-top: 36px;
  font-weight: 600;
  width: 120px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 100px;
  font-size: 20px;
`;
