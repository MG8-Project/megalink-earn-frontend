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
  const userId = useAuthStore((state) => state.userId);
  const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickLogin = async () => {
    try {
      setLoginAttemptFailed(false);
      let address: string = null;
      if (!walletAddress) {
        address = await connectWallet();
        if (address === null) {
          alert("Please install Metamask and connect your wallet.");
          return;
        }
        useAuthStore.getState().setUserAccount(address);
      }
      let getUserId: string = null;
      if (!userId) {
        getUserId = await ApiPoints.getUserId(address);
      }
      address = address || walletAddress;
      getUserId = userId || getUserId;

      await ApiPoints.login(address);
      useAuthStore.getState().login(address, getUserId);
      alert("Successfully logged in.");
    } catch (error) {
      setIsModalOpen(true);
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
      {isModalOpen ? <JoinModal /> : <> </>}
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
