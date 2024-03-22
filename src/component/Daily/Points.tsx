import styled from "styled-components";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";
import ApiPoints from "../../apis/ApiPoints";
import { useState } from "react";
import JoinModal from "../Modal";

const Points = () => {
  const { connectWallet } = useWallet();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const walletAddress = useAuthStore((state) => state.userAccount);
  const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickLogin = async () => {
    try {
      let address = walletAddress || await connectWallet();
      if (!address) {
        alert("메타 마스크를 연결해주세요.");
        return;
      }
      console.log("연결된 주소:", address);
      const loginResponse = await ApiPoints.login(address);
      console.log(loginResponse,loginResponse.resultCode, loginResponse.resultCode !== '1');
      if (loginResponse.resultCode !== '1') {
        throw new Error("로그인 실패");
      }
      console.log("로그인 성공!", loginResponse.resultCode);
      useAuthStore.getState().login(address);
    } catch (error) {
      console.error("로그인 과정에서 에러가 발생했습니다:", error);
      setLoginAttemptFailed(true);
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
      {isModalOpen ? (
        <JoinModal handleCloseModal={() => setIsModalOpen(false)} />
      ) : (
        <> </>
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
