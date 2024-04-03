import styled from "styled-components";
import CoinCard from "./CoinCard";
import { useWallet } from "../../hooks/useWallet";
import { useAuthStore } from "../../store/authStore";
import { DISCONNECTED, METAMASK_LOCKED_OR_UNINSTALL } from "../../constants";

const Wallet = () => {
  const { connectWallet } = useWallet();
  const walletAddress = useAuthStore((state) => state.userAccount);

  const onWalletConnect = async () => {
    const address = await connectWallet();
    if (address === null) {
      alert(METAMASK_LOCKED_OR_UNINSTALL);
      return;
    }
    useAuthStore.getState().setUserAccount(address);
  };

  const onWalletDisconnect = () => {
    //  Disconnect 시 logout
    useAuthStore.getState().logout();
    useAuthStore.getState().setUserAccount(null);
    alert(DISCONNECTED);
  };

  return (
    <WalletWrapper>
      <WalletTitle>Coming Back in 2 Weeks to Participate</WalletTitle>
      <CoinCard />
      {!walletAddress ? (
        <WalletContainer onClick={onWalletConnect}>
          Connect Wallet
        </WalletContainer>
      ) : (
        <WalletContainer onClick={onWalletDisconnect}>
          Connected
        </WalletContainer>
      )}
    </WalletWrapper>
  );
};

export default Wallet;

const WalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WalletTitle = styled.h3`
  font-size: 28px;
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
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #006ebe;
  backdrop-filter: blur(4px);
`;
